/* eslint-disable max-len,max-lines,operator-linebreak */
/** *********************************************************************************************************************
 * Enums extracted from /mnt/e/code/typescript/src/compiler/types.ts
 ************************************************************************************************************************/
"use strict";

const
    util = require( 'util' );

let tmp;

const
    isObject = o => typeof o === 'object' && !Array.isArray( o ) && o !== null,
    wrapped  = ( lhs, rhs ) => ( { enumerable: true, writable: true, configurable: true, value: { toString: () => lhs, valueOf: () => rhs, [ Symbol.toPrimitive ]: hint => hint === 'string' ? lhs : rhs } } ),
    named    = name => ( { enumerable: true, writable: true, configurable: true, value: name } ),
    VALUE    = Symbol( 'value' ),
    asString = function( base ) {
        return function( _num = 0 ) {
            let i   = 1,
                s   = [],
                num = +_num;

            if ( typeof _num === 'string' ) return _num;

            while ( num )
            {
                if ( num & 1 )
                    s.push( `${base[ i ]}` );

                num >>>= 1;
                i <<= 1;
            }

            return s.join( ' | ' );
        };
    },
    templ    = () => ( {
        create( val )
        {
            const o = Object.create( Object.getPrototypeOf( this ) );
            o[ VALUE ] = +( isObject( val ) && Reflect.has( val, VALUE ) ? val[ VALUE ] : ( +val || 0 ) );
            return o;
        },
        get value() { return this[ VALUE ]; },
        set value( v ) { this[ VALUE ] = v; },
        asString,
        toString() { return this[ VALUE ] ? this.asString( this[ VALUE ] ) : '<no value>'; },
        valueOf() { return this[ VALUE ] || 0; },
        [ Symbol.toPrimitive ]( hint ) { return hint === 'string' ? this.toString() : this.valueOf(); },
        [ util.inspect.custom ]( depth, options ) { return this.toString(); }
    } );

/** *********************************************************************************************************************
 * @enum
 * @name NodeFlags
 ************************************************************************************************************************/
let NodeFlags = {};
NodeFlags.None = wrapped( 'None', 0 );
NodeFlags[ +NodeFlags.None.value ] = typeof NodeFlags[ +NodeFlags.None.value ] !== 'number' ? named( 'None' ) : NodeFlags[ +NodeFlags.None.value ];
NodeFlags.Let = wrapped( 'Let', 1 << 0 );
NodeFlags[ +NodeFlags.Let.value ] = typeof NodeFlags[ +NodeFlags.Let.value ] !== 'number' ? named( 'Let' ) : NodeFlags[ +NodeFlags.Let.value ];
NodeFlags.Const = wrapped( 'Const', 1 << 1 );
NodeFlags[ +NodeFlags.Const.value ] = typeof NodeFlags[ +NodeFlags.Const.value ] !== 'number' ? named( 'Const' ) : NodeFlags[ +NodeFlags.Const.value ];
NodeFlags.NestedNamespace = wrapped( 'NestedNamespace', 1 << 2 );
NodeFlags[ +NodeFlags.NestedNamespace.value ] = typeof NodeFlags[ +NodeFlags.NestedNamespace.value ] !== 'number' ? named( 'NestedNamespace' ) : NodeFlags[ +NodeFlags.NestedNamespace.value ];
NodeFlags.Synthesized = wrapped( 'Synthesized', 1 << 3 );
NodeFlags[ +NodeFlags.Synthesized.value ] = typeof NodeFlags[ +NodeFlags.Synthesized.value ] !== 'number' ? named( 'Synthesized' ) : NodeFlags[ +NodeFlags.Synthesized.value ];
NodeFlags.Namespace = wrapped( 'Namespace', 1 << 4 );
NodeFlags[ +NodeFlags.Namespace.value ] = typeof NodeFlags[ +NodeFlags.Namespace.value ] !== 'number' ? named( 'Namespace' ) : NodeFlags[ +NodeFlags.Namespace.value ];
NodeFlags.ExportContext = wrapped( 'ExportContext', 1 << 5 );
NodeFlags[ +NodeFlags.ExportContext.value ] = typeof NodeFlags[ +NodeFlags.ExportContext.value ] !== 'number' ? named( 'ExportContext' ) : NodeFlags[ +NodeFlags.ExportContext.value ];
NodeFlags.ContainsThis = wrapped( 'ContainsThis', 1 << 6 );
NodeFlags[ +NodeFlags.ContainsThis.value ] = typeof NodeFlags[ +NodeFlags.ContainsThis.value ] !== 'number' ? named( 'ContainsThis' ) : NodeFlags[ +NodeFlags.ContainsThis.value ];
NodeFlags.HasImplicitReturn = wrapped( 'HasImplicitReturn', 1 << 7 );
NodeFlags[ +NodeFlags.HasImplicitReturn.value ] = typeof NodeFlags[ +NodeFlags.HasImplicitReturn.value ] !== 'number' ? named( 'HasImplicitReturn' ) : NodeFlags[ +NodeFlags.HasImplicitReturn.value ];
NodeFlags.HasExplicitReturn = wrapped( 'HasExplicitReturn', 1 << 8 );
NodeFlags[ +NodeFlags.HasExplicitReturn.value ] = typeof NodeFlags[ +NodeFlags.HasExplicitReturn.value ] !== 'number' ? named( 'HasExplicitReturn' ) : NodeFlags[ +NodeFlags.HasExplicitReturn.value ];
NodeFlags.GlobalAugmentation = wrapped( 'GlobalAugmentation', 1 << 9 );
NodeFlags[ +NodeFlags.GlobalAugmentation.value ] = typeof NodeFlags[ +NodeFlags.GlobalAugmentation.value ] !== 'number' ? named( 'GlobalAugmentation' ) : NodeFlags[ +NodeFlags.GlobalAugmentation.value ];
NodeFlags.HasAsyncFunctions = wrapped( 'HasAsyncFunctions', 1 << 10 );
NodeFlags[ +NodeFlags.HasAsyncFunctions.value ] = typeof NodeFlags[ +NodeFlags.HasAsyncFunctions.value ] !== 'number' ? named( 'HasAsyncFunctions' ) : NodeFlags[ +NodeFlags.HasAsyncFunctions.value ];
NodeFlags.DisallowInContext = wrapped( 'DisallowInContext', 1 << 11 );
NodeFlags[ +NodeFlags.DisallowInContext.value ] = typeof NodeFlags[ +NodeFlags.DisallowInContext.value ] !== 'number' ? named( 'DisallowInContext' ) : NodeFlags[ +NodeFlags.DisallowInContext.value ];
NodeFlags.YieldContext = wrapped( 'YieldContext', 1 << 12 );
NodeFlags[ +NodeFlags.YieldContext.value ] = typeof NodeFlags[ +NodeFlags.YieldContext.value ] !== 'number' ? named( 'YieldContext' ) : NodeFlags[ +NodeFlags.YieldContext.value ];
NodeFlags.DecoratorContext = wrapped( 'DecoratorContext', 1 << 13 );
NodeFlags[ +NodeFlags.DecoratorContext.value ] = typeof NodeFlags[ +NodeFlags.DecoratorContext.value ] !== 'number' ? named( 'DecoratorContext' ) : NodeFlags[ +NodeFlags.DecoratorContext.value ];
NodeFlags.AwaitContext = wrapped( 'AwaitContext', 1 << 14 );
NodeFlags[ +NodeFlags.AwaitContext.value ] = typeof NodeFlags[ +NodeFlags.AwaitContext.value ] !== 'number' ? named( 'AwaitContext' ) : NodeFlags[ +NodeFlags.AwaitContext.value ];
NodeFlags.ThisNodeHasError = wrapped( 'ThisNodeHasError', 1 << 15 );
NodeFlags[ +NodeFlags.ThisNodeHasError.value ] = typeof NodeFlags[ +NodeFlags.ThisNodeHasError.value ] !== 'number' ? named( 'ThisNodeHasError' ) : NodeFlags[ +NodeFlags.ThisNodeHasError.value ];
NodeFlags.JavaScriptFile = wrapped( 'JavaScriptFile', 1 << 16 );
NodeFlags[ +NodeFlags.JavaScriptFile.value ] = typeof NodeFlags[ +NodeFlags.JavaScriptFile.value ] !== 'number' ? named( 'JavaScriptFile' ) : NodeFlags[ +NodeFlags.JavaScriptFile.value ];
NodeFlags.ThisNodeOrAnySubNodesHasError = wrapped( 'ThisNodeOrAnySubNodesHasError', 1 << 17 );
NodeFlags[ +NodeFlags.ThisNodeOrAnySubNodesHasError.value ] =
    typeof NodeFlags[ +NodeFlags.ThisNodeOrAnySubNodesHasError.value ] !== 'number' ? named( 'ThisNodeOrAnySubNodesHasError' ) : NodeFlags[ +NodeFlags.ThisNodeOrAnySubNodesHasError.value ];
NodeFlags.HasAggregatedChildData = wrapped( 'HasAggregatedChildData', 1 << 18 );
NodeFlags[ +NodeFlags.HasAggregatedChildData.value ] = typeof NodeFlags[ +NodeFlags.HasAggregatedChildData.value ] !== 'number' ? named( 'HasAggregatedChildData' ) : NodeFlags[ +NodeFlags.HasAggregatedChildData.value ];
NodeFlags.PossiblyContainsDynamicImport = wrapped( 'PossiblyContainsDynamicImport', 1 << 19 );
NodeFlags[ +NodeFlags.PossiblyContainsDynamicImport.value ] =
    typeof NodeFlags[ +NodeFlags.PossiblyContainsDynamicImport.value ] !== 'number' ? named( 'PossiblyContainsDynamicImport' ) : NodeFlags[ +NodeFlags.PossiblyContainsDynamicImport.value ];
NodeFlags.JSDoc = wrapped( 'JSDoc', 1 << 20 );
NodeFlags[ +NodeFlags.JSDoc.value ] = typeof NodeFlags[ +NodeFlags.JSDoc.value ] !== 'number' ? named( 'JSDoc' ) : NodeFlags[ +NodeFlags.JSDoc.value ];
NodeFlags.Ambient = wrapped( 'Ambient', 1 << 21 );
NodeFlags[ +NodeFlags.Ambient.value ] = typeof NodeFlags[ +NodeFlags.Ambient.value ] !== 'number' ? named( 'Ambient' ) : NodeFlags[ +NodeFlags.Ambient.value ];
NodeFlags.InWithStatement = wrapped( 'InWithStatement', 1 << 22 );
NodeFlags[ +NodeFlags.InWithStatement.value ] = typeof NodeFlags[ +NodeFlags.InWithStatement.value ] !== 'number' ? named( 'InWithStatement' ) : NodeFlags[ +NodeFlags.InWithStatement.value ];
NodeFlags.BlockScoped = wrapped( 'BlockScoped', NodeFlags.Let | NodeFlags.Const );
NodeFlags[ +NodeFlags.BlockScoped.value ] = typeof NodeFlags[ +NodeFlags.BlockScoped.value ] !== 'number' ? named( 'BlockScoped' ) : NodeFlags[ +NodeFlags.BlockScoped.value ];
NodeFlags.ReachabilityCheckFlags = wrapped( 'ReachabilityCheckFlags', NodeFlags.HasImplicitReturn | NodeFlags.HasExplicitReturn );
NodeFlags[ +NodeFlags.ReachabilityCheckFlags.value ] = typeof NodeFlags[ +NodeFlags.ReachabilityCheckFlags.value ] !== 'number' ? named( 'ReachabilityCheckFlags' ) : NodeFlags[ +NodeFlags.ReachabilityCheckFlags.value ];
NodeFlags.ReachabilityAndEmitFlags = wrapped( 'ReachabilityAndEmitFlags', NodeFlags.ReachabilityCheckFlags | NodeFlags.HasAsyncFunctions );
NodeFlags[ +NodeFlags.ReachabilityAndEmitFlags.value ] =
    typeof NodeFlags[ +NodeFlags.ReachabilityAndEmitFlags.value ] !== 'number' ? named( 'ReachabilityAndEmitFlags' ) : NodeFlags[ +NodeFlags.ReachabilityAndEmitFlags.value ];
NodeFlags.ContextFlags =
    wrapped( 'ContextFlags', NodeFlags.DisallowInContext | NodeFlags.YieldContext | NodeFlags.DecoratorContext | NodeFlags.AwaitContext | NodeFlags.JavaScriptFile | NodeFlags.InWithStatement | NodeFlags.Ambient );
NodeFlags[ +NodeFlags.ContextFlags.value ] = typeof NodeFlags[ +NodeFlags.ContextFlags.value ] !== 'number' ? named( 'ContextFlags' ) : NodeFlags[ +NodeFlags.ContextFlags.value ];
NodeFlags.TypeExcludesFlags = wrapped( 'TypeExcludesFlags', NodeFlags.YieldContext | NodeFlags.AwaitContext );
NodeFlags[ +NodeFlags.TypeExcludesFlags.value ] = typeof NodeFlags[ +NodeFlags.TypeExcludesFlags.value ] !== 'number' ? named( 'TypeExcludesFlags' ) : NodeFlags[ +NodeFlags.TypeExcludesFlags.value ];

