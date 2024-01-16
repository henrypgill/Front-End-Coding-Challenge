/* ============================ Data Types ============================ */

// define the type for the data containing object that is passed to the table
export type TableColumnData = { [key: string]: string };
export type TableData = {
    [key: string]: TableColumnData;
};

/* ============================ Column Types ============================ */

// define types and an interface that represents a column to be rendered in the table
export type ColumnType = 'time' | 'number' | 'string' | 'function';
export type ColumnFunctionOperator = '*' | '/' | '+' | '-';
export interface ColumnFunction {
    colIndex1: number;
    colIndex2: number;
    operator: ColumnFunctionOperator;
}

export interface OpviaTableColumn {
    columnName: string;
    columnType: ColumnType;
    columnId: string;
    columnFunction?: ColumnFunction;
    columnUnits: string;
    columnIndex: number;
}
