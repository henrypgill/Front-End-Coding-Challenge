import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { dummyTableData } from '../data/dummyData';
import { mapData } from '../data/mapData';
import { calculateColumnData } from '../core/performCalculation';
import {
    ColumnFunction,
    OpviaTableColumn,
    TableData,
} from '../types/tableTypes';
import { Aggregate } from '../types/analysisTypes';
import getInitialTableState from './initialStates';
import getAggregateValue from '../core/getAggregateValue';

export interface Analysis {
    aggregates: Aggregate[];
}

// define an interface for the state of the OpviaTable
export interface OpviaTableState {
    data: TableData;
    columns: OpviaTableColumn[];
    analysis: Analysis;
}

// create the redux slice
export const tableSlice = createSlice({
    name: 'table',
    initialState: getInitialTableState(),
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
                const columnData = calculateColumnData(
                    state.data[payload.columnFunction.colIndex1],
                    state.data[payload.columnFunction.colIndex2],
                    payload.columnFunction.operator,
                );
                col.columnFunction = payload.columnFunction;
                state.data = {
                    ...state.data,
                    [payload.columnIndex]: columnData,
                };
                const columnAggregates = state.analysis.aggregates.filter(
                    (agg) => agg.columnIndex === payload.columnIndex,
                );
                if (columnAggregates.length > 0) {
                    state.analysis.aggregates = state.analysis.aggregates.map(
                        (agg) => {
                            if (agg.columnIndex === payload.columnIndex) {
                                return {
                                    ...agg,
                                    value: getAggregateValue(
                                        columnData,
                                        agg.type,
                                    ),
                                };
                            } else {
                                return agg;
                            }
                        },
                    );
                }
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
        addAggregate: (
            state,
            { payload }: PayloadAction<Omit<Aggregate, 'aggregateId'>>,
        ) => {
            state.analysis.aggregates.push({
                ...payload,
                aggregateId: `agg_${payload.type}_${state.analysis.aggregates.length}`,
            });
        },
        updateAggregate: (state, { payload }: PayloadAction<Aggregate>) => {
            state.analysis.aggregates = state.analysis.aggregates.map((agg) =>
                agg.aggregateId === payload.aggregateId ? payload : agg,
            );
        },
    },
});

// export the slice's reducer
export default tableSlice.reducer;
//export the slices actions for ease of use in components
export const tableActions = tableSlice.actions;
