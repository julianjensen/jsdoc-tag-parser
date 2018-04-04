/** ******************************************************************************************************************
 * @file Describe what utils does.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 01-Apr-2018
 *********************************************************************************************************************/
"use strict";

const
    { Syntax } = require( 'espree' ),
    { ContainerFlags } = require( './types' );

/**
 * @param {ts.Node} node
 * @return {boolean}
 */
function isObjectLiteralOrClassExpressionMethod( node )
{
    return node.type === Syntax.MethodDefinition && ( node.parent.type === Syntax.ObjectExpression || node.parent.type === Syntax.ClassExpression );
}

/**
 * @param {string} kind
 * @return {boolean}
 */
function isFunctionLikeDeclarationKind( kind )
{
    switch ( kind )
    {
        case Syntax.FunctionDeclaration:
        case Syntax.MethodDefinition:
        case Syntax.FunctionExpression:
        case Syntax.ArrowFunctionExpression:
            return true;
        default:
            return false;
    }
}

/**
 * @param {string} kind
 * @return {boolean}
 */
function isFunctionLikeKind( kind )
{
    switch ( kind )
    {
        case Syntax.MethodDefinition:
        case Syntax.FunctionDeclaration:
            return true;
        default:
            return isFunctionLikeDeclarationKind( kind );
    }
}

/**
 *
 * @param {Node} node
 * @return {Node|boolean}
 */
function isFunctionLike( node )
{
    return node && isFunctionLikeKind( node.type );
}

/**
 * @param {Node} node
 * @return {ContainerFlags|number}
 */
function get_container_flags( node )
{
    switch ( node.type )
    {
        case Syntax.ClassExpression:
        case Syntax.ClassDeclaration:
        case Syntax.ClassBody:
        case Syntax.ObjectExpression:
            return ContainerFlags.IsContainer;

        case Syntax.Program:
        case Syntax.ModuleDeclaration:
            return ContainerFlags.IsContainer | ContainerFlags.HasLocals;

        case Syntax.MethodDefinition:
            if ( isObjectLiteralOrClassExpressionMethod( node ) )
                return ContainerFlags.IsContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsObjectLiteralOrClassExpressionMethod;

        // falls through
        case Syntax.FunctionDeclaration:
            return ContainerFlags.IsContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike;

        case Syntax.FunctionExpression:
        case Syntax.ArrowFunctionExpression:
            if ( node.expression )
                return ContainerFlags.IsContainer | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression;

            return ContainerFlags.IsContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression;

        case Syntax.CatchClause:
        case Syntax.ForStatement:
        case Syntax.ForInStatement:
        case Syntax.ForOfStatement:
        case Syntax.SwitchCase:
            return ContainerFlags.IsBlockScopedContainer;

        case Syntax.BlockStatement:
            /**
             * do not treat blocks directly inside a function as a block-scoped-container.
             * Locals that reside in this block should go to the function locals. Otherwise `x`
             * would not appear to be a redeclaration of a block scoped local in the following
             * example:
             *
             * ```
             *      function foo() {
                 *          var x;
                 *          let x;
                 *      }
             * ```
             *
             * If we placed `var x` into the function locals and `let x` into the locals of
             * the block, then there would be no collision.
             *
             * By not creating a new block-scoped-container here, we ensure that both `var x`
             * and `let x` go into the Function-container's locals, and we do get a collision
             * conflict.
             */
            return isFunctionLike( node.parent ) ? ContainerFlags.None : ContainerFlags.IsBlockScopedContainer;
    }

    return ContainerFlags.None;
}

module.exports = {
    get_container_flags
};
