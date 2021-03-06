#! /usr/bin/env node

const
    program                = require( 'commander' ),
    fs                     = require( 'fs' ),
    { inspect, promisify } = require( 'util' ),
    { parse, prep }        = require( '../lib/parse-file' ),

    readFile               = promisify( fs.readFile ),
    pack                   = require( '../package.json' ),
    version                = pack.version,
    name                   = pack.name,
    $                      = o => JSON.stringify( o, null, 4 ),
    $$ = o => inspect( o, { colors: true, depth: 16, showHidden: false } ),
    defaultOptions         = {
        loc:          true,
        range:        true,
        comment:      true,
        tokens:       true,
        ecmaVersion:  9,
        sourceType:   'module',
        ecmaFeatures: {
            impliedStrict:                true,
            experimentalObjectRestSpread: true,
        },
    },
    tsFiles                = [],
    jsFiles                = [];

program
    .version( version )
    .name( name )
    .description( 'Parse JavaScript files and extract JsDoc tags' )
    .usage( name + ' [files...]' )
    .option( '-s, --script', 'Process file(s) as script files', false )
    .option( '[files...]' )
    .parse( process.argv );

if ( !program.args.length ) program.help();

/**
 * @param {string} fileName
 * @return {Promise<{fileName, types: Array<string>, allDocNodes}>}
 */
async function process_file( fileName )
{
    // console.log( `Processing file: "${fileName}"` );

    defaultOptions.sourceType = program.script ? 'script' : 'module';

    const
        source = await readFile( fileName, 'utf8' ),
        ast    = parse( source, defaultOptions );

    console.log( $( prep( ast, fileName ) ) );
}

program.args.forEach( process_file );