NodeFlags = Object.create( tmp = templ(), NodeFlags );
tmp.asString = asString( NodeFlags );

/** *********************************************************************************************************************
 * @enum
 * @name ModifierFlags
 ************************************************************************************************************************/
let ModifierFlags = {};
ModifierFlags.None = wrapped( 'None', 0 );
ModifierFlags[ +ModifierFlags.None.value ] = typeof ModifierFlags[ +ModifierFlags.None.value ] !== 'number' ? named( 'None' ) : ModifierFlags[ +ModifierFlags.None.value ];
ModifierFlags.Export = wrapped( 'Export', 1 << 0 );
ModifierFlags[ +ModifierFlags.Export.value ] = typeof ModifierFlags[ +ModifierFlags.Export.value ] !== 'number' ? named( 'Export' ) : ModifierFlags[ +ModifierFlags.Export.value ];
ModifierFlags.Ambient = wrapped( 'Ambient', 1 << 1 );
ModifierFlags[ +ModifierFlags.Ambient.value ] = typeof ModifierFlags[ +ModifierFlags.Ambient.value ] !== 'number' ? named( 'Ambient' ) : ModifierFlags[ +ModifierFlags.Ambient.value ];
ModifierFlags.Public = wrapped( 'Public', 1 << 2 );
ModifierFlags[ +ModifierFlags.Public.value ] = typeof ModifierFlags[ +ModifierFlags.Public.value ] !== 'number' ? named( 'Public' ) : ModifierFlags[ +ModifierFlags.Public.value ];
ModifierFlags.Private = wrapped( 'Private', 1 << 3 );
ModifierFlags[ +ModifierFlags.Private.value ] = typeof ModifierFlags[ +ModifierFlags.Private.value ] !== 'number' ? named( 'Private' ) : ModifierFlags[ +ModifierFlags.Private.value ];
ModifierFlags.Protected = wrapped( 'Protected', 1 << 4 );
ModifierFlags[ +ModifierFlags.Protected.value ] = typeof ModifierFlags[ +ModifierFlags.Protected.value ] !== 'number' ? named( 'Protected' ) : ModifierFlags[ +ModifierFlags.Protected.value ];
ModifierFlags.Static = wrapped( 'Static', 1 << 5 );
ModifierFlags[ +ModifierFlags.Static.value ] = typeof ModifierFlags[ +ModifierFlags.Static.value ] !== 'number' ? named( 'Static' ) : ModifierFlags[ +ModifierFlags.Static.value ];
ModifierFlags.Readonly = wrapped( 'Readonly', 1 << 6 );
ModifierFlags[ +ModifierFlags.Readonly.value ] = typeof ModifierFlags[ +ModifierFlags.Readonly.value ] !== 'number' ? named( 'Readonly' ) : ModifierFlags[ +ModifierFlags.Readonly.value ];
ModifierFlags.Abstract = wrapped( 'Abstract', 1 << 7 );
ModifierFlags[ +ModifierFlags.Abstract.value ] = typeof ModifierFlags[ +ModifierFlags.Abstract.value ] !== 'number' ? named( 'Abstract' ) : ModifierFlags[ +ModifierFlags.Abstract.value ];
ModifierFlags.Async = wrapped( 'Async', 1 << 8 );
ModifierFlags[ +ModifierFlags.Async.value ] = typeof ModifierFlags[ +ModifierFlags.Async.value ] !== 'number' ? named( 'Async' ) : ModifierFlags[ +ModifierFlags.Async.value ];
ModifierFlags.Default = wrapped( 'Default', 1 << 9 );
ModifierFlags[ +ModifierFlags.Default.value ] = typeof ModifierFlags[ +ModifierFlags.Default.value ] !== 'number' ? named( 'Default' ) : ModifierFlags[ +ModifierFlags.Default.value ];

ModifierFlags.GeneratorFunction = wrapped( 'GeneratorFunction', 1 << 12 );
ModifierFlags[ +ModifierFlags.GeneratorFunction.value ] =
    typeof ModifierFlags[ +ModifierFlags.GeneratorFunction.value ] !== 'number' ? named( 'GeneratorFunction' ) : ModifierFlags[ +ModifierFlags.GeneratorFunction.value ];

ModifierFlags.Const = wrapped( 'Const', 1 << 11 );
ModifierFlags[ +ModifierFlags.Const.value ] = typeof ModifierFlags[ +ModifierFlags.Const.value ] !== 'number' ? named( 'Const' ) : ModifierFlags[ +ModifierFlags.Const.value ];
ModifierFlags.HasComputedFlags = wrapped( 'HasComputedFlags', 1 << 29 );
ModifierFlags[ +ModifierFlags.HasComputedFlags.value ] = typeof ModifierFlags[ +ModifierFlags.HasComputedFlags.value ] !== 'number' ? named( 'HasComputedFlags' ) : ModifierFlags[ +ModifierFlags.HasComputedFlags.value ];
ModifierFlags.AccessibilityModifier = wrapped( 'AccessibilityModifier', ModifierFlags.Public | ModifierFlags.Private | ModifierFlags.Protected );
ModifierFlags[ +ModifierFlags.AccessibilityModifier.value ] =
    typeof ModifierFlags[ +ModifierFlags.AccessibilityModifier.value ] !== 'number' ? named( 'AccessibilityModifier' ) : ModifierFlags[ +ModifierFlags.AccessibilityModifier.value ];
ModifierFlags.ParameterPropertyModifier = wrapped( 'ParameterPropertyModifier', ModifierFlags.AccessibilityModifier | ModifierFlags.Readonly );
ModifierFlags[ +ModifierFlags.ParameterPropertyModifier.value ] =
    typeof ModifierFlags[ +ModifierFlags.ParameterPropertyModifier.value ] !== 'number' ? named( 'ParameterPropertyModifier' ) : ModifierFlags[ +ModifierFlags.ParameterPropertyModifier.value ];
ModifierFlags.NonPublicAccessibilityModifier = wrapped( 'NonPublicAccessibilityModifier', ModifierFlags.Private | ModifierFlags.Protected );
ModifierFlags[ +ModifierFlags.NonPublicAccessibilityModifier.value ] =
    typeof ModifierFlags[ +ModifierFlags.NonPublicAccessibilityModifier.value ] !== 'number' ? named( 'NonPublicAccessibilityModifier' ) : ModifierFlags[ +ModifierFlags.NonPublicAccessibilityModifier.value ];
ModifierFlags.TypeScriptModifier =
    wrapped( 'TypeScriptModifier', ModifierFlags.Ambient | ModifierFlags.Public | ModifierFlags.Private | ModifierFlags.Protected | ModifierFlags.Readonly | ModifierFlags.Abstract | ModifierFlags.Const );
ModifierFlags[ +ModifierFlags.TypeScriptModifier.value ] =
    typeof ModifierFlags[ +ModifierFlags.TypeScriptModifier.value ] !== 'number' ? named( 'TypeScriptModifier' ) : ModifierFlags[ +ModifierFlags.TypeScriptModifier.value ];
ModifierFlags.ExportDefault = wrapped( 'ExportDefault', ModifierFlags.Export | ModifierFlags.Default );
ModifierFlags[ +ModifierFlags.ExportDefault.value ] = typeof ModifierFlags[ +ModifierFlags.ExportDefault.value ] !== 'number' ? named( 'ExportDefault' ) : ModifierFlags[ +ModifierFlags.ExportDefault.value ];
ModifierFlags.All =
    wrapped( 'All', ModifierFlags.Export | ModifierFlags.Ambient | ModifierFlags.Public | ModifierFlags.Private | ModifierFlags.Protected | ModifierFlags.Static | ModifierFlags.Readonly | ModifierFlags.Abstract |
                    ModifierFlags.Async | ModifierFlags.Default | ModifierFlags.Const );
ModifierFlags[ +ModifierFlags.All.value ] = typeof ModifierFlags[ +ModifierFlags.All.value ] !== 'number' ? named( 'All' ) : ModifierFlags[ +ModifierFlags.All.value ];

ModifierFlags = Object.create( tmp = templ(), ModifierFlags );
tmp.asString = asString( ModifierFlags );

/** *********************************************************************************************************************
 * @enum
 * @name SymbolFlags
 ************************************************************************************************************************/
let SymbolFlags = {};
SymbolFlags.None = wrapped( 'None', 0 );
SymbolFlags[ +SymbolFlags.None.value ] = typeof SymbolFlags[ +SymbolFlags.None.value ] !== 'number' ? named( 'None' ) : SymbolFlags[ +SymbolFlags.None.value ];
SymbolFlags.FunctionScopedVariable = wrapped( 'FunctionScopedVariable', 1 << 0 );
SymbolFlags[ +SymbolFlags.FunctionScopedVariable.value ] =
    typeof SymbolFlags[ +SymbolFlags.FunctionScopedVariable.value ] !== 'number' ? named( 'FunctionScopedVariable' ) : SymbolFlags[ +SymbolFlags.FunctionScopedVariable.value ];
