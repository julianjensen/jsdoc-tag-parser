/** ******************************************************************************************************************
 * @file Describe what scopes does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 01-Apr-2018
 *********************************************************************************************************************/
"use strict";

const
    /** @type {escope} */
    escope = require( 'escope' );

/**
 * @class
 */
class Scopes
{
    /**
     * @param {Program} ast
     */
    constructor( ast )
    {
        this.ast = ast;

        /** @type {ScopeManager} */
        this.scopeManager = escope.analyze( ast );
        this.global = this.current = this.scopeManager.acquire( ast );
    }

    /**
     * @param {Node} node
     */
    get_scope( node )
    {
        return this.scopeManager.acquire( node );
    }
}

module.exports = Scopes;
