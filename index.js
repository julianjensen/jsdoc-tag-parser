'use strict';

const
    { parse, SyntaxError } = require( './lib/parsing.js' ),
    { publish, createDefaultPublisher } = require( './lib/publishing.js' ),
    { traverse } = require( './lib/traversing.js' ),
    NodeType = require( './lib/node-type.js' ),
    SyntaxType = require( './lib/syntax-type.js' );


/**
 * Namespace for jsdoctypeparser.
 * @namespace
 * @exports jsdoctypeparser
 */
module.exports = {
    parse, SyntaxError,
    publish,
    createDefaultPublisher,
    traverse,
    NodeType,
    SyntaxType,
};