SymbolFlags.BlockScopedVariable = wrapped( 'BlockScopedVariable', 1 << 1 );
SymbolFlags[ +SymbolFlags.BlockScopedVariable.value ] = typeof SymbolFlags[ +SymbolFlags.BlockScopedVariable.value ] !== 'number' ? named( 'BlockScopedVariable' ) : SymbolFlags[ +SymbolFlags.BlockScopedVariable.value ];
SymbolFlags.Property = wrapped( 'Property', 1 << 2 );
SymbolFlags[ +SymbolFlags.Property.value ] = typeof SymbolFlags[ +SymbolFlags.Property.value ] !== 'number' ? named( 'Property' ) : SymbolFlags[ +SymbolFlags.Property.value ];
SymbolFlags.EnumMember = wrapped( 'EnumMember', 1 << 3 );
SymbolFlags[ +SymbolFlags.EnumMember.value ] = typeof SymbolFlags[ +SymbolFlags.EnumMember.value ] !== 'number' ? named( 'EnumMember' ) : SymbolFlags[ +SymbolFlags.EnumMember.value ];
SymbolFlags.Function = wrapped( 'Function', 1 << 4 );
SymbolFlags[ +SymbolFlags.Function.value ] = typeof SymbolFlags[ +SymbolFlags.Function.value ] !== 'number' ? named( 'Function' ) : SymbolFlags[ +SymbolFlags.Function.value ];
SymbolFlags.Class = wrapped( 'Class', 1 << 5 );
SymbolFlags[ +SymbolFlags.Class.value ] = typeof SymbolFlags[ +SymbolFlags.Class.value ] !== 'number' ? named( 'Class' ) : SymbolFlags[ +SymbolFlags.Class.value ];
SymbolFlags.Interface = wrapped( 'Interface', 1 << 6 );
SymbolFlags[ +SymbolFlags.Interface.value ] = typeof SymbolFlags[ +SymbolFlags.Interface.value ] !== 'number' ? named( 'Interface' ) : SymbolFlags[ +SymbolFlags.Interface.value ];
SymbolFlags.ConstEnum = wrapped( 'ConstEnum', 1 << 7 );
SymbolFlags[ +SymbolFlags.ConstEnum.value ] = typeof SymbolFlags[ +SymbolFlags.ConstEnum.value ] !== 'number' ? named( 'ConstEnum' ) : SymbolFlags[ +SymbolFlags.ConstEnum.value ];
SymbolFlags.RegularEnum = wrapped( 'RegularEnum', 1 << 8 );
SymbolFlags[ +SymbolFlags.RegularEnum.value ] = typeof SymbolFlags[ +SymbolFlags.RegularEnum.value ] !== 'number' ? named( 'RegularEnum' ) : SymbolFlags[ +SymbolFlags.RegularEnum.value ];
SymbolFlags.ValueModule = wrapped( 'ValueModule', 1 << 9 );
SymbolFlags[ +SymbolFlags.ValueModule.value ] = typeof SymbolFlags[ +SymbolFlags.ValueModule.value ] !== 'number' ? named( 'ValueModule' ) : SymbolFlags[ +SymbolFlags.ValueModule.value ];
SymbolFlags.NamespaceModule = wrapped( 'NamespaceModule', 1 << 10 );
SymbolFlags[ +SymbolFlags.NamespaceModule.value ] = typeof SymbolFlags[ +SymbolFlags.NamespaceModule.value ] !== 'number' ? named( 'NamespaceModule' ) : SymbolFlags[ +SymbolFlags.NamespaceModule.value ];
SymbolFlags.TypeLiteral = wrapped( 'TypeLiteral', 1 << 11 );
SymbolFlags[ +SymbolFlags.TypeLiteral.value ] = typeof SymbolFlags[ +SymbolFlags.TypeLiteral.value ] !== 'number' ? named( 'TypeLiteral' ) : SymbolFlags[ +SymbolFlags.TypeLiteral.value ];
SymbolFlags.ObjectLiteral = wrapped( 'ObjectLiteral', 1 << 12 );
SymbolFlags[ +SymbolFlags.ObjectLiteral.value ] = typeof SymbolFlags[ +SymbolFlags.ObjectLiteral.value ] !== 'number' ? named( 'ObjectLiteral' ) : SymbolFlags[ +SymbolFlags.ObjectLiteral.value ];
SymbolFlags.Method = wrapped( 'Method', 1 << 13 );
SymbolFlags[ +SymbolFlags.Method.value ] = typeof SymbolFlags[ +SymbolFlags.Method.value ] !== 'number' ? named( 'Method' ) : SymbolFlags[ +SymbolFlags.Method.value ];
SymbolFlags.Constructor = wrapped( 'Constructor', 1 << 14 );
SymbolFlags[ +SymbolFlags.Constructor.value ] = typeof SymbolFlags[ +SymbolFlags.Constructor.value ] !== 'number' ? named( 'Constructor' ) : SymbolFlags[ +SymbolFlags.Constructor.value ];
SymbolFlags.GetAccessor = wrapped( 'GetAccessor', 1 << 15 );
SymbolFlags[ +SymbolFlags.GetAccessor.value ] = typeof SymbolFlags[ +SymbolFlags.GetAccessor.value ] !== 'number' ? named( 'GetAccessor' ) : SymbolFlags[ +SymbolFlags.GetAccessor.value ];
SymbolFlags.SetAccessor = wrapped( 'SetAccessor', 1 << 16 );
SymbolFlags[ +SymbolFlags.SetAccessor.value ] = typeof SymbolFlags[ +SymbolFlags.SetAccessor.value ] !== 'number' ? named( 'SetAccessor' ) : SymbolFlags[ +SymbolFlags.SetAccessor.value ];
SymbolFlags.Signature = wrapped( 'Signature', 1 << 17 );
SymbolFlags[ +SymbolFlags.Signature.value ] = typeof SymbolFlags[ +SymbolFlags.Signature.value ] !== 'number' ? named( 'Signature' ) : SymbolFlags[ +SymbolFlags.Signature.value ];
SymbolFlags.TypeParameter = wrapped( 'TypeParameter', 1 << 18 );
SymbolFlags[ +SymbolFlags.TypeParameter.value ] = typeof SymbolFlags[ +SymbolFlags.TypeParameter.value ] !== 'number' ? named( 'TypeParameter' ) : SymbolFlags[ +SymbolFlags.TypeParameter.value ];
SymbolFlags.TypeAlias = wrapped( 'TypeAlias', 1 << 19 );
SymbolFlags[ +SymbolFlags.TypeAlias.value ] = typeof SymbolFlags[ +SymbolFlags.TypeAlias.value ] !== 'number' ? named( 'TypeAlias' ) : SymbolFlags[ +SymbolFlags.TypeAlias.value ];
SymbolFlags.ExportValue = wrapped( 'ExportValue', 1 << 20 );
SymbolFlags[ +SymbolFlags.ExportValue.value ] = typeof SymbolFlags[ +SymbolFlags.ExportValue.value ] !== 'number' ? named( 'ExportValue' ) : SymbolFlags[ +SymbolFlags.ExportValue.value ];
SymbolFlags.Alias = wrapped( 'Alias', 1 << 21 );
SymbolFlags[ +SymbolFlags.Alias.value ] = typeof SymbolFlags[ +SymbolFlags.Alias.value ] !== 'number' ? named( 'Alias' ) : SymbolFlags[ +SymbolFlags.Alias.value ];
SymbolFlags.Prototype = wrapped( 'Prototype', 1 << 22 );
SymbolFlags[ +SymbolFlags.Prototype.value ] = typeof SymbolFlags[ +SymbolFlags.Prototype.value ] !== 'number' ? named( 'Prototype' ) : SymbolFlags[ +SymbolFlags.Prototype.value ];
SymbolFlags.ExportStar = wrapped( 'ExportStar', 1 << 23 );
SymbolFlags[ +SymbolFlags.ExportStar.value ] = typeof SymbolFlags[ +SymbolFlags.ExportStar.value ] !== 'number' ? named( 'ExportStar' ) : SymbolFlags[ +SymbolFlags.ExportStar.value ];
SymbolFlags.Optional = wrapped( 'Optional', 1 << 24 );
SymbolFlags[ +SymbolFlags.Optional.value ] = typeof SymbolFlags[ +SymbolFlags.Optional.value ] !== 'number' ? named( 'Optional' ) : SymbolFlags[ +SymbolFlags.Optional.value ];
SymbolFlags.Transient = wrapped( 'Transient', 1 << 25 );
SymbolFlags[ +SymbolFlags.Transient.value ] = typeof SymbolFlags[ +SymbolFlags.Transient.value ] !== 'number' ? named( 'Transient' ) : SymbolFlags[ +SymbolFlags.Transient.value ];
SymbolFlags.JSContainer = wrapped( 'JSContainer', 1 << 26 );
SymbolFlags[ +SymbolFlags.JSContainer.value ] = typeof SymbolFlags[ +SymbolFlags.JSContainer.value ] !== 'number' ? named( 'JSContainer' ) : SymbolFlags[ +SymbolFlags.JSContainer.value ];
SymbolFlags.All = wrapped( 'All', SymbolFlags.FunctionScopedVariable | SymbolFlags.BlockScopedVariable | SymbolFlags.Property | SymbolFlags.EnumMember | SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Interface |
                                  SymbolFlags.ConstEnum | SymbolFlags.RegularEnum | SymbolFlags.ValueModule | SymbolFlags.NamespaceModule | SymbolFlags.TypeLiteral
                                  | SymbolFlags.ObjectLiteral | SymbolFlags.Method | SymbolFlags.Constructor | SymbolFlags.GetAccessor | SymbolFlags.SetAccessor | SymbolFlags.Signature | SymbolFlags.TypeParameter |
                                  SymbolFlags.TypeAlias | SymbolFlags.ExportValue | SymbolFlags.Alias | SymbolFlags.Prototype | SymbolFlags.ExportStar | SymbolFlags.Optional | SymbolFlags.Transient );
SymbolFlags[ +SymbolFlags.All.value ] = typeof SymbolFlags[ +SymbolFlags.All.value ] !== 'number' ? named( 'All' ) : SymbolFlags[ +SymbolFlags.All.value ];
SymbolFlags.Enum = wrapped( 'Enum', SymbolFlags.RegularEnum | SymbolFlags.ConstEnum );
SymbolFlags[ +SymbolFlags.Enum.value ] = typeof SymbolFlags[ +SymbolFlags.Enum.value ] !== 'number' ? named( 'Enum' ) : SymbolFlags[ +SymbolFlags.Enum.value ];
SymbolFlags.Variable = wrapped( 'Variable', SymbolFlags.FunctionScopedVariable | SymbolFlags.BlockScopedVariable );
SymbolFlags[ +SymbolFlags.Variable.value ] = typeof SymbolFlags[ +SymbolFlags.Variable.value ] !== 'number' ? named( 'Variable' ) : SymbolFlags[ +SymbolFlags.Variable.value ];
SymbolFlags.Value = wrapped( 'Value', SymbolFlags.Variable | SymbolFlags.Property | SymbolFlags.EnumMember | SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule | SymbolFlags.Method |
                                      SymbolFlags.GetAccessor | SymbolFlags.SetAccessor | SymbolFlags.JSContainer );
SymbolFlags[ +SymbolFlags.Value.value ] = typeof SymbolFlags[ +SymbolFlags.Value.value ] !== 'number' ? named( 'Value' ) : SymbolFlags[ +SymbolFlags.Value.value ];
SymbolFlags.Type =
    wrapped( 'Type', SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.Enum | SymbolFlags.EnumMember | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral | SymbolFlags.TypeParameter | SymbolFlags.TypeAlias |
                     SymbolFlags.JSContainer );
SymbolFlags[ +SymbolFlags.Type.value ] = typeof SymbolFlags[ +SymbolFlags.Type.value ] !== 'number' ? named( 'Type' ) : SymbolFlags[ +SymbolFlags.Type.value ];
SymbolFlags.Namespace = wrapped( 'Namespace', SymbolFlags.ValueModule | SymbolFlags.NamespaceModule | SymbolFlags.Enum );
SymbolFlags[ +SymbolFlags.Namespace.value ] = typeof SymbolFlags[ +SymbolFlags.Namespace.value ] !== 'number' ? named( 'Namespace' ) : SymbolFlags[ +SymbolFlags.Namespace.value ];
SymbolFlags.Module = wrapped( 'Module', SymbolFlags.ValueModule | SymbolFlags.NamespaceModule );
SymbolFlags[ +SymbolFlags.Module.value ] = typeof SymbolFlags[ +SymbolFlags.Module.value ] !== 'number' ? named( 'Module' ) : SymbolFlags[ +SymbolFlags.Module.value ];
SymbolFlags.Accessor = wrapped( 'Accessor', SymbolFlags.GetAccessor | SymbolFlags.SetAccessor );
SymbolFlags[ +SymbolFlags.Accessor.value ] = typeof SymbolFlags[ +SymbolFlags.Accessor.value ] !== 'number' ? named( 'Accessor' ) : SymbolFlags[ +SymbolFlags.Accessor.value ];
SymbolFlags.FunctionScopedVariableExcludes = wrapped( 'FunctionScopedVariableExcludes', SymbolFlags.Value & ~SymbolFlags.FunctionScopedVariable );
SymbolFlags[ +SymbolFlags.FunctionScopedVariableExcludes.value ] =
    typeof SymbolFlags[ +SymbolFlags.FunctionScopedVariableExcludes.value ] !== 'number' ? named( 'FunctionScopedVariableExcludes' ) : SymbolFlags[ +SymbolFlags.FunctionScopedVariableExcludes.value ];
SymbolFlags.BlockScopedVariableExcludes = wrapped( 'BlockScopedVariableExcludes', +SymbolFlags.Value );
SymbolFlags[ +SymbolFlags.BlockScopedVariableExcludes.value ] =
    typeof SymbolFlags[ +SymbolFlags.BlockScopedVariableExcludes.value ] !== 'number' ? named( 'BlockScopedVariableExcludes' ) : SymbolFlags[ +SymbolFlags.BlockScopedVariableExcludes.value ];
SymbolFlags.ParameterExcludes = wrapped( 'ParameterExcludes', +SymbolFlags.Value );
SymbolFlags[ +SymbolFlags.ParameterExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ParameterExcludes.value ] !== 'number' ? named( 'ParameterExcludes' ) : SymbolFlags[ +SymbolFlags.ParameterExcludes.value ];
SymbolFlags.PropertyExcludes = wrapped( 'PropertyExcludes', +SymbolFlags.None );
SymbolFlags[ +SymbolFlags.PropertyExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.PropertyExcludes.value ] !== 'number' ? named( 'PropertyExcludes' ) : SymbolFlags[ +SymbolFlags.PropertyExcludes.value ];
SymbolFlags.EnumMemberExcludes = wrapped( 'EnumMemberExcludes', SymbolFlags.Value | SymbolFlags.Type );
SymbolFlags[ +SymbolFlags.EnumMemberExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.EnumMemberExcludes.value ] !== 'number' ? named( 'EnumMemberExcludes' ) : SymbolFlags[ +SymbolFlags.EnumMemberExcludes.value ];
SymbolFlags.FunctionExcludes = wrapped( 'FunctionExcludes', SymbolFlags.Value & ~( SymbolFlags.Function | SymbolFlags.ValueModule ) );
SymbolFlags[ +SymbolFlags.FunctionExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.FunctionExcludes.value ] !== 'number' ? named( 'FunctionExcludes' ) : SymbolFlags[ +SymbolFlags.FunctionExcludes.value ];
SymbolFlags.ClassExcludes = wrapped( 'ClassExcludes', ( SymbolFlags.Value | SymbolFlags.Type ) & ~( SymbolFlags.ValueModule | SymbolFlags.Interface ) );
SymbolFlags[ +SymbolFlags.ClassExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ClassExcludes.value ] !== 'number' ? named( 'ClassExcludes' ) : SymbolFlags[ +SymbolFlags.ClassExcludes.value ];
SymbolFlags.InterfaceExcludes = wrapped( 'InterfaceExcludes', SymbolFlags.Type & ~( SymbolFlags.Interface | SymbolFlags.Class ) );
SymbolFlags[ +SymbolFlags.InterfaceExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.InterfaceExcludes.value ] !== 'number' ? named( 'InterfaceExcludes' ) : SymbolFlags[ +SymbolFlags.InterfaceExcludes.value ];
SymbolFlags.RegularEnumExcludes = wrapped( 'RegularEnumExcludes', ( SymbolFlags.Value | SymbolFlags.Type ) & ~( SymbolFlags.RegularEnum | SymbolFlags.ValueModule ) );
SymbolFlags[ +SymbolFlags.RegularEnumExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.RegularEnumExcludes.value ] !== 'number' ? named( 'RegularEnumExcludes' ) : SymbolFlags[ +SymbolFlags.RegularEnumExcludes.value ];
SymbolFlags.ConstEnumExcludes = wrapped( 'ConstEnumExcludes', ( SymbolFlags.Value | SymbolFlags.Type ) & ~SymbolFlags.ConstEnum );
SymbolFlags[ +SymbolFlags.ConstEnumExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ConstEnumExcludes.value ] !== 'number' ? named( 'ConstEnumExcludes' ) : SymbolFlags[ +SymbolFlags.ConstEnumExcludes.value ];
SymbolFlags.ValueModuleExcludes = wrapped( 'ValueModuleExcludes', SymbolFlags.Value & ~( SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.RegularEnum | SymbolFlags.ValueModule ) );
SymbolFlags[ +SymbolFlags.ValueModuleExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.ValueModuleExcludes.value ] !== 'number' ? named( 'ValueModuleExcludes' ) : SymbolFlags[ +SymbolFlags.ValueModuleExcludes.value ];
SymbolFlags.NamespaceModuleExcludes = wrapped( 'NamespaceModuleExcludes', 0 );
SymbolFlags[ +SymbolFlags.NamespaceModuleExcludes.value ] =
    typeof SymbolFlags[ +SymbolFlags.NamespaceModuleExcludes.value ] !== 'number' ? named( 'NamespaceModuleExcludes' ) : SymbolFlags[ +SymbolFlags.NamespaceModuleExcludes.value ];
