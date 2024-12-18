import * as a from './syntax/ast';
import { nil } from './utils';
export interface IAstPartialMapper {
    statement?: (val: a.Statement) => a.Statement | nil;
    update?: (val: a.UpdateStatement) => a.Statement | nil;
    insert?: (val: a.InsertStatement) => a.Statement | nil;
    delete?: (val: a.DeleteStatement) => a.Statement | nil;
    comment?: (val: a.CommentStatement) => a.Statement | nil;
    do?: (val: a.DoStatement) => a.Statement | nil;
    createFunction?: (val: a.CreateFunctionStatement) => a.Statement | nil;
    dropFunction?: (val: a.DropFunctionStatement) => a.Statement | nil;
    raise?: (val: a.RaiseStatement) => a.Statement | nil;
    createSchema?: (val: a.CreateSchemaStatement) => a.Statement | nil;
    createEnum?(val: a.CreateEnumType): a.Statement | nil;
    createCompositeType?(val: a.CreateCompositeType): a.Statement | nil;
    drop?: (val: a.DropStatement) => a.Statement | nil;
    show?: (val: a.ShowStatement) => a.Statement | nil;
    createTable?: (val: a.CreateTableStatement) => a.Statement | nil;
    truncateTable?: (val: a.TruncateTableStatement) => a.Statement | nil;
    createExtension?: (val: a.CreateExtensionStatement) => a.Statement | nil;
    set?: (st: a.SetStatement) => a.SetStatement | nil;
    dataType?: (dataType: a.DataTypeDef) => a.DataTypeDef;
    prepare?: (st: a.PrepareStatement) => a.Statement | nil;
    deallocate?: (st: a.DeallocateStatement) => a.Statement | nil;
    parameter?: (st: a.ExprParameter) => a.Expr | nil;
    tableRef?: (st: a.QNameAliased) => a.QNameAliased | nil;
    transaction?: (val: a.CommitStatement | a.RollbackStatement | a.StartTransactionStatement) => a.Statement | nil;
    createIndex?: (val: a.CreateIndexStatement) => a.Statement | nil;
    alterTable?: (st: a.AlterTableStatement) => a.Statement | nil;
    alterIndex?: (st: a.AlterIndexStatement) => a.Statement | nil;
    tableAlteration?: (change: a.TableAlteration, table: a.QNameAliased) => a.TableAlteration | nil;
    dropColumn?: (change: a.TableAlterationDropColumn, table: a.QNameAliased) => a.TableAlteration | nil;
    dropConstraint?: (change: a.TableAlterationDropConstraint, table: a.QNameAliased) => a.TableAlteration | nil;
    renameConstraint?: (change: a.TableAlterationRenameConstraint, table: a.QNameAliased) => a.TableAlteration | nil;
    setTableOwner?: (change: a.TableAlterationOwner, table: a.QNameAliased) => a.TableAlteration | nil;
    renameColumn?: (change: a.TableAlterationRenameColumn, table: a.QNameAliased) => a.TableAlteration | nil;
    renameTable?: (change: a.TableAlterationRename, table: a.QNameAliased) => a.TableAlteration | nil;
    alterColumn?: (change: a.TableAlterationAlterColumn, inTable: a.QNameAliased) => a.TableAlteration | nil;
    setColumnType?: (alter: a.AlterColumnSetType, inTable: a.QName, inColumn: a.Name) => a.AlterColumn | nil;
    alterColumnSimple?: (alter: a.AlterColumnSimple, inTable: a.QName, inColumn: a.Name) => a.AlterColumn | nil;
    alterColumnAddGenerated?: (alter: a.AlterColumnAddGenerated, inTable: a.QName, inColumn: a.Name) => a.AlterColumn | nil;
    setColumnDefault?: (alter: a.AlterColumnSetDefault, inTable: a.QName, inColumn: a.Name) => a.AlterColumn | nil;
    addConstraint?: (change: a.TableAlterationAddConstraint, inTable: a.QName) => a.TableAlteration | nil;
    addColumn?: (change: a.TableAlterationAddColumn, inTable: a.QName) => a.TableAlteration | nil;
    createColumn?: (col: a.CreateColumnDef) => a.CreateColumnDef | nil;
    likeTable?: (col: a.CreateColumnsLikeTable) => a.CreateColumnDef | a.CreateColumnsLikeTable | nil;
    with?: (val: a.WithStatement) => a.SelectStatement | nil;
    withRecursive?: (val: a.WithRecursiveStatement) => a.SelectStatement | nil;
    union?: (val: a.SelectFromUnion) => a.SelectStatement | nil;
    select?: (val: a.SelectStatement) => a.SelectStatement | nil;
    selection?: (val: a.SelectFromStatement) => a.SelectStatement | nil;
    createView?: (val: a.CreateViewStatement) => a.Statement | nil;
    createMaterializedView?: (val: a.CreateMaterializedViewStatement) => a.Statement | nil;
    refreshMaterializedView?: (val: a.RefreshMaterializedViewStatement) => a.Statement | nil;
    from?: (from: a.From) => a.From | nil;
    fromCall?: (from: a.FromCall) => a.From | nil;
    fromStatement?: (from: a.FromStatement) => a.From | nil;
    values?: (from: a.ValuesStatement) => a.SelectStatement | nil;
    fromTable?: (from: a.FromTable) => a.From | nil;
    selectionColumn?: (val: a.SelectedColumn) => a.SelectedColumn | nil;
    expr?: (val: a.Expr) => a.Expr | nil;
    ternary?: (val: a.ExprTernary) => a.Expr | nil;
    arraySelect?: (val: a.ExprArrayFromSelect) => a.Expr | nil;
    arrayIndex?: (val: a.ExprArrayIndex) => a.Expr | nil;
    member?: (val: a.ExprMember) => a.Expr | nil;
    extract?: (st: a.ExprExtract) => a.Expr | nil;
    case?: (val: a.ExprCase) => a.Expr | nil;
    cast?: (val: a.ExprCast) => a.Expr | nil;
    call?: (val: a.ExprCall) => a.Expr | nil;
    callSubstring?: (val: a.ExprSubstring) => a.Expr | nil;
    callOverlay?: (val: a.ExprOverlay) => a.Expr | nil;
    array?: (val: a.ExprList) => a.Expr | nil;
    constant?: (value: a.ExprLiteral) => a.Expr | nil;
    default?: (value: a.ExprDefault) => a.Expr | nil;
    ref?: (val: a.ExprRef) => a.Expr | nil;
    unary?: (val: a.ExprUnary) => a.Expr | nil;
    binary?: (val: a.ExprBinary) => a.Expr | nil;
    join?(join: a.JoinClause): a.JoinClause | nil;
    constraint?: (constraint: a.ColumnConstraint) => a.ColumnConstraint | nil;
    valueKeyword?(val: a.ExprValueKeyword): a.Expr | nil;
    tablespace?(val: a.TablespaceStatement): a.Statement | nil;
    setGlobal?(val: a.SetGlobalStatement): a.Statement | nil;
    setTimezone?(val: a.SetTimezone): a.Statement | nil;
    createSequence?(seq: a.CreateSequenceStatement): a.Statement | nil;
    alterSequence?(seq: a.AlterSequenceStatement): a.Statement | nil;
    begin?(begin: a.BeginStatement): a.Statement | nil;
}
export type IAstFullMapper = {
    [key in keyof IAstPartialMapper]-?: IAstPartialMapper[key];
};
export type IAstMapper = IAstFullMapper & {
    /** Forces the next call to use the default implementation, not yours */
    super(): IAstMapper;
};
/**
 * Builds an AST modifier based on the default implementation, merged with the one you provide.
 *
 * Example of a modifier that renames all reference to columns 'foo' to 'bar'
 * ```ts
 *  const mapper = astMapper(b => ({
 *       ref: a => assignChanged(a, {
 *           name: a.name === 'foo'
 *               ? 'bar'
 *               : a.name
 *       })
 *   }));
 *
 * const modified = mapper.statement(myStatementToModify);
 * ```
 */
