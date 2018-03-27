/** ******************************************************************************************************************
 * @file Parse JsDoc comment and add whatever is needed from the attached AST node.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 25-Mar-2018
 *********************************************************************************************************************/
"use strict";

const
    { inspect } = require( 'util' ),
    doctrine = require( 'doctrine' ),
    { parse: parser } = require( 'espree' ),
    { parse: tag_parser } = require( './parsing' ),
    { traverse, attachComments, VisitorKeys } = require( 'estraverse' ),
    NodeType = require( './node-type' ),
    typesRx = /(@[a-zA-Z_$][a-zA-Z0-9_$]+\s+)({[^\n]+})/g,
    notTypeRx = /[^|{}<>[\]&!] | [^^|{}<>[\]&!]/,
    table = new Map();

let exprIndex = 1,
    tmp,
    other;

// import { TypeFlags }                             from "./types";
// import { enter, exit }                           from "./doctags";
// import { Symbol }                                from "./old/symbols";

/**
 * @typedef {object} CommentBlock
 * @property {Comment} comment
 * @property {Annotation} tags
 */

/**
 * @typedef {object} Comments
 * @property {number} index
 * @property {string} type
 * @property {Array<CommentBlock>} [leading]
 * @property {Array<CommentBlock>} [trailing]
 */

/**
 * @param {string} source       - The source module
 * @param {object} [_options]    - The usual espree/esprima options
 * @return {Program}
 */
function parse( source, _options = {} )
{
    const defaultParserOptions = {
        loc:          true,
        range:        true,
        comment:      true,
        tokens:       true,
        ecmaVersion:  9,
        sourceType:   'module',
        ecmaFeatures: {
            impliedStrict:                true,
            experimentalObjectRestSpread: true
        }
    };

    const options = Object.assign( {}, defaultParserOptions, _options );

    options.range = options.loc = options.comment = options.tokens = true;
    options.ecmaVersion                               = 2018;
    options.ecmaFeatures                              = options.ecmaFeatures || {};
    options.ecmaFeatures.experimentalObjectRestSpread = true;

    const
        ast = parser( source, options );

    return attachComments( ast, ast.comments, ast.tokens );
}

/**
 * @param {Program} withComments
 * @param {string} file
 * @return {object}
 */
function prep( withComments, file )
{
    const
        types          = new Set(),
        allNodesParsed = [],
        byIndex        = [];

    withComments.fileName = file;

    traverse( withComments, {
        enter( node, parent )
        {

            node.parent         = parent;
            node.index          = byIndex.length;

            byIndex.push( node );

            [ node.field, node.fieldIndex ] = determine_field( node, parent );

            // enter( node );
            const comments = parse_comments( node );

            if ( comments )
            {
            //     types.add( node.type );
                allNodesParsed.push( comments );

                //     build_definition( node, comments );
            }
            // else if ( node.type === Syntax.Identifier )
            //     build_definition( node );
        }
        // exit
    } );

    // if ( table.size )
    //     allNodesParsed.push( ...table.values() );

    return { fileName: file, types: [ ...types ], allDocNodes: allNodesParsed, inline: [ ...table.values() ] };
}

/**
 * @param {Node & Object} node
 * @param parent
 * @return {*[]}
 */
function determine_field( node, parent )
{
    if ( !parent ) return [ null, null ];

    for ( const key of VisitorKeys[ parent.type ] )
    {
        const pv = parent[ key ];

        if ( !pv ) continue;

        if ( !Array.isArray( pv ) )
        {
            if ( pv === node ) return [ key, null ];
        }
        else
        {
            const i = pv.indexOf( node );

            if ( i !== -1 )
                return [ key, i ];
        }
    }

    return [ null, null ];
}



/**
 * Takes a block comment, cleans it up, and returns the output from `doctrine`.
 *
 * @param {string} str
 * @return {{description, tags}}
 */
function prep_string( str )
{
    let strs = str.includes( '\n' ) || str.includes( '@' ) ?
        str.replace( /^[\s\n*]*|[\s\n*]*/, '' ).split( /[\s*]*\n[\s*]*/ ) :
        [ str.replace( /^\*?{?(.*)}?$/, '{$1}' ) ];

    // const
    //     before = strs.join( '' ),
    //     after = strs.map( replace_types );
    //
    // console.log( `before: ${before}\nafter: ${after.join( '' )}` );

    strs = strs.map( replace_types );
    str = strs.map( s => fix_array( s.replace( /(@[a-z]+\s{.*)(}\s+)\[([^\]]+)]/g, '$1=$2$3' ) ) ).join( '\n' );

    const parsed = doctrine.parse( str, { recoverable: true, lineNumbers: true, range: true } );

    if ( parsed.tags && parsed.tags.length )
        parsed.tags.forEach( tag => {
            if ( tag.type && tag.type.name && table.has( tag.type.name ) ) // tag.type.name.startsWith( '_' ) )
            {
                if ( table.has( tag.type.name ) )
                {
                    const pp = table.get( tag.type.name );
                    table.delete( tag.type.name );
                    if ( !pp.name ) delete tag.type.name;
                    Object.assign( tag.type, pp );
                }
                // console.error( tag.type );
            }
            else if ( tag.type && tag.type.type === 'OptionalType' && table.has( tag.type.expression.name ) )
            {
                const pp = table.get( tag.type.expression.name );
                table.delete( tag.type.expression.name );
                Object.assign( tag.type, pp );
                tag.type = {
                    type: NodeType.OPTIONAL,
                    value: pp,
                    meta: { syntax: 'SQUARE_BRACKET' },
                };
            }
        } );

    return parsed;
}