SymbolFlags.MethodExcludes = wrapped( 'MethodExcludes', SymbolFlags.Value & ~SymbolFlags.Method );
SymbolFlags[ +SymbolFlags.MethodExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.MethodExcludes.value ] !== 'number' ? named( 'MethodExcludes' ) : SymbolFlags[ +SymbolFlags.MethodExcludes.value ];
SymbolFlags.GetAccessorExcludes = wrapped( 'GetAccessorExcludes', SymbolFlags.Value & ~SymbolFlags.SetAccessor );
SymbolFlags[ +SymbolFlags.GetAccessorExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.GetAccessorExcludes.value ] !== 'number' ? named( 'GetAccessorExcludes' ) : SymbolFlags[ +SymbolFlags.GetAccessorExcludes.value ];
SymbolFlags.SetAccessorExcludes = wrapped( 'SetAccessorExcludes', SymbolFlags.Value & ~SymbolFlags.GetAccessor );
SymbolFlags[ +SymbolFlags.SetAccessorExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.SetAccessorExcludes.value ] !== 'number' ? named( 'SetAccessorExcludes' ) : SymbolFlags[ +SymbolFlags.SetAccessorExcludes.value ];
SymbolFlags.TypeParameterExcludes = wrapped( 'TypeParameterExcludes', SymbolFlags.Type & ~SymbolFlags.TypeParameter );
SymbolFlags[ +SymbolFlags.TypeParameterExcludes.value ] =
    typeof SymbolFlags[ +SymbolFlags.TypeParameterExcludes.value ] !== 'number' ? named( 'TypeParameterExcludes' ) : SymbolFlags[ +SymbolFlags.TypeParameterExcludes.value ];
SymbolFlags.TypeAliasExcludes = wrapped( 'TypeAliasExcludes', +SymbolFlags.Type );
SymbolFlags[ +SymbolFlags.TypeAliasExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.TypeAliasExcludes.value ] !== 'number' ? named( 'TypeAliasExcludes' ) : SymbolFlags[ +SymbolFlags.TypeAliasExcludes.value ];
SymbolFlags.AliasExcludes = wrapped( 'AliasExcludes', +SymbolFlags.Alias );
SymbolFlags[ +SymbolFlags.AliasExcludes.value ] = typeof SymbolFlags[ +SymbolFlags.AliasExcludes.value ] !== 'number' ? named( 'AliasExcludes' ) : SymbolFlags[ +SymbolFlags.AliasExcludes.value ];
SymbolFlags.ModuleMember =
    wrapped( 'ModuleMember', SymbolFlags.Variable | SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.Enum | SymbolFlags.Module | SymbolFlags.TypeAlias | SymbolFlags.Alias );
SymbolFlags[ +SymbolFlags.ModuleMember.value ] = typeof SymbolFlags[ +SymbolFlags.ModuleMember.value ] !== 'number' ? named( 'ModuleMember' ) : SymbolFlags[ +SymbolFlags.ModuleMember.value ];
SymbolFlags.ExportHasLocal = wrapped( 'ExportHasLocal', SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule );
SymbolFlags[ +SymbolFlags.ExportHasLocal.value ] = typeof SymbolFlags[ +SymbolFlags.ExportHasLocal.value ] !== 'number' ? named( 'ExportHasLocal' ) : SymbolFlags[ +SymbolFlags.ExportHasLocal.value ];
SymbolFlags.HasExports = wrapped( 'HasExports', SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.Module );
SymbolFlags[ +SymbolFlags.HasExports.value ] = typeof SymbolFlags[ +SymbolFlags.HasExports.value ] !== 'number' ? named( 'HasExports' ) : SymbolFlags[ +SymbolFlags.HasExports.value ];
SymbolFlags.HasMembers = wrapped( 'HasMembers', SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral );
SymbolFlags[ +SymbolFlags.HasMembers.value ] = typeof SymbolFlags[ +SymbolFlags.HasMembers.value ] !== 'number' ? named( 'HasMembers' ) : SymbolFlags[ +SymbolFlags.HasMembers.value ];
SymbolFlags.BlockScoped = wrapped( 'BlockScoped', SymbolFlags.BlockScopedVariable | SymbolFlags.Class | SymbolFlags.Enum );
SymbolFlags[ +SymbolFlags.BlockScoped.value ] = typeof SymbolFlags[ +SymbolFlags.BlockScoped.value ] !== 'number' ? named( 'BlockScoped' ) : SymbolFlags[ +SymbolFlags.BlockScoped.value ];
SymbolFlags.PropertyOrAccessor = wrapped( 'PropertyOrAccessor', SymbolFlags.Property | SymbolFlags.Accessor );
SymbolFlags[ +SymbolFlags.PropertyOrAccessor.value ] = typeof SymbolFlags[ +SymbolFlags.PropertyOrAccessor.value ] !== 'number' ? named( 'PropertyOrAccessor' ) : SymbolFlags[ +SymbolFlags.PropertyOrAccessor.value ];
SymbolFlags.ClassMember = wrapped( 'ClassMember', SymbolFlags.Method | SymbolFlags.Accessor | SymbolFlags.Property );
SymbolFlags[ +SymbolFlags.ClassMember.value ] = typeof SymbolFlags[ +SymbolFlags.ClassMember.value ] !== 'number' ? named( 'ClassMember' ) : SymbolFlags[ +SymbolFlags.ClassMember.value ];
SymbolFlags.Classifiable = wrapped( 'Classifiable', SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.TypeAlias | SymbolFlags.Interface | SymbolFlags.TypeParameter | SymbolFlags.Module | SymbolFlags.Alias );
SymbolFlags[ +SymbolFlags.Classifiable.value ] = typeof SymbolFlags[ +SymbolFlags.Classifiable.value ] !== 'number' ? named( 'Classifiable' ) : SymbolFlags[ +SymbolFlags.Classifiable.value ];
SymbolFlags.LateBindingContainer = wrapped( 'LateBindingContainer', SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral );
SymbolFlags[ +SymbolFlags.LateBindingContainer.value ] =
    typeof SymbolFlags[ +SymbolFlags.LateBindingContainer.value ] !== 'number' ? named( 'LateBindingContainer' ) : SymbolFlags[ +SymbolFlags.LateBindingContainer.value ];

SymbolFlags = Object.create( tmp = templ(), SymbolFlags );
tmp.asString = asString( SymbolFlags );

/** *********************************************************************************************************************
 * @enum
 * @name InternalSymbolName
 ************************************************************************************************************************/
let InternalSymbolName = {};
InternalSymbolName.Call = wrapped( 'Call', "__call" );
InternalSymbolName[ +InternalSymbolName.Call.value ] = typeof InternalSymbolName[ +InternalSymbolName.Call.value ] !== 'number' ? named( 'Call' ) : InternalSymbolName[ +InternalSymbolName.Call.value ];
InternalSymbolName.Constructor = wrapped( 'Constructor', "__constructor" );
InternalSymbolName[ +InternalSymbolName.Constructor.value ] =
    typeof InternalSymbolName[ +InternalSymbolName.Constructor.value ] !== 'number' ? named( 'Constructor' ) : InternalSymbolName[ +InternalSymbolName.Constructor.value ];
InternalSymbolName.New = wrapped( 'New', "__new" );
InternalSymbolName[ +InternalSymbolName.New.value ] = typeof InternalSymbolName[ +InternalSymbolName.New.value ] !== 'number' ? named( 'New' ) : InternalSymbolName[ +InternalSymbolName.New.value ];
InternalSymbolName.Index = wrapped( 'Index', "__index" );
InternalSymbolName[ +InternalSymbolName.Index.value ] = typeof InternalSymbolName[ +InternalSymbolName.Index.value ] !== 'number' ? named( 'Index' ) : InternalSymbolName[ +InternalSymbolName.Index.value ];
InternalSymbolName.ExportStar = wrapped( 'ExportStar', "__export" );
InternalSymbolName[ +InternalSymbolName.ExportStar.value ] =
    typeof InternalSymbolName[ +InternalSymbolName.ExportStar.value ] !== 'number' ? named( 'ExportStar' ) : InternalSymbolName[ +InternalSymbolName.ExportStar.value ];
InternalSymbolName.Global = wrapped( 'Global', "__global" );
InternalSymbolName[ +InternalSymbolName.Global.value ] = typeof InternalSymbolName[ +InternalSymbolName.Global.value ] !== 'number' ? named( 'Global' ) : InternalSymbolName[ +InternalSymbolName.Global.value ];
InternalSymbolName.Missing = wrapped( 'Missing', "__missing" );
InternalSymbolName[ +InternalSymbolName.Missing.value ] = typeof InternalSymbolName[ +InternalSymbolName.Missing.value ] !== 'number' ? named( 'Missing' ) : InternalSymbolName[ +InternalSymbolName.Missing.value ];
InternalSymbolName.Type = wrapped( 'Type', "__type" );
InternalSymbolName[ +InternalSymbolName.Type.value ] = typeof InternalSymbolName[ +InternalSymbolName.Type.value ] !== 'number' ? named( 'Type' ) : InternalSymbolName[ +InternalSymbolName.Type.value ];
InternalSymbolName.Object = wrapped( 'Object', "__object" );
InternalSymbolName[ +InternalSymbolName.Object.value ] = typeof InternalSymbolName[ +InternalSymbolName.Object.value ] !== 'number' ? named( 'Object' ) : InternalSymbolName[ +InternalSymbolName.Object.value ];
InternalSymbolName.JSXAttributes = wrapped( 'JSXAttributes', "__jsxInternalSymbolName.Attributes" );
InternalSymbolName[ +InternalSymbolName.JSXAttributes.value ] =
    typeof InternalSymbolName[ +InternalSymbolName.JSXAttributes.value ] !== 'number' ? named( 'JSXAttributes' ) : InternalSymbolName[ +InternalSymbolName.JSXAttributes.value ];
InternalSymbolName.Class = wrapped( 'Class', "__class" );
InternalSymbolName[ +InternalSymbolName.Class.value ] = typeof InternalSymbolName[ +InternalSymbolName.Class.value ] !== 'number' ? named( 'Class' ) : InternalSymbolName[ +InternalSymbolName.Class.value ];
InternalSymbolName.Function = wrapped( 'Function', "__function" );
InternalSymbolName[ +InternalSymbolName.Function.value ] = typeof InternalSymbolName[ +InternalSymbolName.Function.value ] !== 'number' ? named( 'Function' ) : InternalSymbolName[ +InternalSymbolName.Function.value ];
InternalSymbolName.Computed = wrapped( 'Computed', "__computed" );
InternalSymbolName[ +InternalSymbolName.Computed.value ] = typeof InternalSymbolName[ +InternalSymbolName.Computed.value ] !== 'number' ? named( 'Computed' ) : InternalSymbolName[ +InternalSymbolName.Computed.value ];
InternalSymbolName.Resolving = wrapped( 'Resolving', "__resolving__" );
InternalSymbolName[ +InternalSymbolName.Resolving.value ] =
    typeof InternalSymbolName[ +InternalSymbolName.Resolving.value ] !== 'number' ? named( 'Resolving' ) : InternalSymbolName[ +InternalSymbolName.Resolving.value ];
InternalSymbolName.ExportEquals = wrapped( 'ExportEquals', "export=" );
InternalSymbolName[ +InternalSymbolName.ExportEquals.value ] =
    typeof InternalSymbolName[ +InternalSymbolName.ExportEquals.value ] !== 'number' ? named( 'ExportEquals' ) : InternalSymbolName[ +InternalSymbolName.ExportEquals.value ];
InternalSymbolName.Default = wrapped( 'Default', "default" );
InternalSymbolName[ +InternalSymbolName.Default.value ] = typeof InternalSymbolName[ +InternalSymbolName.Default.value ] !== 'number' ? named( 'Default' ) : InternalSymbolName[ +InternalSymbolName.Default.value ];

InternalSymbolName = Object.create( tmp = templ(), InternalSymbolName );
tmp.asString = asString( InternalSymbolName );

/** *********************************************************************************************************************
 * @enum
 * @name TypeFlags
 ************************************************************************************************************************/