export declare function astMapper(modifierBuilder: MapperBuilder): IAstMapper;
export type MapperBuilder = (defaultImplem: IAstMapper) => IAstPartialMapper;
type PartialNil<T> = {
    [P in keyof T]?: T[P] | nil;
};
/**
 * An helper function that returns a copy of an object with modified properties
 * (similar to Object.assign()), but ONLY if thos properties have changed.
 * Will return the original object if not.
 */
export declare function assignChanged<T>(orig: T, assign: PartialNil<T>): T;
/**
 * An helper function that returns a map of an array, but:
 * - It will return the original array if it is null-ish
 * - It will remove all null-ish entries
 * - It will return the original array if nothing has changed
 */
export declare function arrayNilMap<T extends Object>(this: void, collection: T[] | nil, mapper: (v: T) => T | nil): T[] | nil;
/**
 * Can be used to modify an AST.
 *
 * You will have to override functions that you're interested in to use this class.
 *
 * Example: Will remove all references in
 */
export declare class AstDefaultMapper implements IAstMapper {
    wrapped?: IAstPartialMapper;
    skipNext?: boolean;
    super(): SkipModifier;
    statement(val: a.Statement): a.Statement | nil;
    comment(val: a.CommentStatement): a.Statement | nil;
    createView(val: a.CreateViewStatement): a.Statement | nil;
    createMaterializedView(val: a.CreateMaterializedViewStatement): a.Statement | nil;
    refreshMaterializedView(val: a.RefreshMaterializedViewStatement): a.Statement | nil;
    do(val: a.DoStatement): a.Statement | nil;
    createFunction(val: a.CreateFunctionStatement): a.Statement | nil;
    dropFunction(val: a.DropFunctionStatement): a.Statement | nil;
    show(val: a.ShowStatement): a.Statement | nil;
    createEnum(val: a.CreateEnumType): a.Statement | nil;
    createCompositeType(val: a.CreateCompositeType): a.Statement | nil;
    drop(val: a.DropStatement): a.Statement | nil;
    alterSequence(seq: a.AlterSequenceStatement): a.Statement | nil;
    begin(begin: a.BeginStatement): a.Statement | nil;
    createSequence(seq: a.CreateSequenceStatement): a.Statement | nil;
    tablespace(val: a.TablespaceStatement): a.Statement | nil;
    setGlobal(val: a.SetGlobalStatement): a.Statement | nil;
    setTimezone(val: a.SetTimezone): a.Statement | nil;
    update(val: a.UpdateStatement): a.Statement | nil;
    insert(val: a.InsertStatement): a.Statement | nil;
    raise(val: a.RaiseStatement): a.Statement | nil;
    delete(val: a.DeleteStatement): a.Statement | nil;
    createSchema(val: a.CreateSchemaStatement): a.Statement | nil;
    createTable(val: a.CreateTableStatement): a.Statement | nil;
    likeTable(col: a.CreateColumnsLikeTable): a.CreateColumnDef | a.CreateColumnsLikeTable | nil;
    truncateTable(val: a.TruncateTableStatement): a.Statement | nil;
    constraint(c: a.ColumnConstraint): a.ColumnConstraint | nil;
    set(st: a.SetStatement): a.SetStatement | nil;
    /** Called when a data type definition is encountered */
    dataType(dataType: a.DataTypeDef): a.DataTypeDef;
    /** Called when an alias of a table is created */
    tableRef(st: a.QNameAliased): a.QNameAliased | nil;
    transaction(val: a.CommitStatement | a.RollbackStatement | a.StartTransactionStatement): a.Statement | nil;
    createExtension(val: a.CreateExtensionStatement): a.Statement | nil;
    createIndex(val: a.CreateIndexStatement): a.Statement | nil;
    prepare(st: a.PrepareStatement): a.Statement | nil;
    deallocate(st: a.DeallocateStatement): a.Statement | nil;
    alterIndex(st: a.AlterIndexStatement): a.Statement | nil;
    alterTable(st: a.AlterTableStatement): a.Statement | nil;
    tableAlteration(change: a.TableAlteration, table: a.QNameAliased): a.TableAlteration | nil;
    dropColumn(change: a.TableAlterationDropColumn, table: a.QNameAliased): a.TableAlteration | nil;
    dropConstraint(change: a.TableAlterationDropConstraint, table: a.QNameAliased): a.TableAlteration | nil;
    setTableOwner(change: a.TableAlterationOwner, table: a.QNameAliased): a.TableAlteration | nil;
    renameConstraint(change: a.TableAlterationRenameConstraint, table: a.QNameAliased): a.TableAlteration | nil;
    renameColumn(change: a.TableAlterationRenameColumn, table: a.QNameAliased): a.TableAlteration | nil;
    renameTable(change: a.TableAlterationRename, table: a.QNameAliased): a.TableAlteration | nil;
    alterColumn(change: a.TableAlterationAlterColumn, inTable: a.QNameAliased): a.TableAlteration | nil;
    setColumnType(alter: a.AlterColumnSetType, inTable: a.QName, inColumn: a.Name): a.AlterColumn | nil;
    alterColumnAddGenerated(alter: a.AlterColumnAddGenerated, inTable: a.QName, inColumn: a.Name): a.AlterColumn | nil;
    alterColumnSimple(alter: a.AlterColumnSimple, inTable: a.QName, inColumn: a.Name): a.AlterColumn | nil;
    setColumnDefault(alter: a.AlterColumnSetDefault, inTable: a.QName, inColumn: a.Name): a.AlterColumn | nil;
    addConstraint(change: a.TableAlterationAddConstraint, inTable: a.QName): a.TableAlteration | nil;
    addColumn(change: a.TableAlterationAddColumn, inTable: a.QName): a.TableAlteration | nil;
    createColumn(col: a.CreateColumnDef): a.CreateColumnDef | nil;
    select(val: a.SelectStatement): a.SelectStatement | nil;
    selection(val: a.SelectFromStatement): a.SelectStatement | nil;
    orderBy(orderBy: a.OrderByStatement[] | null | undefined): nil | a.OrderByStatement[];
    union(val: a.SelectFromUnion): a.SelectStatement | nil;
    with(val: a.WithStatement): a.SelectStatement | nil;
    withRecursive(val: a.WithRecursiveStatement): a.SelectStatement | nil;
    from(from: a.From): a.From | nil;
    fromCall(from: a.FromCall): a.From | nil;
    fromStatement(from: a.FromStatement): a.From | nil;
    values(from: a.ValuesStatement): a.SelectStatement | nil;
    join(join: a.JoinClause): a.JoinClause | nil;
    fromTable(from: a.FromTable): a.From | nil;
    selectionColumn(val: a.SelectedColumn): a.SelectedColumn | nil;
    expr(val: a.Expr | nil): a.Expr | nil;
    arraySelect(val: a.ExprArrayFromSelect): a.ExprArrayFromSelect | null;
    extract(st: a.ExprExtract): a.Expr | nil;
    valueKeyword(val: a.ExprValueKeyword): a.Expr | nil;
    ternary(val: a.ExprTernary): a.Expr | nil;
    parameter(st: a.ExprParameter): a.Expr | nil;
    arrayIndex(val: a.ExprArrayIndex): a.Expr | nil;
    member(val: a.ExprMember): a.Expr | nil;
    case(val: a.ExprCase): a.Expr | nil;
    cast(val: a.ExprCast): a.Expr | nil;
    call(val: a.ExprCall): a.Expr | nil;
    callSubstring(val: a.ExprSubstring): a.Expr | nil;
    callOverlay(val: a.ExprOverlay): a.Expr | nil;
    array(val: a.ExprList): a.Expr | nil;
    constant(value: a.ExprLiteral): a.Expr | nil;
    default(value: a.ExprDefault): a.Expr | nil;
    /** Called when a reference is used */
    ref(val: a.ExprRef): a.Expr | nil;
    unary(val: a.ExprUnary): a.Expr | nil;
    binary(val: a.ExprBinary): a.Expr | nil;
}
declare class SkipModifier extends AstDefaultMapper {
    readonly parent: AstDefaultMapper;
    constructor(parent: AstDefaultMapper);
}
export {};
//# sourceMappingURL=ast-mapper.d.ts.map