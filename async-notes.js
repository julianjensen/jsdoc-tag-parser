/** ****************************************************************************************************
 * File: async-notes (jsdoc-tag-parser)
 * @author julian on 3/29/18
 * @version 1.0.0
 * @copyright Planet3, Inc.
 *******************************************************************************************************/
'use strict';

function someTask( delay )
{
    return new Promise( resolve => setTimeout( resolve, delay ) );
}

const
    Semaphore = max => {
        const tasks = [];
        let counter = max;

        const
            dispatch = () => {
                if ( counter > 0 && tasks.length > 0 )
                {
                    --counter;
                    tasks.shift()();
                }
            },
            release  = () => {
                ++counter;
                dispatch();
            },
            acquire = () => new Promise( resolve => {
                tasks.push( resolve );
                setImmediate( dispatch );
            } );

        return async fn => {
            await acquire();

            let result;

            try {
                result = await fn();
            }
            catch ( err ) {
                throw err;
            }
            finally {
                release();
            }

            return result;
        };
    },
    limit     = ( max, fn ) => {
        const sema = Semaphore( max );
        return ( ...args ) => sema( () => fn( ...args ) );
    };

( async () => {
    let sema = Semaphore( 4 ),
        result = await sema(
            async () => {
                console.log( 'acquired' );
                return await someTask( 500 );
            }
        );
} )();


let limitedFn = limit( 2, someTask );

const
    maxWorkers = navigator.hardwareConcurrency || 4,
    defaultHandler = async ( worker, data ) => {
        worker.postMessage( data );
        return await once( 'message' );
    },
    Cluster = ( path, handler = defaultHandler, max = maxWorkers ) => {
        const
            pool = [],
            semaphore = Semaphore( max ),
            useWorker = async fn => {
                const
                    worker = pool.pop() || new Worker( path );

                let result;

                try {
                    result = await fn( worker );
                }
                catch ( err ) {
                    throw err;
                }
                finally {
                    pool.push( worker );
                }

                return result;
            };

        return async data => await semaphore( () => useWorker( worker => handler( worker, data ) ) );
    };

( async () => {
    const
        cluster = Cluster( 'worker.js' ),
        result = await cluster( { all: [ 'the', 'data' ] } );
} )();

// web worker code

import { done } from './rpc';

( async () => {
    while ( true )
    {
        const
            { data } = await once( self, 'message' ),
            res = someTask( 1000 );

        done( res );
    }
} )();