let TypeFlags = {};
TypeFlags.Any = wrapped( 'Any', 1 << 0 );
TypeFlags[ +TypeFlags.Any.value ] = typeof TypeFlags[ +TypeFlags.Any.value ] !== 'number' ? named( 'Any' ) : TypeFlags[ +TypeFlags.Any.value ];
TypeFlags.String = wrapped( 'String', 1 << 1 );
TypeFlags[ +TypeFlags.String.value ] = typeof TypeFlags[ +TypeFlags.String.value ] !== 'number' ? named( 'String' ) : TypeFlags[ +TypeFlags.String.value ];
TypeFlags.Number = wrapped( 'Number', 1 << 2 );
TypeFlags[ +TypeFlags.Number.value ] = typeof TypeFlags[ +TypeFlags.Number.value ] !== 'number' ? named( 'Number' ) : TypeFlags[ +TypeFlags.Number.value ];
TypeFlags.Boolean = wrapped( 'Boolean', 1 << 3 );
TypeFlags[ +TypeFlags.Boolean.value ] = typeof TypeFlags[ +TypeFlags.Boolean.value ] !== 'number' ? named( 'Boolean' ) : TypeFlags[ +TypeFlags.Boolean.value ];
TypeFlags.Enum = wrapped( 'Enum', 1 << 4 );
TypeFlags[ +TypeFlags.Enum.value ] = typeof TypeFlags[ +TypeFlags.Enum.value ] !== 'number' ? named( 'Enum' ) : TypeFlags[ +TypeFlags.Enum.value ];
TypeFlags.StringLiteral = wrapped( 'StringLiteral', 1 << 5 );
TypeFlags[ +TypeFlags.StringLiteral.value ] = typeof TypeFlags[ +TypeFlags.StringLiteral.value ] !== 'number' ? named( 'StringLiteral' ) : TypeFlags[ +TypeFlags.StringLiteral.value ];
TypeFlags.NumberLiteral = wrapped( 'NumberLiteral', 1 << 6 );
TypeFlags[ +TypeFlags.NumberLiteral.value ] = typeof TypeFlags[ +TypeFlags.NumberLiteral.value ] !== 'number' ? named( 'NumberLiteral' ) : TypeFlags[ +TypeFlags.NumberLiteral.value ];
TypeFlags.BooleanLiteral = wrapped( 'BooleanLiteral', 1 << 7 );
TypeFlags[ +TypeFlags.BooleanLiteral.value ] = typeof TypeFlags[ +TypeFlags.BooleanLiteral.value ] !== 'number' ? named( 'BooleanLiteral' ) : TypeFlags[ +TypeFlags.BooleanLiteral.value ];
TypeFlags.EnumLiteral = wrapped( 'EnumLiteral', 1 << 8 );
TypeFlags[ +TypeFlags.EnumLiteral.value ] = typeof TypeFlags[ +TypeFlags.EnumLiteral.value ] !== 'number' ? named( 'EnumLiteral' ) : TypeFlags[ +TypeFlags.EnumLiteral.value ];
TypeFlags.ESSymbol = wrapped( 'ESSymbol', 1 << 9 );
TypeFlags[ +TypeFlags.ESSymbol.value ] = typeof TypeFlags[ +TypeFlags.ESSymbol.value ] !== 'number' ? named( 'ESSymbol' ) : TypeFlags[ +TypeFlags.ESSymbol.value ];
TypeFlags.UniqueESSymbol = wrapped( 'UniqueESSymbol', 1 << 10 );
TypeFlags[ +TypeFlags.UniqueESSymbol.value ] = typeof TypeFlags[ +TypeFlags.UniqueESSymbol.value ] !== 'number' ? named( 'UniqueESSymbol' ) : TypeFlags[ +TypeFlags.UniqueESSymbol.value ];
TypeFlags.Void = wrapped( 'Void', 1 << 11 );
TypeFlags[ +TypeFlags.Void.value ] = typeof TypeFlags[ +TypeFlags.Void.value ] !== 'number' ? named( 'Void' ) : TypeFlags[ +TypeFlags.Void.value ];
TypeFlags.Undefined = wrapped( 'Undefined', 1 << 12 );
TypeFlags[ +TypeFlags.Undefined.value ] = typeof TypeFlags[ +TypeFlags.Undefined.value ] !== 'number' ? named( 'Undefined' ) : TypeFlags[ +TypeFlags.Undefined.value ];
TypeFlags.Null = wrapped( 'Null', 1 << 13 );
TypeFlags[ +TypeFlags.Null.value ] = typeof TypeFlags[ +TypeFlags.Null.value ] !== 'number' ? named( 'Null' ) : TypeFlags[ +TypeFlags.Null.value ];
TypeFlags.Never = wrapped( 'Never', 1 << 14 );
TypeFlags[ +TypeFlags.Never.value ] = typeof TypeFlags[ +TypeFlags.Never.value ] !== 'number' ? named( 'Never' ) : TypeFlags[ +TypeFlags.Never.value ];
TypeFlags.TypeParameter = wrapped( 'TypeParameter', 1 << 15 );
TypeFlags[ +TypeFlags.TypeParameter.value ] = typeof TypeFlags[ +TypeFlags.TypeParameter.value ] !== 'number' ? named( 'TypeParameter' ) : TypeFlags[ +TypeFlags.TypeParameter.value ];
TypeFlags.Object = wrapped( 'Object', 1 << 16 );
TypeFlags[ +TypeFlags.Object.value ] = typeof TypeFlags[ +TypeFlags.Object.value ] !== 'number' ? named( 'Object' ) : TypeFlags[ +TypeFlags.Object.value ];
TypeFlags.Union = wrapped( 'Union', 1 << 17 );
TypeFlags[ +TypeFlags.Union.value ] = typeof TypeFlags[ +TypeFlags.Union.value ] !== 'number' ? named( 'Union' ) : TypeFlags[ +TypeFlags.Union.value ];
TypeFlags.Intersection = wrapped( 'Intersection', 1 << 18 );
TypeFlags[ +TypeFlags.Intersection.value ] = typeof TypeFlags[ +TypeFlags.Intersection.value ] !== 'number' ? named( 'Intersection' ) : TypeFlags[ +TypeFlags.Intersection.value ];
TypeFlags.Index = wrapped( 'Index', 1 << 19 );
TypeFlags[ +TypeFlags.Index.value ] = typeof TypeFlags[ +TypeFlags.Index.value ] !== 'number' ? named( 'Index' ) : TypeFlags[ +TypeFlags.Index.value ];
TypeFlags.IndexedAccess = wrapped( 'IndexedAccess', 1 << 20 );
TypeFlags[ +TypeFlags.IndexedAccess.value ] = typeof TypeFlags[ +TypeFlags.IndexedAccess.value ] !== 'number' ? named( 'IndexedAccess' ) : TypeFlags[ +TypeFlags.IndexedAccess.value ];
TypeFlags.Conditional = wrapped( 'Conditional', 1 << 21 );
TypeFlags[ +TypeFlags.Conditional.value ] = typeof TypeFlags[ +TypeFlags.Conditional.value ] !== 'number' ? named( 'Conditional' ) : TypeFlags[ +TypeFlags.Conditional.value ];
TypeFlags.Substitution = wrapped( 'Substitution', 1 << 22 );
TypeFlags[ +TypeFlags.Substitution.value ] = typeof TypeFlags[ +TypeFlags.Substitution.value ] !== 'number' ? named( 'Substitution' ) : TypeFlags[ +TypeFlags.Substitution.value ];
TypeFlags.FreshLiteral = wrapped( 'FreshLiteral', 1 << 23 );
TypeFlags[ +TypeFlags.FreshLiteral.value ] = typeof TypeFlags[ +TypeFlags.FreshLiteral.value ] !== 'number' ? named( 'FreshLiteral' ) : TypeFlags[ +TypeFlags.FreshLiteral.value ];
TypeFlags.ContainsWideningType = wrapped( 'ContainsWideningType', 1 << 24 );
TypeFlags[ +TypeFlags.ContainsWideningType.value ] = typeof TypeFlags[ +TypeFlags.ContainsWideningType.value ] !== 'number' ? named( 'ContainsWideningType' ) : TypeFlags[ +TypeFlags.ContainsWideningType.value ];
TypeFlags.ContainsObjectLiteral = wrapped( 'ContainsObjectLiteral', 1 << 25 );
TypeFlags[ +TypeFlags.ContainsObjectLiteral.value ] = typeof TypeFlags[ +TypeFlags.ContainsObjectLiteral.value ] !== 'number' ? named( 'ContainsObjectLiteral' ) : TypeFlags[ +TypeFlags.ContainsObjectLiteral.value ];
TypeFlags.ContainsAnyFunctionType = wrapped( 'ContainsAnyFunctionType', 1 << 26 );
TypeFlags[ +TypeFlags.ContainsAnyFunctionType.value ] =
    typeof TypeFlags[ +TypeFlags.ContainsAnyFunctionType.value ] !== 'number' ? named( 'ContainsAnyFunctionType' ) : TypeFlags[ +TypeFlags.ContainsAnyFunctionType.value ];
TypeFlags.NonPrimitive = wrapped( 'NonPrimitive', 1 << 27 );
TypeFlags[ +TypeFlags.NonPrimitive.value ] = typeof TypeFlags[ +TypeFlags.NonPrimitive.value ] !== 'number' ? named( 'NonPrimitive' ) : TypeFlags[ +TypeFlags.NonPrimitive.value ];
TypeFlags.GenericMappedType = wrapped( 'GenericMappedType', 1 << 29 );
TypeFlags[ +TypeFlags.GenericMappedType.value ] = typeof TypeFlags[ +TypeFlags.GenericMappedType.value ] !== 'number' ? named( 'GenericMappedType' ) : TypeFlags[ +TypeFlags.GenericMappedType.value ];
TypeFlags.Nullable = wrapped( 'Nullable', TypeFlags.Undefined | TypeFlags.Null );
TypeFlags[ +TypeFlags.Nullable.value ] = typeof TypeFlags[ +TypeFlags.Nullable.value ] !== 'number' ? named( 'Nullable' ) : TypeFlags[ +TypeFlags.Nullable.value ];
TypeFlags.Literal = wrapped( 'Literal', TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BooleanLiteral );
TypeFlags[ +TypeFlags.Literal.value ] = typeof TypeFlags[ +TypeFlags.Literal.value ] !== 'number' ? named( 'Literal' ) : TypeFlags[ +TypeFlags.Literal.value ];
TypeFlags.Unit = wrapped( 'Unit', TypeFlags.Literal | TypeFlags.UniqueESSymbol | TypeFlags.Nullable );
TypeFlags[ +TypeFlags.Unit.value ] = typeof TypeFlags[ +TypeFlags.Unit.value ] !== 'number' ? named( 'Unit' ) : TypeFlags[ +TypeFlags.Unit.value ];
TypeFlags.StringOrNumberLiteral = wrapped( 'StringOrNumberLiteral', TypeFlags.StringLiteral | TypeFlags.NumberLiteral );
TypeFlags[ +TypeFlags.StringOrNumberLiteral.value ] = typeof TypeFlags[ +TypeFlags.StringOrNumberLiteral.value ] !== 'number' ? named( 'StringOrNumberLiteral' ) : TypeFlags[ +TypeFlags.StringOrNumberLiteral.value ];
TypeFlags.StringOrNumberLiteralOrUnique = wrapped( 'StringOrNumberLiteralOrUnique', TypeFlags.StringOrNumberLiteral | TypeFlags.UniqueESSymbol );
TypeFlags[ +TypeFlags.StringOrNumberLiteralOrUnique.value ] =
    typeof TypeFlags[ +TypeFlags.StringOrNumberLiteralOrUnique.value ] !== 'number' ? named( 'StringOrNumberLiteralOrUnique' ) : TypeFlags[ +TypeFlags.StringOrNumberLiteralOrUnique.value ];
TypeFlags.DefinitelyFalsy = wrapped( 'DefinitelyFalsy', TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BooleanLiteral | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null );
TypeFlags[ +TypeFlags.DefinitelyFalsy.value ] = typeof TypeFlags[ +TypeFlags.DefinitelyFalsy.value ] !== 'number' ? named( 'DefinitelyFalsy' ) : TypeFlags[ +TypeFlags.DefinitelyFalsy.value ];
TypeFlags.PossiblyFalsy = wrapped( 'PossiblyFalsy', TypeFlags.DefinitelyFalsy | TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean );
TypeFlags[ +TypeFlags.PossiblyFalsy.value ] = typeof TypeFlags[ +TypeFlags.PossiblyFalsy.value ] !== 'number' ? named( 'PossiblyFalsy' ) : TypeFlags[ +TypeFlags.PossiblyFalsy.value ];
TypeFlags.Intrinsic =
    wrapped( 'Intrinsic', TypeFlags.Any | TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean | TypeFlags.BooleanLiteral | TypeFlags.ESSymbol | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null |
                          TypeFlags.Never | TypeFlags.NonPrimitive );
