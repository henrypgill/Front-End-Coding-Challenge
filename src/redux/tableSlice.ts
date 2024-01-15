import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { dummyTableData } from '../data/dummyData';
import { mapData } from '../data/mapData';
import { calculateColumnData } from '../core/performCalculation';

// define the type for the data containing object that is passed to the table
export type TableColumn = { [key: string]: string };
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
        columnUnits: 'date and time',
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
            const newColumnIndex = state.columns.length;

            state.columns.push({
                columnName: 'Cell Count',
                columnType: 'function',
                columnId: `fx_col_${state.columns.length}`,
                columnIndex: newColumnIndex,
                columnUnits: 'Cell Count',
                columnFunction: {
                    colIndex1: 1,
                    colIndex2: 2,
                    operator: '/',
                },
            });
            state.data = {
                ...state.data,
                [newColumnIndex]: {
                    ...calculateColumnData(state.data[1], state.data[2], '/'),
                },
            };
        },
        updateColumnFunction: (
            state,
            {
                payload: { columnIndex, columnFunction },
            }: PayloadAction<{
                columnIndex: number;
                columnFunction: ColumnFunction;
            }>,
        ) => {
            const col = state.columns.find(
                (col) => col.columnIndex === columnIndex,
            );
            if (col) {
                col.columnFunction = columnFunction;
                state.data = {
                    ...state.data,
                    [columnIndex]: {
                        ...calculateColumnData(
                            state.data[columnFunction.colIndex1],
                            state.data[columnFunction.colIndex2],
                            columnFunction.operator,
                        ),
                    },
                };
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