/**
 * @param {string} str
 * @return {string}
 */
function fix_array( str )
{
    let arr = str.indexOf( '[]' );

    while ( arr !== -1 )
    {
        const typeStr = read_balanced_string( str, arr - 1, ',', void 0, -1 );
        if ( !typeStr )
            str = str.substr( 0, arr ) + 'Array<*>' + str.substr( arr + 2 );
        else if ( typeStr[ 0 ] === typeStr[ 1 ] )
            str = str.substr( 0, typeStr[ 0 ] + 1 ) + `Array<*>` + str.substr( arr + 2 );
        else
            str = str.substr( 0, typeStr[ 0 ] ) + `Array<${str.substring( typeStr[ 0 ], typeStr[ 1 ] + 1 )}>` + str.substr( arr + 2 );

        arr = str.indexOf( '[]' );
    }

    return str;
}

/**
 * Parse all leading and trailing comments for a given node, if it has any and returns an array
 * of all tags found.
 *
 * @param {BaseNode} node
 * @return {?Comments}
 */
function parse_comments( /* Node */ node )
{
    if ( /*?Array<object>*/ node.leadingComments ) console.error( inspect( node.leadingComments, { showHidden: false, colors: true, depth: 8 } ) );

    const
        lc = parse_comment_array( /**?Array<object>*/node.leadingComments ),
        /* parse trailing */
        tc = parse_comment_array( /*?Array<Last>*/node.trailingComments ),
        /** @type {Comments} */
        cb = {
            type: node.type,
            index: node.index
        };

    if ( !tc && !lc ) return null;

    if ( lc ) cb.leading = lc;
    if ( tc ) cb.trailing = tc;

    return cb;
}

function replace_types( str )
{
    const
        parts = str.split( typesRx );

    let i = 0;

    for ( const part of parts )
    {
        if ( /^{.*}$/.test( part ) )
        {
            const
                indexLength = `${exprIndex}`.length,
                typeLength = part.length - 2,
                rlng = typeLength - indexLength < 1 ? 1 : typeLength - indexLength,
                tmpName = '_'.repeat( rlng ) + exprIndex++;

            let pp;

            try
            {
                pp = tag_parser( part.substring( 1, part.length - 1 ) )
            }
            catch ( err )
            {
                pp = null;
            }

            if ( pp ) table.set( tmpName, pp );

            parts[ i ] = `{${tmpName}}`;
        }

        ++i;
    }

    return parts.join( '' );
    // console.log( `${str} => [ "${parts.join( '", "' )}" ]` );

    // let m;
    //
    // while ( ( m = typesRx.exec( str ) ) !== null )
    // {
    //
    // }
}

/**
 * Parse an array of comments, if it has any, and returns an array of all tags found.
 *
 * @param {Array<Comment>} comments
 * @return {?Array<CommentBlock>}
 */
function parse_comment_array( comments )
{
    if ( !comments || !comments.length ) return null;

    const r = comments
        .filter( c => c.type === 'Block' )
        .map( c => ( { comment: c, tags: prep_string( c.value ) } ) )
        .filter( cb => cb.tags.description || cb.tags.tags.length );

    return r.length ? r : null;

}

const
    delimOpposites = {
        '(': ')',
        '{': '}',
        '[': ']',
        '<': '>'
    },
    oppositeString = delims => delims.split( '' ).map( c => delimOpposites[ c ] ).join( '' ),
    allDelimiters  = Object.keys( delimOpposites ).join( '' );

/**
 * @param {string} str
 * @param {number} start
 * @param {string} stop
 * @param {?string} delims
 * @param {number} dir
 * @param {boolean} [stopOnZero]    - Stop when delimiters are balanced
 * @return {?[number, number]}
 */
function read_balanced_string( str, start = 0, stop = ',', delims = allDelimiters, dir = 1, stopOnZero ) // eslint-disable-line max-params
{
    const
        zero = arr => arr.every( v => v === 0 );

    let opps = oppositeString( delims );

    if ( dir < 0 )
    {
        [ delims, opps ] = [ opps, delims ];
        stop += opps;
    }
    else
        stop += delims;

    let i          = start,
        c          = str[ i ],
        nestCounts = [];

    for ( let j = 0; j < delims.length; j++ )
        nestCounts[ j ] = 0;

    while ( i >= 0 && i < str.length )
    {
        if ( stop.includes( c ) && zero( nestCounts ) ) break;

        let index = delims.indexOf( c );

        if ( index !== -1 )
            nestCounts[ index ]++;
        else if ( ( index = opps.indexOf( c ) ) !== -1 )
            nestCounts[ index ]--;

        if ( stopOnZero && zero( nestCounts ) ) break;
        i += dir;
        c = str[ i ];
    }

    if ( !zero( nestCounts ) ) return null;

    if ( stop.includes( c ) )
    {
        i -= dir;
        while ( str[ i ] === ' ' || str[ i ] === '\t' ) i -= dir;
    }

    return start < i ? [ start, i ] : [ i, start ];
}

/**
 * @param {string} str
 * @param {string} stop
 * @param {?string} delims
 * @param {number} dir
 * @return {?[number, number]}
 */
function read_balanced_delimiters( str, stop = ',', delims = allDelimiters, dir = 1 )
{
    const m = dir > 0 ? str.match( new RegExp( `^.*?(?=[${delims}])` ) ) : str.match( new RegExp( `^.*${oppositeString( delims )}` ) );

    if ( !m ) return null;

    const se = read_balanced_string( str, m[ 0 ].length, stop, delims, dir, true );

    if ( !se ) return null;

    return [ se[ 0 ] + 1, se[ 1 ] ];
}

module.exports = { prep, parse };
