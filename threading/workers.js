/** ****************************************************************************************************
 * File: workers (jsdoc-tag-parser)
 * @author julian on 3/29/18
 * @version 1.0.0
 *******************************************************************************************************/
"use strict";
/* eslint-env worker */

console.log( "worker thing" );

const
    defaultOnMessage = self.onmessage,
    workers          = {
        sys: {
            rand:  ( lo, hi ) => ~~( Math.random() * ( hi - lo ) + lo ),
            defer: ( fn, delay = workers.sys.rand( 300, 2000 ) ) => new Promise( resolve => setTimeout( () => resolve( fn() ), delay ) )
        }
    };


/**
 * @return {Promise<any>}
 */
function once()
{
    return new Promise( resolve => {
        self.onmessage = ( { data } ) => {
            self.onmessage = defaultOnMessage;
            resolve( data );
        };
    } );
}

importScripts( 'get-diff.js', 'wait-some-time.js' );

self.activeWorkers = 0;

// system functions

/**
 * @param {string} message
 */
function defaultReply( data )
{
    switch ( data.message )
    {
        case 'active':
            self.postMessage( self.activeWorkers );
            break;

        case 'delay':
            workers.sys.defer( () => self.postMessage( 'Weee...' ) );
            break;

        default:
            self.postMessage( `Unknown message: "${message}"` );
            break;
    }
}

/**
 * @param {string} message
 * @param {Array<*>} values
 */
function reply( message, ...values )
{
    if ( !message )
        throw new TypeError( 'reply - not enough arguments' );

    self.postMessage( { queryMethodListener: message, queryMethodArguments: values } );
}

( async() => {
    console.log( "in async loop" );
    while ( true )
    {
        const
            data                                  = await once(),
            { queryMethod, queryMethodArguments } = data;

        console.log( "received data:", data );
        if ( queryMethod && queryMethodArguments && typeof workers[ queryMethod ] === 'function' )
            workers[ queryMethod ].call( workers, reply, ...queryMethodArguments );
        else
            defaultReply( data );
    }
} )();
