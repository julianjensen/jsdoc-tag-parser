'use strict';

/**
 * Traverse the specified AST.
 * @param {{ type: NodeType }} node AST to traverse.
 * @param {function({ type: NodeType })?} opt_onEnter Callback for onEnter.
 * @param {function({ type: NodeType })?} opt_onLeave Callback for onLeave.
 */
function traverse( node, opt_onEnter, opt_onLeave )
{
    if ( opt_onEnter ) opt_onEnter( node );

    _collectChildNodes( node ).forEach( childNode => traverse( childNode, opt_onEnter, opt_onLeave ) );

    if ( opt_onLeave ) opt_onLeave( node );
}

/**
 * @enum {number}
 * @private
 */
const _PropertyAccessor = {
    NODE:          ( fn, node ) => fn( node ),
    NODE_LIST:     ( fn, nodes ) => nodes.forEach( node => fn( node ) ),
    NULLABLE_NODE: ( fn, opt_node ) => opt_node && fn( opt_node )
};

/** @private */
const _childNodesMap = {
    NAME:            {},
    MEMBER:          {
        owner: _PropertyAccessor.NODE,
    },
    UNION:           {
        left:  _PropertyAccessor.NODE,
        right: _PropertyAccessor.NODE,
    },
    VARIADIC:        {
        value: _PropertyAccessor.NODE,
    },
    RECORD:          {
        entries: _PropertyAccessor.NODE_LIST,
    },
    RECORD_ENTRY:    {
        value: _PropertyAccessor.NULLABLE_NODE,
    },
    GENERIC:         {
        subject: _PropertyAccessor.NODE,
        objects: _PropertyAccessor.NODE_LIST,
    },
    MODULE:          {
        value: _PropertyAccessor.NODE,
    },
    OPTIONAL:        {
        value: _PropertyAccessor.NODE,
    },
    NULLABLE:        {
        value: _PropertyAccessor.NODE,
    },
    NOT_NULLABLE:    {
        value: _PropertyAccessor.NODE,
    },
    FUNCTION:        {
        params:  _PropertyAccessor.NODE_LIST,
        returns: _PropertyAccessor.NULLABLE_NODE,
        this:    _PropertyAccessor.NULLABLE_NODE,
        new:     _PropertyAccessor.NULLABLE_NODE,
    },
    ANY:             {},
    UNKNOWN:         {},
    INNER_MEMBER:    {
        owner: _PropertyAccessor.NODE,
    },
    INSTANCE_MEMBER: {
        owner: _PropertyAccessor.NODE,
    },
    STRING_VALUE:    {},
    NUMBER_VALUE:    {},
    EXTERNAL:        {
        value: _PropertyAccessor.NODE,
    },
    FILE_PATH:       {},
    PARENTHESIS:     {
        value: _PropertyAccessor.NODE,
    },
};

/** @private */
function _collectChildNodes( node )
{
    const
        childNodes      = [],
        pusher = childNodes.push.bind( childNodes ),
        propAccessorMap = _childNodesMap[ node.type ];

    Object.keys( propAccessorMap ).forEach( propName => propAccessorMap[ propName ]( pusher, node[ propName ] ) );

    return childNodes;
}

module.exports = { traverse };