TypeFlags[ +TypeFlags.Intrinsic.value ] = typeof TypeFlags[ +TypeFlags.Intrinsic.value ] !== 'number' ? named( 'Intrinsic' ) : TypeFlags[ +TypeFlags.Intrinsic.value ];
TypeFlags.Primitive = wrapped( 'Primitive', TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean | TypeFlags.Enum | TypeFlags.EnumLiteral | TypeFlags.ESSymbol | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null |
                                            TypeFlags.Literal | TypeFlags.UniqueESSymbol );
TypeFlags[ +TypeFlags.Primitive.value ] = typeof TypeFlags[ +TypeFlags.Primitive.value ] !== 'number' ? named( 'Primitive' ) : TypeFlags[ +TypeFlags.Primitive.value ];
TypeFlags.StringLike = wrapped( 'StringLike', TypeFlags.String | TypeFlags.StringLiteral | TypeFlags.Index );
TypeFlags[ +TypeFlags.StringLike.value ] = typeof TypeFlags[ +TypeFlags.StringLike.value ] !== 'number' ? named( 'StringLike' ) : TypeFlags[ +TypeFlags.StringLike.value ];
TypeFlags.NumberLike = wrapped( 'NumberLike', TypeFlags.Number | TypeFlags.NumberLiteral | TypeFlags.Enum );
TypeFlags[ +TypeFlags.NumberLike.value ] = typeof TypeFlags[ +TypeFlags.NumberLike.value ] !== 'number' ? named( 'NumberLike' ) : TypeFlags[ +TypeFlags.NumberLike.value ];
TypeFlags.BooleanLike = wrapped( 'BooleanLike', TypeFlags.Boolean | TypeFlags.BooleanLiteral );
TypeFlags[ +TypeFlags.BooleanLike.value ] = typeof TypeFlags[ +TypeFlags.BooleanLike.value ] !== 'number' ? named( 'BooleanLike' ) : TypeFlags[ +TypeFlags.BooleanLike.value ];
TypeFlags.EnumLike = wrapped( 'EnumLike', TypeFlags.Enum | TypeFlags.EnumLiteral );
TypeFlags[ +TypeFlags.EnumLike.value ] = typeof TypeFlags[ +TypeFlags.EnumLike.value ] !== 'number' ? named( 'EnumLike' ) : TypeFlags[ +TypeFlags.EnumLike.value ];
TypeFlags.ESSymbolLike = wrapped( 'ESSymbolLike', TypeFlags.ESSymbol | TypeFlags.UniqueESSymbol );
TypeFlags[ +TypeFlags.ESSymbolLike.value ] = typeof TypeFlags[ +TypeFlags.ESSymbolLike.value ] !== 'number' ? named( 'ESSymbolLike' ) : TypeFlags[ +TypeFlags.ESSymbolLike.value ];
TypeFlags.UnionOrIntersection = wrapped( 'UnionOrIntersection', TypeFlags.Union | TypeFlags.Intersection );
TypeFlags[ +TypeFlags.UnionOrIntersection.value ] = typeof TypeFlags[ +TypeFlags.UnionOrIntersection.value ] !== 'number' ? named( 'UnionOrIntersection' ) : TypeFlags[ +TypeFlags.UnionOrIntersection.value ];
TypeFlags.StructuredType = wrapped( 'StructuredType', TypeFlags.Object | TypeFlags.Union | TypeFlags.Intersection );
TypeFlags[ +TypeFlags.StructuredType.value ] = typeof TypeFlags[ +TypeFlags.StructuredType.value ] !== 'number' ? named( 'StructuredType' ) : TypeFlags[ +TypeFlags.StructuredType.value ];
TypeFlags.TypeVariable = wrapped( 'TypeVariable', TypeFlags.TypeParameter | TypeFlags.IndexedAccess );
TypeFlags[ +TypeFlags.TypeVariable.value ] = typeof TypeFlags[ +TypeFlags.TypeVariable.value ] !== 'number' ? named( 'TypeVariable' ) : TypeFlags[ +TypeFlags.TypeVariable.value ];
TypeFlags.InstantiableNonPrimitive = wrapped( 'InstantiableNonPrimitive', TypeFlags.TypeVariable | TypeFlags.Conditional | TypeFlags.Substitution );
TypeFlags[ +TypeFlags.InstantiableNonPrimitive.value ] =
    typeof TypeFlags[ +TypeFlags.InstantiableNonPrimitive.value ] !== 'number' ? named( 'InstantiableNonPrimitive' ) : TypeFlags[ +TypeFlags.InstantiableNonPrimitive.value ];
TypeFlags.InstantiablePrimitive = wrapped( 'InstantiablePrimitive', +TypeFlags.Index );
TypeFlags[ +TypeFlags.InstantiablePrimitive.value ] = typeof TypeFlags[ +TypeFlags.InstantiablePrimitive.value ] !== 'number' ? named( 'InstantiablePrimitive' ) : TypeFlags[ +TypeFlags.InstantiablePrimitive.value ];
TypeFlags.Instantiable = wrapped( 'Instantiable', TypeFlags.InstantiableNonPrimitive | TypeFlags.InstantiablePrimitive );
TypeFlags[ +TypeFlags.Instantiable.value ] = typeof TypeFlags[ +TypeFlags.Instantiable.value ] !== 'number' ? named( 'Instantiable' ) : TypeFlags[ +TypeFlags.Instantiable.value ];
TypeFlags.StructuredOrInstantiable = wrapped( 'StructuredOrInstantiable', TypeFlags.StructuredType | TypeFlags.Instantiable );
TypeFlags[ +TypeFlags.StructuredOrInstantiable.value ] =
    typeof TypeFlags[ +TypeFlags.StructuredOrInstantiable.value ] !== 'number' ? named( 'StructuredOrInstantiable' ) : TypeFlags[ +TypeFlags.StructuredOrInstantiable.value ];
TypeFlags.Narrowable = wrapped( 'Narrowable', TypeFlags.Any | TypeFlags.StructuredOrInstantiable | TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.BooleanLike | TypeFlags.ESSymbol | TypeFlags.UniqueESSymbol |
                                              TypeFlags.NonPrimitive );
TypeFlags[ +TypeFlags.Narrowable.value ] = typeof TypeFlags[ +TypeFlags.Narrowable.value ] !== 'number' ? named( 'Narrowable' ) : TypeFlags[ +TypeFlags.Narrowable.value ];
TypeFlags.NotUnionOrUnit = wrapped( 'NotUnionOrUnit', TypeFlags.Any | TypeFlags.ESSymbol | TypeFlags.Object | TypeFlags.NonPrimitive );
TypeFlags[ +TypeFlags.NotUnionOrUnit.value ] = typeof TypeFlags[ +TypeFlags.NotUnionOrUnit.value ] !== 'number' ? named( 'NotUnionOrUnit' ) : TypeFlags[ +TypeFlags.NotUnionOrUnit.value ];
TypeFlags.RequiresWidening = wrapped( 'RequiresWidening', TypeFlags.ContainsWideningType | TypeFlags.ContainsObjectLiteral );
TypeFlags[ +TypeFlags.RequiresWidening.value ] = typeof TypeFlags[ +TypeFlags.RequiresWidening.value ] !== 'number' ? named( 'RequiresWidening' ) : TypeFlags[ +TypeFlags.RequiresWidening.value ];
TypeFlags.PropagatingFlags = wrapped( 'PropagatingFlags', TypeFlags.ContainsWideningType | TypeFlags.ContainsObjectLiteral | TypeFlags.ContainsAnyFunctionType );
TypeFlags[ +TypeFlags.PropagatingFlags.value ] = typeof TypeFlags[ +TypeFlags.PropagatingFlags.value ] !== 'number' ? named( 'PropagatingFlags' ) : TypeFlags[ +TypeFlags.PropagatingFlags.value ];

TypeFlags = Object.create( tmp = templ(), TypeFlags );
tmp.asString = asString( TypeFlags );

/** *********************************************************************************************************************
 * @enum
 * @name ObjectFlags
 ************************************************************************************************************************/
let ObjectFlags = {};
ObjectFlags.Class = wrapped( 'Class', 1 << 0 );
ObjectFlags[ +ObjectFlags.Class.value ] = typeof ObjectFlags[ +ObjectFlags.Class.value ] !== 'number' ? named( 'Class' ) : ObjectFlags[ +ObjectFlags.Class.value ];
ObjectFlags.Interface = wrapped( 'Interface', 1 << 1 );
ObjectFlags[ +ObjectFlags.Interface.value ] = typeof ObjectFlags[ +ObjectFlags.Interface.value ] !== 'number' ? named( 'Interface' ) : ObjectFlags[ +ObjectFlags.Interface.value ];
ObjectFlags.Reference = wrapped( 'Reference', 1 << 2 );
ObjectFlags[ +ObjectFlags.Reference.value ] = typeof ObjectFlags[ +ObjectFlags.Reference.value ] !== 'number' ? named( 'Reference' ) : ObjectFlags[ +ObjectFlags.Reference.value ];
ObjectFlags.Tuple = wrapped( 'Tuple', 1 << 3 );
ObjectFlags[ +ObjectFlags.Tuple.value ] = typeof ObjectFlags[ +ObjectFlags.Tuple.value ] !== 'number' ? named( 'Tuple' ) : ObjectFlags[ +ObjectFlags.Tuple.value ];
ObjectFlags.Anonymous = wrapped( 'Anonymous', 1 << 4 );
ObjectFlags[ +ObjectFlags.Anonymous.value ] = typeof ObjectFlags[ +ObjectFlags.Anonymous.value ] !== 'number' ? named( 'Anonymous' ) : ObjectFlags[ +ObjectFlags.Anonymous.value ];
ObjectFlags.Mapped = wrapped( 'Mapped', 1 << 5 );
ObjectFlags[ +ObjectFlags.Mapped.value ] = typeof ObjectFlags[ +ObjectFlags.Mapped.value ] !== 'number' ? named( 'Mapped' ) : ObjectFlags[ +ObjectFlags.Mapped.value ];
ObjectFlags.Instantiated = wrapped( 'Instantiated', 1 << 6 );
ObjectFlags[ +ObjectFlags.Instantiated.value ] = typeof ObjectFlags[ +ObjectFlags.Instantiated.value ] !== 'number' ? named( 'Instantiated' ) : ObjectFlags[ +ObjectFlags.Instantiated.value ];
ObjectFlags.ObjectLiteral = wrapped( 'ObjectLiteral', 1 << 7 );
ObjectFlags[ +ObjectFlags.ObjectLiteral.value ] = typeof ObjectFlags[ +ObjectFlags.ObjectLiteral.value ] !== 'number' ? named( 'ObjectLiteral' ) : ObjectFlags[ +ObjectFlags.ObjectLiteral.value ];
ObjectFlags.EvolvingArray = wrapped( 'EvolvingArray', 1 << 8 );
ObjectFlags[ +ObjectFlags.EvolvingArray.value ] = typeof ObjectFlags[ +ObjectFlags.EvolvingArray.value ] !== 'number' ? named( 'EvolvingArray' ) : ObjectFlags[ +ObjectFlags.EvolvingArray.value ];
ObjectFlags.ObjectLiteralPatternWithComputedProperties = wrapped( 'ObjectLiteralPatternWithComputedProperties', 1 << 9 );
ObjectFlags[ +ObjectFlags.ObjectLiteralPatternWithComputedProperties.value ] = typeof ObjectFlags[ +ObjectFlags.ObjectLiteralPatternWithComputedProperties.value ] !== 'number'
                                                                               ? named( 'ObjectLiteralPatternWithComputedProperties' )
                                                                               : ObjectFlags[ +ObjectFlags.ObjectLiteralPatternWithComputedProperties.value ];
ObjectFlags.ContainsSpread = wrapped( 'ContainsSpread', 1 << 10 );
ObjectFlags[ +ObjectFlags.ContainsSpread.value ] = typeof ObjectFlags[ +ObjectFlags.ContainsSpread.value ] !== 'number' ? named( 'ContainsSpread' ) : ObjectFlags[ +ObjectFlags.ContainsSpread.value ];
ObjectFlags.ReverseMapped = wrapped( 'ReverseMapped', 1 << 11 );
ObjectFlags[ +ObjectFlags.ReverseMapped.value ] = typeof ObjectFlags[ +ObjectFlags.ReverseMapped.value ] !== 'number' ? named( 'ReverseMapped' ) : ObjectFlags[ +ObjectFlags.ReverseMapped.value ];
ObjectFlags.JsxAttributes = wrapped( 'JsxAttributes', 1 << 12 );
ObjectFlags[ +ObjectFlags.JsxAttributes.value ] = typeof ObjectFlags[ +ObjectFlags.JsxAttributes.value ] !== 'number' ? named( 'JsxAttributes' ) : ObjectFlags[ +ObjectFlags.JsxAttributes.value ];
ObjectFlags.MarkerType = wrapped( 'MarkerType', 1 << 13 );
ObjectFlags[ +ObjectFlags.MarkerType.value ] = typeof ObjectFlags[ +ObjectFlags.MarkerType.value ] !== 'number' ? named( 'MarkerType' ) : ObjectFlags[ +ObjectFlags.MarkerType.value ];
ObjectFlags.ClassOrInterface = wrapped( 'ClassOrInterface', ObjectFlags.Class | ObjectFlags.Interface );
ObjectFlags[ +ObjectFlags.ClassOrInterface.value ] = typeof ObjectFlags[ +ObjectFlags.ClassOrInterface.value ] !== 'number' ? named( 'ClassOrInterface' ) : ObjectFlags[ +ObjectFlags.ClassOrInterface.value ];

