import { Expr, SelectStatement, CreateTableStatement, CreateIndexStatement, Statement, InsertStatement, UpdateStatement, AlterTableStatement, DeleteStatement, CreateExtensionStatement, CreateSequenceStatement, AlterSequenceStatement, SelectedColumn, Interval, BinaryOperator, ExprBinary, Name, ExprInteger, FromTable, QName, AlterIndexStatement } from './ast';
export declare function checkSelect(value: string | string[], expected: SelectStatement): void;
export declare function checkCreateSequence(value: string | string[], expected: CreateSequenceStatement): void;
export declare function checkCreateTable(value: string | string[], expected: CreateTableStatement): void;
export declare function checkCreateTableLoc(value: string | string[], expected: CreateTableStatement): void;
export declare function checkCreateIndex(value: string | string[], expected: CreateIndexStatement): void;
export declare function checkCreateIndexLoc(value: string | string[], expected: CreateIndexStatement): void;
export declare function checkAlterSequence(value: string | string[], expected: AlterSequenceStatement): void;
export declare function checkCreateExtension(value: string | string[], expected: CreateExtensionStatement): void;
export declare function checkInsert(value: string | string[], expected: InsertStatement): void;
export declare function checkInsertLoc(value: string | string[], expected: InsertStatement): void;
export declare function checkDelete(value: string | string[], expected: DeleteStatement): void;
export declare function checkAlterTable(value: string | string[], expected: AlterTableStatement): void;
export declare function checkAlterIndex(value: string | string[], expected: AlterIndexStatement): void;
export declare function checkAlterTableLoc(value: string | string[], expected: AlterTableStatement): void;
export declare function checkUpdate(value: string | string[], expected: UpdateStatement): void;
export declare function checkStatement(value: string | string[], expected: Statement): void;
export declare function checkInvalid(sql: string, start?: string): void;
export declare function checkValid(sql: string, start?: string): void;
export declare function checkInvalidExpr(sql: string): void;
export declare function checkTreeExpr(value: string | string[], expected: Expr): void;
export declare function checkTreeExprLoc(value: string | string[], expected: Expr): void;
export declare function columns(...vals: (Expr | string)[]): SelectedColumn[];
export declare function checkInterval(input: string | string[], expected: Interval): void;
export declare const star: Expr;
export declare const starCol: SelectedColumn;
export declare function col(name: string, alias?: string): SelectedColumn;
export declare function ref(name: string): Expr;
export declare function binary(left: Expr, op: BinaryOperator, right: Expr): ExprBinary;
export declare function name(name: string): Name;
export declare function qname(name: string, schema?: string): QName;
export declare function int(value: number): ExprInteger;
export declare function tbl(nm: string): FromTable;
//# sourceMappingURL=spec-utils.d.ts.map