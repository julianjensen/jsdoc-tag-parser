'use strict';

var util = require( 'util' );
var Parser = require( '../lib/parsing.js' );
var Fs = require( 'fs' );
var Path = require( 'path' );
var reservedWords = [
    'break',
    'case',
    'catch',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'finally',
    'for',
    'function',
    'if',
    'in',
    'instanceof',
    'new',
    'return',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'class',
    'const',
    'enum',
    'export',
    'extends',
    'import',
    'super',

    'true',
    'false',
    'null',

    /* technically, the following are only reserved in strict mode... */
    'implements',
    'interface',
    'let',
    'package',
    'private',
    'protected',
    'public',
    'static',
    'yield'
];

var Fixtures = {
    CATHARSIS:       readFixtureSync( 'catharsis-types' ),
    CLOSURE_LIBRARY: readFixtureSync( 'closure-library-types' ),
    JSDOC3:          readFixtureSync( 'jsdoc-types' ),
    JSDUCK:          readFixtureSync( 'jsduck-types' ),
    TSTYPES:         readFixtureSync( 'ts-types' )
};

const
    output   = [],
    isObject = o => typeof o === 'object' && o !== null && !Array.isArray( o );

function convert( obj )
{
    const
        optional   = o => {
            o.optional = true;
            return o;
        },
        repeatable = o => {
            o.repeatable = true;
            return o;
        },
        nullable   = o => {
            o.nullable = true;
            return o;
        },
        reserved = o => {
            if ( typeof o.name === 'string' && reservedWords.includes( o.name ) ) o.reservedWord = true;
            return o;
        };

    if ( obj === null ) return null;

    if ( !isObject( obj ) )
        console.error( "obj is ", obj );

    delete obj.meta;

    let tmp;

    switch ( obj.type )
    {
        case 'GENERIC':
            return generic_to_application( obj );
        case 'NAME':
            if ( obj.name === 'undefined' ) return { type: 'UndefinedLiteral' };
            else if ( obj.name === 'null' ) return { type: 'NullLiteral' };
            else if ( obj.name === 'function' ) return { type: 'FunctionType' };
            return reserved( { type: 'NameExpression', name: named( obj.name, obj.raw ) } );
        case 'UNION':
            return union_to_union( obj );
        case 'INTERSECTION':
            return union_to_union( obj, 'TypeIntersection' );
        case 'FUNCTION':
            return func( obj );

        case 'PARENTHESIS':
            return convert( obj.value );
        case 'FILE_PATH':
            return obj.path;

        case 'INNER_MEMBER':
            return reserved( { type: 'NameExpression', name: named( obj.owner ) + '~' + named( obj.name, obj.raw ) } );

        case 'INSTANCE_MEMBER':
            return reserved( { type: 'NameExpression', name: named( obj.owner ) + '#' + named( obj.name, obj.raw ) } );

        case 'MEMBER':
            // if ( obj.name && obj.name.includes( '.' ) ) console.log( obj );
            return reserved( { type: 'NameExpression', name: named( obj.owner ) + '.' + named( obj.name, obj.raw ) } );
        case 'MODULE':
            return { type: 'NameExpression', name: 'module:' + named( obj.value ) };

        case 'UNKNOWN':
            return { type: 'UnknownLiteral' };

        case 'RECORD':
            return record( obj );

        case 'STRING_VALUE':
            return reserved( { type: 'NameExpression', name: obj.raw } );

        case 'TUPLE':
            return {
                type:     'TypeTuple',
                elements: obj.types.map( convert )
            };

        case 'NOT_NULLABLE':
            return convert( obj.value );
        case 'OPTIONAL':
            return optional( convert( obj.value ) );
        case 'NULLABLE':
            return nullable( convert( obj.value ) );
        case 'VARIADIC':
            if ( !obj.value )
                return { repeatable: true, type: 'NullLiteral' };
            tmp = convert( obj.value );
            if ( !tmp ) console.error( 'boom:', obj );
            return repeatable( tmp );
        case 'ANY':
            return { type: 'AllLiteral' };

        case 'RECORD_ENTRY':
            return { type: 'FieldType', key: reserved( { type: 'NameExpression', name: obj.key } ), value: convert( obj.value ) };

        default:
            throw new Error( `Unhandled type: ${obj.type}` );
    }
}

function named( name, alt )
{
    if ( !name || typeof name === 'string' ) return alt || name;

    const r = convert( name );

    return typeof r === 'string' ? r : ( r.raw || r.name );
}

function record( obj )
{
    return {
        type:   'RecordType',
        fields: obj.entries.map( convert )
    };
}

function generic_to_application( obj )
{
    return {
        type:         'TypeApplication',
        expression:   convert( obj.subject ),
        applications: obj.objects.map( convert )
    };
}

function union_to_union( obj, typeStr = 'TypeUnion' )
{
    const r = {
        type:     typeStr,
        elements: [ convert( obj.left ) ]
    },
    rhs = typeStr === 'TypeUnion' ? 'UNION' : 'INTERSECTION';

    if ( obj.right.type === rhs )
        r.elements = r.elements.concat( convert( obj.right ).elements );
    else
        r.elements = r.elements.concat( convert( obj.right ) );

    return r;
}

function func( obj )
{
    return {
        type:   'FunctionType',
        params: obj.params.map( convert ),
        result: obj.returns ? convert( obj.returns ) : null,
        'this': obj.this ? convert( obj.this ) : null,
        'new':  obj.new ? convert( obj.new ) : null
    };
}

function remove_meta( obj )
{
    if ( !isObject( obj ) ) return obj;

    if ( Reflect.has( obj, 'meta' ) )
        delete obj.meta;

    if ( Reflect.has( obj, 'type' ) )
    {
        if ( obj.type === 'PARENTHESIS' )
            return remove_meta( obj.value );
    }

    Object.keys( obj ).forEach( key => obj[ key ] = remove_meta( obj[ key ] ) );

    return obj;
}

describe( 'Parser', function() {
    this.timeout( 5000 );
    it( 'should not throw any errors when parsing tests/fixtures/*', function() {
        Object.keys( Fixtures ).forEach( function( fixtureName ) {
            Fixtures[ fixtureName ].forEach( function( fixture ) {
                if ( fixture.skip ) return;
                try
                {
                    const res = Parser.parse( fixture.typeExprStr );

                    output.push( {
                        system: Path.basename( fixture.position.filePath ).replace( /^(.*)-types\s*$/, '$1' ),
                        expr:   fixture.typeExprStr,
                        ast:    convert( res )
                    } );
                }
                catch ( e )
                {
                    var debugMessage = util.format( 'parsing %s at %s:%d\n\n%s',
                        fixture.typeExprStr,
                        fixture.position.filePath,
                        fixture.position.lineno,
                        e.stack );

                    throw new Error( debugMessage );
                }
            } );
        } );

        Fs.writeFileSync( './parsed.json', JSON.stringify( output, null, 4 ) );
    } );
} );


function readFixtureSync( fileName )
{
    var filePath = Path.resolve( __dirname, 'fixtures', fileName );

    return Fs.readFileSync( filePath, 'utf8' )
        .trim()
        .split( /\n/ )
        .map( function( line, lineIdx ) {
            return {
                // When the line starts with "//", we should skip it.
                skip: /^\/\//.test( line ),

                typeExprStr: line.trim().replace( /^{(.*)}$/, '$1' ),
                position:    {
                    filePath: filePath,
                    lineno:   lineIdx + 1
                }
            };
        } );
}