ObjectFlags = Object.create( tmp = templ(), ObjectFlags );
tmp.asString = asString( ObjectFlags );

/** *********************************************************************************************************************
 * Enums extracted from /mnt/e/code/typescript/src/compiler/checker.ts
 ************************************************************************************************************************/

/** *********************************************************************************************************************
 * @enum
 * @name TypeFacts
 ************************************************************************************************************************/
let TypeFacts = {};
TypeFacts.None = wrapped( 'None', 0 );
TypeFacts[ +TypeFacts.None.value ] = typeof TypeFacts[ +TypeFacts.None.value ] !== 'number' ? named( 'None' ) : TypeFacts[ +TypeFacts.None.value ];
TypeFacts.TypeofEQString = wrapped( 'TypeofEQString', 1 << 0 );
TypeFacts[ +TypeFacts.TypeofEQString.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQString.value ] !== 'number' ? named( 'TypeofEQString' ) : TypeFacts[ +TypeFacts.TypeofEQString.value ];
TypeFacts.TypeofEQNumber = wrapped( 'TypeofEQNumber', 1 << 1 );
TypeFacts[ +TypeFacts.TypeofEQNumber.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQNumber.value ] !== 'number' ? named( 'TypeofEQNumber' ) : TypeFacts[ +TypeFacts.TypeofEQNumber.value ];
TypeFacts.TypeofEQBoolean = wrapped( 'TypeofEQBoolean', 1 << 2 );
TypeFacts[ +TypeFacts.TypeofEQBoolean.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQBoolean.value ] !== 'number' ? named( 'TypeofEQBoolean' ) : TypeFacts[ +TypeFacts.TypeofEQBoolean.value ];
TypeFacts.TypeofEQSymbol = wrapped( 'TypeofEQSymbol', 1 << 3 );
TypeFacts[ +TypeFacts.TypeofEQSymbol.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQSymbol.value ] !== 'number' ? named( 'TypeofEQSymbol' ) : TypeFacts[ +TypeFacts.TypeofEQSymbol.value ];
TypeFacts.TypeofEQObject = wrapped( 'TypeofEQObject', 1 << 4 );
TypeFacts[ +TypeFacts.TypeofEQObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQObject.value ] !== 'number' ? named( 'TypeofEQObject' ) : TypeFacts[ +TypeFacts.TypeofEQObject.value ];
TypeFacts.TypeofEQFunction = wrapped( 'TypeofEQFunction', 1 << 5 );
TypeFacts[ +TypeFacts.TypeofEQFunction.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQFunction.value ] !== 'number' ? named( 'TypeofEQFunction' ) : TypeFacts[ +TypeFacts.TypeofEQFunction.value ];
TypeFacts.TypeofEQHostObject = wrapped( 'TypeofEQHostObject', 1 << 6 );
TypeFacts[ +TypeFacts.TypeofEQHostObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofEQHostObject.value ] !== 'number' ? named( 'TypeofEQHostObject' ) : TypeFacts[ +TypeFacts.TypeofEQHostObject.value ];
TypeFacts.TypeofNEString = wrapped( 'TypeofNEString', 1 << 7 );
TypeFacts[ +TypeFacts.TypeofNEString.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEString.value ] !== 'number' ? named( 'TypeofNEString' ) : TypeFacts[ +TypeFacts.TypeofNEString.value ];
TypeFacts.TypeofNENumber = wrapped( 'TypeofNENumber', 1 << 8 );
TypeFacts[ +TypeFacts.TypeofNENumber.value ] = typeof TypeFacts[ +TypeFacts.TypeofNENumber.value ] !== 'number' ? named( 'TypeofNENumber' ) : TypeFacts[ +TypeFacts.TypeofNENumber.value ];
TypeFacts.TypeofNEBoolean = wrapped( 'TypeofNEBoolean', 1 << 9 );
TypeFacts[ +TypeFacts.TypeofNEBoolean.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEBoolean.value ] !== 'number' ? named( 'TypeofNEBoolean' ) : TypeFacts[ +TypeFacts.TypeofNEBoolean.value ];
TypeFacts.TypeofNESymbol = wrapped( 'TypeofNESymbol', 1 << 10 );
TypeFacts[ +TypeFacts.TypeofNESymbol.value ] = typeof TypeFacts[ +TypeFacts.TypeofNESymbol.value ] !== 'number' ? named( 'TypeofNESymbol' ) : TypeFacts[ +TypeFacts.TypeofNESymbol.value ];
TypeFacts.TypeofNEObject = wrapped( 'TypeofNEObject', 1 << 11 );
TypeFacts[ +TypeFacts.TypeofNEObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEObject.value ] !== 'number' ? named( 'TypeofNEObject' ) : TypeFacts[ +TypeFacts.TypeofNEObject.value ];
TypeFacts.TypeofNEFunction = wrapped( 'TypeofNEFunction', 1 << 12 );
TypeFacts[ +TypeFacts.TypeofNEFunction.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEFunction.value ] !== 'number' ? named( 'TypeofNEFunction' ) : TypeFacts[ +TypeFacts.TypeofNEFunction.value ];
TypeFacts.TypeofNEHostObject = wrapped( 'TypeofNEHostObject', 1 << 13 );
TypeFacts[ +TypeFacts.TypeofNEHostObject.value ] = typeof TypeFacts[ +TypeFacts.TypeofNEHostObject.value ] !== 'number' ? named( 'TypeofNEHostObject' ) : TypeFacts[ +TypeFacts.TypeofNEHostObject.value ];
TypeFacts.EQUndefined = wrapped( 'EQUndefined', 1 << 14 );
TypeFacts[ +TypeFacts.EQUndefined.value ] = typeof TypeFacts[ +TypeFacts.EQUndefined.value ] !== 'number' ? named( 'EQUndefined' ) : TypeFacts[ +TypeFacts.EQUndefined.value ];
TypeFacts.EQNull = wrapped( 'EQNull', 1 << 15 );
TypeFacts[ +TypeFacts.EQNull.value ] = typeof TypeFacts[ +TypeFacts.EQNull.value ] !== 'number' ? named( 'EQNull' ) : TypeFacts[ +TypeFacts.EQNull.value ];
TypeFacts.EQUndefinedOrNull = wrapped( 'EQUndefinedOrNull', 1 << 16 );
TypeFacts[ +TypeFacts.EQUndefinedOrNull.value ] = typeof TypeFacts[ +TypeFacts.EQUndefinedOrNull.value ] !== 'number' ? named( 'EQUndefinedOrNull' ) : TypeFacts[ +TypeFacts.EQUndefinedOrNull.value ];
TypeFacts.NEUndefined = wrapped( 'NEUndefined', 1 << 17 );
TypeFacts[ +TypeFacts.NEUndefined.value ] = typeof TypeFacts[ +TypeFacts.NEUndefined.value ] !== 'number' ? named( 'NEUndefined' ) : TypeFacts[ +TypeFacts.NEUndefined.value ];
TypeFacts.NENull = wrapped( 'NENull', 1 << 18 );
TypeFacts[ +TypeFacts.NENull.value ] = typeof TypeFacts[ +TypeFacts.NENull.value ] !== 'number' ? named( 'NENull' ) : TypeFacts[ +TypeFacts.NENull.value ];
TypeFacts.NEUndefinedOrNull = wrapped( 'NEUndefinedOrNull', 1 << 19 );
TypeFacts[ +TypeFacts.NEUndefinedOrNull.value ] = typeof TypeFacts[ +TypeFacts.NEUndefinedOrNull.value ] !== 'number' ? named( 'NEUndefinedOrNull' ) : TypeFacts[ +TypeFacts.NEUndefinedOrNull.value ];
TypeFacts.Truthy = wrapped( 'Truthy', 1 << 20 );
TypeFacts[ +TypeFacts.Truthy.value ] = typeof TypeFacts[ +TypeFacts.Truthy.value ] !== 'number' ? named( 'Truthy' ) : TypeFacts[ +TypeFacts.Truthy.value ];
TypeFacts.Falsy = wrapped( 'Falsy', 1 << 21 );
TypeFacts[ +TypeFacts.Falsy.value ] = typeof TypeFacts[ +TypeFacts.Falsy.value ] !== 'number' ? named( 'Falsy' ) : TypeFacts[ +TypeFacts.Falsy.value ];
TypeFacts.All = wrapped( 'All', ( 1 << 22 ) - 1 );
TypeFacts[ +TypeFacts.All.value ] = typeof TypeFacts[ +TypeFacts.All.value ] !== 'number' ? named( 'All' ) : TypeFacts[ +TypeFacts.All.value ];
TypeFacts.BaseStringStrictFacts =
    wrapped( 'BaseStringStrictFacts', TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction |
                                      TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull );
