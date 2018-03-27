'use strict';

const format = require( 'util' ).format;

function publish( node, opt_publisher )
{
    const publisher = opt_publisher || createDefaultPublisher();

    return publisher[ node.type ]( node, childNode => publish( childNode, publisher ) );
}

function createDefaultPublisher()
{
    return {
        NAME:            nameNode => nameNode.name,
        MEMBER:          ( memberNode, concretePublish ) => format( '%s.%s', concretePublish( memberNode.owner ), memberNode.name ),
        UNION:           ( unionNode, concretePublish ) => format( '%s|%s', concretePublish( unionNode.left ), concretePublish( unionNode.right ) ),
        VARIADIC:        ( variadicNode, concretePublish ) => format( '...%s', concretePublish( variadicNode.value ) ),
        RECORD:          ( recordNode, concretePublish ) => format( '{%s}', recordNode.entries.map( concretePublish ).join( ', ' ) ),
        RECORD_ENTRY:    ( entryNode, concretePublish ) => !entryNode.value ? entryNode.key : format( '%s: %s', entryNode.key, concretePublish( entryNode.value ) ),

        GENERIC:         ( genericNode, concretePublish ) => format( '%s<%s>', concretePublish( genericNode.subject ), genericNode.objects.map( concretePublish ).join( ', ' ) )
    ,
        MODULE:          ( moduleNode, concretePublish ) => format( 'module:%s', concretePublish( moduleNode.value ) ),
        FILE_PATH:       filePathNode  => filePathNode.path,
        OPTIONAL:        ( optionalNode, concretePublish ) => format( '%s=', concretePublish( optionalNode.value ) ),
        NULLABLE:        ( nullableNode, concretePublish ) => format( '?%s', concretePublish( nullableNode.value ) ),
        NOT_NULLABLE:    ( notNullableNode, concretePublish ) => format( '!%s', concretePublish( notNullableNode.value ) ),
        FUNCTION:        ( functionNode, concretePublish ) => {
            const publidshedParams = functionNode.params.map( concretePublish );

            if ( functionNode.new )
                publidshedParams.unshift( format( 'new: %s', concretePublish( functionNode.new ) ) );

            if ( functionNode.this )
                publidshedParams.unshift( format( 'this: %s', concretePublish( functionNode.this ) ) );

            if ( functionNode.returns )
                return format( 'function(%s): %s', publidshedParams.join( ', ' ), concretePublish( functionNode.returns ) );

            return format( 'function(%s)', publidshedParams.join( ', ' ) );
        },
        ANY:             () => '*',
        UNKNOWN:         () => '?',
        INNER_MEMBER:    ( memberNode, concretePublish )  => concretePublish( memberNode.owner ) + '~' + memberNode.name,
        INSTANCE_MEMBER: ( memberNode, concretePublish ) => concretePublish( memberNode.owner ) + '#' + memberNode.name,
        STRING_VALUE:    stringValueNode => format( '"%s"', stringValueNode.string ),
        NUMBER_VALUE:    numberValueNode => numberValueNode.number,
        EXTERNAL:        ( externalNode, concretePublish ) => format( 'external:%s', concretePublish( externalNode.value ) ),
        PARENTHESIS:     ( parenthesizedNode, concretePublish ) => format( '(%s)', concretePublish( parenthesizedNode.value ) )
    };
}

module.exports = { publish, createDefaultPublisher };
