// Type definitions for escope 3.6
// Project: http://github.com/estools/escope
// Definitions by: Julian Jensen <https://github.com/julianjensen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace escope {
    export const version: string;

    interface Identifier {
        type: "Identifier",
        name: string
    }

    export const enum DefinitionType {
        CatchClause = 'CatchClause',
        Parameter = 'Parameter',
        FunctionName = 'FunctionName',
        ClassName = 'ClassName',
        Variable = 'Variable',
        ImportBinding = 'ImportBinding',
        TDZ = 'TDZ',
        ImplicitGlobalVariable = 'ImplicitGlobalVariable'
    }

    export interface Definition {
        new(name: string, scope: Scope): Definition;

        type: DefinitionType;
        name: Identifier;
        node: object;
        parent?: object;
        index?: number;
        kind?: string;
    }

    export interface ParameterDefinition extends Definition {
        new(name: string, node: object, index: number, rest: boolean): ParameterDefinition;

        rest: boolean;
    }

    export interface Variable {
        new(name: string, scope: Scope): Variable;

        name: string;
        identifiers: Identifier[];
        references: Reference[];
        defs: Definition[];
        tainted: boolean;
        stack: boolean;
        scope: Scope;
    }

    export function analyze(tree: object, providedOptions: object): ScopeManager;

    export interface Reference {
        new(ident: Identifier, scope: Scope, flag: number, writeExpr: object, maybeImplicitGlobal: boolean, partial: boolean, init: boolean): Reference;

        isRead(): boolean;

        isReadOnly(): boolean;

        isReadWrite(): boolean;

        isStatic(): boolean;

        isWrite(): boolean;

        isWriteOnly(): boolean;

        identifier: Identifier;
        from: Scope;
        tainted: boolean;
        resolved?: Variable | undefined;
        writeExpr?: object;
        partial?: boolean;
        init: boolean;
    }

    export const enum ScopeType {
        TDZ = 'TDZ',
        module = 'module',
        block = 'block',
        switch = 'switch',
        function = 'function',
        catch = 'catch',
        with = 'with',
        class = 'class',
        global = 'global'
    }

    export interface Scope {
        new(scopeManager: ScopeManager, type: ScopeType, upperScope: any, block: any, isMethodDefinition: any): Scope;

        isArgumentsMaterialized(): boolean;

        isStatic(): boolean;

        isThisMaterialized(): boolean;

        isUsedName(name: string): boolean;

        resolve(ident: { type: "Identifier", name: string }): any;

        isArgumentsMaterialized(): boolean;

        set: Map<string, Variable>;
        taints: Map<string, boolean>;
        dynamic: boolean;
        block: object;
        through: Reference[];
        variables: Variable[];
        references: Reference[];
        variableScope: Scope;
        functionExpressionScope: boolean;
        directCallToEvalScope: boolean;
        thisFound: boolean;
        upper: Scope;
        isStrict: boolean;
        childScopes: Scope[];
    }

    export interface GlobalScope extends Scope {
        new(scopeManager: ScopeManager, block: object): GlobalScope;
    }

    export interface ModuleScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): ModuleScope;
    }

    export interface FunctionExpressionNameScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): FunctionExpressionNameScope;
    }

    export interface CatchScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): CatchScope;
    }

    export interface WithScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): WithScope;
    }

    export interface TDZScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): TDZScope;
    }

    export interface BlockScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): BlockScope;
    }

    export interface SwitchScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): SwitchScope;
    }

    export interface FunctionScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object, isMethodDefinition: boolean): FunctionScope;

        isArgumentsMaterialized(): boolean;

        isThisMaterialized(): boolean;
    }

    export interface ForScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): ForScope;
    }

    export interface ClassScope extends Scope {
        new(scopeManager: ScopeManager, upperScope: Scope, block: object): ClassScope;
    }

    export interface ScopeManager {
        new(options: object): ScopeManager;

        acquire(node: object, inner?: boolean): Scope | undefined;

        acquireAll(node: object): any;

        attach(): void;

        detach(): void;

        getDeclaredVariables(node: object): Variable[];

        isImpliedStrict(): boolean;

        isModule(): boolean;

        isStrictModeSupported(): boolean;

        release(node: object, inner?: boolean): Scope | undefined;
    }

    export interface Referencer {
        new(options: object, scopeManager: ScopeManager): Referencer;

        currentScope(): Scope;

        close(): undefined;

        pushInnerMethodDefinition(isInnerMethodDefinition: boolean): boolean;

        popInnerMethodDefinition(isInnerMethodDefinition: boolean): undefined;

        materializeTDZScope(node: object, iterationNode: object): undefined;

        materializeIterationScope(node: object): undefined;

        referencingDefaultValue(pattern: object, assignments: object[], maybeImplicitGlobal: boolean, init: boolean): undefined;

        visitPattern(node: object, options: object, callback: (node: object) => void): undefined;

        visitFunction(node: object): undefined;

        visitClass(node: object): undefined;

        visitProperty(node: object): undefined;

        visitForIn(node: object): undefined;

        visitVariableDeclaration(variableTargetScope: Scope, type: DefinitionType, node: object, index: number, fromTDZ: boolean): undefined;

        AssignmentExpression(node: object): undefined;

        CatchClause(node: object): undefined;

        Program(node: object): undefined;

        Identifier(node: object): undefined;

        UpdateExpression(node: object): undefined;

        MemberExpression(node: object): undefined;

        Property(node: object): undefined;

        MethodDefinition(node: object): undefined;

        BreakStatement(): undefined;

        ContinueStatement(): undefined;

        LabeledStatement(node: object): undefined;

        ForStatement(node: object): undefined;

        ClassExpression(node: object): undefined;

        ClassDeclaration(node: object): undefined;

        CallExpression(node: object): undefined;

        BlockStatement(node: object): undefined;

        ThisExpression(): undefined;

        WithStatement(node: object): undefined;

        VariableDeclaration(node: object): undefined;

        SwitchStatement(node: object): undefined;

        FunctionDeclaration(node: object): undefined;

        FunctionExpression(node: object): undefined;

        ForOfStatement(node: object): undefined;

        ForInStatement(node: object): undefined;

        ArrowFunctionExpression(node: object): undefined;

        ImportDeclaration(node: object): undefined;

        visitExportDeclaration(node: object): undefined;

        ExportDeclaration(node: object): undefined;

        ExportNamedDeclaration(node: object): undefined;

        ExportSpecifier(node: object): undefined;

        MetaProperty(): undefined;
    }

    export class Variable {
        static CatchClause: string;
        static ClassName: string;
        static FunctionName: string;
        static ImplicitGlobalVariable: string;
        static ImportBinding: string;
        static Parameter: string;
        static TDZ: string;
        static Variable: string;
    }

    export class Reference {
        static READ: number;
        static RW: number;
        static WRITE: number;
    }

    export class ScopeManager implements ScopeManager {}

    export class Scope implements Scope {}
}