TypeFacts[ +TypeFacts.BaseStringStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseStringStrictFacts.value ] !== 'number' ? named( 'BaseStringStrictFacts' ) : TypeFacts[ +TypeFacts.BaseStringStrictFacts.value ];
TypeFacts.BaseStringFacts = wrapped( 'BaseStringFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BaseStringFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseStringFacts.value ] !== 'number' ? named( 'BaseStringFacts' ) : TypeFacts[ +TypeFacts.BaseStringFacts.value ];
TypeFacts.StringStrictFacts = wrapped( 'StringStrictFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.Truthy | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.StringStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.StringStrictFacts.value ] !== 'number' ? named( 'StringStrictFacts' ) : TypeFacts[ +TypeFacts.StringStrictFacts.value ];
TypeFacts.StringFacts = wrapped( 'StringFacts', TypeFacts.BaseStringFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.StringFacts.value ] = typeof TypeFacts[ +TypeFacts.StringFacts.value ] !== 'number' ? named( 'StringFacts' ) : TypeFacts[ +TypeFacts.StringFacts.value ];
TypeFacts.EmptyStringStrictFacts = wrapped( 'EmptyStringStrictFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.EmptyStringStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.EmptyStringStrictFacts.value ] !== 'number' ? named( 'EmptyStringStrictFacts' ) : TypeFacts[ +TypeFacts.EmptyStringStrictFacts.value ];
TypeFacts.EmptyStringFacts = wrapped( 'EmptyStringFacts', +TypeFacts.BaseStringFacts );
TypeFacts[ +TypeFacts.EmptyStringFacts.value ] = typeof TypeFacts[ +TypeFacts.EmptyStringFacts.value ] !== 'number' ? named( 'EmptyStringFacts' ) : TypeFacts[ +TypeFacts.EmptyStringFacts.value ];
TypeFacts.NonEmptyStringStrictFacts = wrapped( 'NonEmptyStringStrictFacts', TypeFacts.BaseStringStrictFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonEmptyStringStrictFacts.value ] =
    typeof TypeFacts[ +TypeFacts.NonEmptyStringStrictFacts.value ] !== 'number' ? named( 'NonEmptyStringStrictFacts' ) : TypeFacts[ +TypeFacts.NonEmptyStringStrictFacts.value ];
TypeFacts.NonEmptyStringFacts = wrapped( 'NonEmptyStringFacts', TypeFacts.BaseStringFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonEmptyStringFacts.value ] = typeof TypeFacts[ +TypeFacts.NonEmptyStringFacts.value ] !== 'number' ? named( 'NonEmptyStringFacts' ) : TypeFacts[ +TypeFacts.NonEmptyStringFacts.value ];
TypeFacts.BaseNumberStrictFacts =
    wrapped( 'BaseNumberStrictFacts', TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction |
                                      TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull );
TypeFacts[ +TypeFacts.BaseNumberStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseNumberStrictFacts.value ] !== 'number' ? named( 'BaseNumberStrictFacts' ) : TypeFacts[ +TypeFacts.BaseNumberStrictFacts.value ];
TypeFacts.BaseNumberFacts = wrapped( 'BaseNumberFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BaseNumberFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseNumberFacts.value ] !== 'number' ? named( 'BaseNumberFacts' ) : TypeFacts[ +TypeFacts.BaseNumberFacts.value ];
TypeFacts.NumberStrictFacts = wrapped( 'NumberStrictFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.Truthy | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.NumberStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.NumberStrictFacts.value ] !== 'number' ? named( 'NumberStrictFacts' ) : TypeFacts[ +TypeFacts.NumberStrictFacts.value ];
TypeFacts.NumberFacts = wrapped( 'NumberFacts', TypeFacts.BaseNumberFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NumberFacts.value ] = typeof TypeFacts[ +TypeFacts.NumberFacts.value ] !== 'number' ? named( 'NumberFacts' ) : TypeFacts[ +TypeFacts.NumberFacts.value ];
TypeFacts.ZeroStrictFacts = wrapped( 'ZeroStrictFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.ZeroStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.ZeroStrictFacts.value ] !== 'number' ? named( 'ZeroStrictFacts' ) : TypeFacts[ +TypeFacts.ZeroStrictFacts.value ];
TypeFacts.ZeroFacts = wrapped( 'ZeroFacts', +TypeFacts.BaseNumberFacts );
TypeFacts[ +TypeFacts.ZeroFacts.value ] = typeof TypeFacts[ +TypeFacts.ZeroFacts.value ] !== 'number' ? named( 'ZeroFacts' ) : TypeFacts[ +TypeFacts.ZeroFacts.value ];
TypeFacts.NonZeroStrictFacts = wrapped( 'NonZeroStrictFacts', TypeFacts.BaseNumberStrictFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonZeroStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.NonZeroStrictFacts.value ] !== 'number' ? named( 'NonZeroStrictFacts' ) : TypeFacts[ +TypeFacts.NonZeroStrictFacts.value ];
TypeFacts.NonZeroFacts = wrapped( 'NonZeroFacts', TypeFacts.BaseNumberFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.NonZeroFacts.value ] = typeof TypeFacts[ +TypeFacts.NonZeroFacts.value ] !== 'number' ? named( 'NonZeroFacts' ) : TypeFacts[ +TypeFacts.NonZeroFacts.value ];
TypeFacts.BaseBooleanStrictFacts =
    wrapped( 'BaseBooleanStrictFacts', TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction |
                                       TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull );
TypeFacts[ +TypeFacts.BaseBooleanStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseBooleanStrictFacts.value ] !== 'number' ? named( 'BaseBooleanStrictFacts' ) : TypeFacts[ +TypeFacts.BaseBooleanStrictFacts.value ];
TypeFacts.BaseBooleanFacts = wrapped( 'BaseBooleanFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BaseBooleanFacts.value ] = typeof TypeFacts[ +TypeFacts.BaseBooleanFacts.value ] !== 'number' ? named( 'BaseBooleanFacts' ) : TypeFacts[ +TypeFacts.BaseBooleanFacts.value ];
TypeFacts.BooleanStrictFacts = wrapped( 'BooleanStrictFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.Truthy | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.BooleanStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.BooleanStrictFacts.value ] !== 'number' ? named( 'BooleanStrictFacts' ) : TypeFacts[ +TypeFacts.BooleanStrictFacts.value ];
TypeFacts.BooleanFacts = wrapped( 'BooleanFacts', TypeFacts.BaseBooleanFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.BooleanFacts.value ] = typeof TypeFacts[ +TypeFacts.BooleanFacts.value ] !== 'number' ? named( 'BooleanFacts' ) : TypeFacts[ +TypeFacts.BooleanFacts.value ];
TypeFacts.FalseStrictFacts = wrapped( 'FalseStrictFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.FalseStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.FalseStrictFacts.value ] !== 'number' ? named( 'FalseStrictFacts' ) : TypeFacts[ +TypeFacts.FalseStrictFacts.value ];
TypeFacts.FalseFacts = wrapped( 'FalseFacts', +TypeFacts.BaseBooleanFacts );
TypeFacts[ +TypeFacts.FalseFacts.value ] = typeof TypeFacts[ +TypeFacts.FalseFacts.value ] !== 'number' ? named( 'FalseFacts' ) : TypeFacts[ +TypeFacts.FalseFacts.value ];
TypeFacts.TrueStrictFacts = wrapped( 'TrueStrictFacts', TypeFacts.BaseBooleanStrictFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.TrueStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.TrueStrictFacts.value ] !== 'number' ? named( 'TrueStrictFacts' ) : TypeFacts[ +TypeFacts.TrueStrictFacts.value ];
TypeFacts.TrueFacts = wrapped( 'TrueFacts', TypeFacts.BaseBooleanFacts | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.TrueFacts.value ] = typeof TypeFacts[ +TypeFacts.TrueFacts.value ] !== 'number' ? named( 'TrueFacts' ) : TypeFacts[ +TypeFacts.TrueFacts.value ];
TypeFacts.SymbolStrictFacts =
    wrapped( 'SymbolStrictFacts', TypeFacts.TypeofEQSymbol | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction |
                                  TypeFacts.TypeofNEHostObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.SymbolStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.SymbolStrictFacts.value ] !== 'number' ? named( 'SymbolStrictFacts' ) : TypeFacts[ +TypeFacts.SymbolStrictFacts.value ];
TypeFacts.SymbolFacts = wrapped( 'SymbolFacts', TypeFacts.SymbolStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.SymbolFacts.value ] = typeof TypeFacts[ +TypeFacts.SymbolFacts.value ] !== 'number' ? named( 'SymbolFacts' ) : TypeFacts[ +TypeFacts.SymbolFacts.value ];
TypeFacts.ObjectStrictFacts =
    wrapped( 'ObjectStrictFacts', TypeFacts.TypeofEQObject | TypeFacts.TypeofEQHostObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol |
                                  TypeFacts.TypeofNEFunction | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.ObjectStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.ObjectStrictFacts.value ] !== 'number' ? named( 'ObjectStrictFacts' ) : TypeFacts[ +TypeFacts.ObjectStrictFacts.value ];
TypeFacts.ObjectFacts = wrapped( 'ObjectFacts', TypeFacts.ObjectStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.ObjectFacts.value ] = typeof TypeFacts[ +TypeFacts.ObjectFacts.value ] !== 'number' ? named( 'ObjectFacts' ) : TypeFacts[ +TypeFacts.ObjectFacts.value ];
TypeFacts.FunctionStrictFacts =
    wrapped( 'FunctionStrictFacts', TypeFacts.TypeofEQFunction | TypeFacts.TypeofEQHostObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol |
                                    TypeFacts.TypeofNEObject | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy );
TypeFacts[ +TypeFacts.FunctionStrictFacts.value ] = typeof TypeFacts[ +TypeFacts.FunctionStrictFacts.value ] !== 'number' ? named( 'FunctionStrictFacts' ) : TypeFacts[ +TypeFacts.FunctionStrictFacts.value ];
TypeFacts.FunctionFacts = wrapped( 'FunctionFacts', TypeFacts.FunctionStrictFacts | TypeFacts.EQUndefined | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.FunctionFacts.value ] = typeof TypeFacts[ +TypeFacts.FunctionFacts.value ] !== 'number' ? named( 'FunctionFacts' ) : TypeFacts[ +TypeFacts.FunctionFacts.value ];
TypeFacts.UndefinedFacts = wrapped( 'UndefinedFacts', TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction |
                                                      TypeFacts.TypeofNEHostObject | TypeFacts.EQUndefined | TypeFacts.EQUndefinedOrNull | TypeFacts.NENull | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.UndefinedFacts.value ] = typeof TypeFacts[ +TypeFacts.UndefinedFacts.value ] !== 'number' ? named( 'UndefinedFacts' ) : TypeFacts[ +TypeFacts.UndefinedFacts.value ];
TypeFacts.NullFacts = wrapped( 'NullFacts', TypeFacts.TypeofEQObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEFunction |
                                            TypeFacts.TypeofNEHostObject | TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.NEUndefined | TypeFacts.Falsy );
TypeFacts[ +TypeFacts.NullFacts.value ] = typeof TypeFacts[ +TypeFacts.NullFacts.value ] !== 'number' ? named( 'NullFacts' ) : TypeFacts[ +TypeFacts.NullFacts.value ];

TypeFacts = Object.create( tmp = templ(), TypeFacts );
tmp.asString = asString( TypeFacts );

/** *********************************************************************************************************************
 * @enum
 * @name Declaration
 ************************************************************************************************************************/
let Declaration = {};
Declaration.Getter = wrapped( 'Getter', 1 );
Declaration[ +Declaration.Getter.value ] = typeof Declaration[ +Declaration.Getter.value ] !== 'number' ? named( 'Getter' ) : Declaration[ +Declaration.Getter.value ];
Declaration.Setter = wrapped( 'Setter', 2 );
Declaration[ +Declaration.Setter.value ] = typeof Declaration[ +Declaration.Setter.value ] !== 'number' ? named( 'Setter' ) : Declaration[ +Declaration.Setter.value ];
Declaration.Method = wrapped( 'Method', 4 );
Declaration[ +Declaration.Method.value ] = typeof Declaration[ +Declaration.Method.value ] !== 'number' ? named( 'Method' ) : Declaration[ +Declaration.Method.value ];
Declaration.Property = wrapped( 'Property', Declaration.Getter | Declaration.Setter );
Declaration[ +Declaration.Property.value ] = typeof Declaration[ +Declaration.Property.value ] !== 'number' ? named( 'Property' ) : Declaration[ +Declaration.Property.value ];

Declaration = Object.create( tmp = templ(), Declaration );
tmp.asString = asString( Declaration );

/** *********************************************************************************************************************
 * @enum
 * @name ContainerFlags
 ************************************************************************************************************************/
let ContainerFlags = {};
ContainerFlags.None = wrapped( 'None', 0 );
ContainerFlags[ +ContainerFlags.None.value ] = typeof ContainerFlags[ +ContainerFlags.None.value ] !== 'number' ? named( 'None' ) : ContainerFlags[ +ContainerFlags.None.value ];
ContainerFlags.IsContainer = wrapped( 'IsContainer', 1 << 0 );
ContainerFlags[ +ContainerFlags.IsContainer.value ] = typeof ContainerFlags[ +ContainerFlags.IsContainer.value ] !== 'number' ? named( 'IsContainer' ) : ContainerFlags[ +ContainerFlags.IsContainer.value ];
ContainerFlags.IsBlockScopedContainer = wrapped( 'IsBlockScopedContainer', 1 << 1 );
ContainerFlags[ +ContainerFlags.IsBlockScopedContainer.value ] =
    typeof ContainerFlags[ +ContainerFlags.IsBlockScopedContainer.value ] !== 'number' ? named( 'IsBlockScopedContainer' ) : ContainerFlags[ +ContainerFlags.IsBlockScopedContainer.value ];
ContainerFlags.IsControlFlowContainer = wrapped( 'IsControlFlowContainer', 1 << 2 );
ContainerFlags[ +ContainerFlags.IsControlFlowContainer.value ] =
    typeof ContainerFlags[ +ContainerFlags.IsControlFlowContainer.value ] !== 'number' ? named( 'IsControlFlowContainer' ) : ContainerFlags[ +ContainerFlags.IsControlFlowContainer.value ];
ContainerFlags.IsFunctionLike = wrapped( 'IsFunctionLike', 1 << 3 );
ContainerFlags[ +ContainerFlags.IsFunctionLike.value ] = typeof ContainerFlags[ +ContainerFlags.IsFunctionLike.value ] !== 'number' ? named( 'IsFunctionLike' ) : ContainerFlags[ +ContainerFlags.IsFunctionLike.value ];
ContainerFlags.IsFunctionExpression = wrapped( 'IsFunctionExpression', 1 << 4 );
ContainerFlags[ +ContainerFlags.IsFunctionExpression.value ] =
    typeof ContainerFlags[ +ContainerFlags.IsFunctionExpression.value ] !== 'number' ? named( 'IsFunctionExpression' ) : ContainerFlags[ +ContainerFlags.IsFunctionExpression.value ];
ContainerFlags.HasLocals = wrapped( 'HasLocals', 1 << 5 );
ContainerFlags[ +ContainerFlags.HasLocals.value ] = typeof ContainerFlags[ +ContainerFlags.HasLocals.value ] !== 'number' ? named( 'HasLocals' ) : ContainerFlags[ +ContainerFlags.HasLocals.value ];
ContainerFlags.IsInterface = wrapped( 'IsInterface', 1 << 6 );
ContainerFlags[ +ContainerFlags.IsInterface.value ] = typeof ContainerFlags[ +ContainerFlags.IsInterface.value ] !== 'number' ? named( 'IsInterface' ) : ContainerFlags[ +ContainerFlags.IsInterface.value ];
ContainerFlags.IsObjectLiteralOrClassExpressionMethod = wrapped( 'IsObjectLiteralOrClassExpressionMethod', 1 << 7 );
ContainerFlags[ +ContainerFlags.IsObjectLiteralOrClassExpressionMethod.value ] = typeof ContainerFlags[ +ContainerFlags.IsObjectLiteralOrClassExpressionMethod.value ] !== 'number'
                                                                                 ? named( 'IsObjectLiteralOrClassExpressionMethod' )
                                                                                 : ContainerFlags[ +ContainerFlags.IsObjectLiteralOrClassExpressionMethod.value ];
ContainerFlags.IsInferenceContainer = wrapped( 'IsInferenceContainer', 1 << 8 );
ContainerFlags[ +ContainerFlags.IsInferenceContainer.value ] =
    typeof ContainerFlags[ +ContainerFlags.IsInferenceContainer.value ] !== 'number' ? named( 'IsInferenceContainer' ) : ContainerFlags[ +ContainerFlags.IsInferenceContainer.value ];

ContainerFlags = Object.create( tmp = templ(), ContainerFlags );
tmp.asString = asString( ContainerFlags );

module.exports = {
    NodeFlags,
    ModifierFlags,
    SymbolFlags,
    InternalSymbolName,
    TypeFlags,
    ObjectFlags,
    TypeFacts,
    Declaration,
    ContainerFlags
};
