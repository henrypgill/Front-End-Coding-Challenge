import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { dummyTableData } from '../data/dummyData';
import { mapData } from '../data/mapData';

// define the type for the data containing object that is passed to the table
export type TableNumberColumn = { [key: string]: number };
export type TableStringColumn = { [key: string]: string };
export type TableColumn = TableNumberColumn | TableStringColumn;
export type TableData = {
    [key: string]: TableColumn;
};

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

// define an interface for the state of the OpviaTable
export interface OpviaTableState {
    data: TableData;
    columns: OpviaTableColumn[];
}

// declare the initial state of the columns for the table
const defaultColumns: OpviaTableColumn[] = [
    {
        columnName: 'Time',
        columnType: 'time',
        columnId: 'time_col',
        columnIndex: 0,
        columnUnits: 'seconds',
    },
    {
        columnName: 'Cell Density',
        columnType: 'number',
        columnId: 'var_col_1',
        columnIndex: 1,
        columnUnits: 'Cell Count/Litre',
    },
    {
        columnName: 'Volume',
        columnType: 'number',
        columnId: 'var_col_2',
        columnIndex: 2,
        columnUnits: 'Litres',
    },
    {
        columnName: 'Column Name',
        columnType: 'function',
        columnId: `fx_col_3`,
        columnIndex: 3,
        columnUnits: 'units',
        columnFunction: {
            colIndex1: 1,
            colIndex2: 2,
            operator: '*',
        },
    },
];

// declare the initial state for the slice
const initialState: OpviaTableState = {
    data: mapData(dummyTableData),
    columns: defaultColumns,
};

// create the redux slice
export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        addFxColumn: (state) => {
            state.columns.push({
                columnName: 'Column Name',
                columnType: 'function',
                columnId: `fx_col_${state.columns.length}`,
                columnIndex: state.columns.length,
                columnUnits: 'units',
                columnFunction: {
                    colIndex1: 1,
                    colIndex2: 2,
                    operator: '/',
                },
            });
        },
        updateColumnFunction: (
            state,
            {
                payload,
            }: PayloadAction<{
                columnIndex: number;
                columnFunction: ColumnFunction;
            }>,
        ) => {
            const col = state.columns.find(
                (col) => col.columnIndex === payload.columnIndex,
            );
            if (col) {
                col.columnFunction = payload.columnFunction;
            }
        },
        updateColumnNameAndUnits: (
            state,
            {
                payload,
            }: PayloadAction<
                Pick<OpviaTableColumn, 'columnName' | 'columnUnits'> & {
                    columnIndex: number;
                }
            >,
        ) => {
            const col = state.columns.find(
                (col) => col.columnIndex === payload.columnIndex,
            );
            if (col) {
                col.columnName = payload.columnName;
                col.columnUnits = payload.columnUnits;
            }
        },
    },
});

// export the slice's reducer
export default tableSlice.reducer;
//export the slices actions for ease of use in components
export const tableActions = tableSlice.actions;
