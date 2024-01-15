import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// define an interface for the state of the OpviaAnalysis Slice
export type AggregateType = 'maximum' | 'minimum';
export interface Aggregate {
    type: AggregateType;
    columnIndex: number;
    value: string | number;
    aggregateId: string;
}
export interface OpviaAnalysisState {
    aggregates: Aggregate[];
}

// declare the initial state for the slice
const initialState: OpviaAnalysisState = {
    aggregates: [],
};

export interface AggregateColumnUpdate {
    key: 'columnIndex';
    value: number;
}

export interface AggregateTypeUpdate {
    key: 'type';
    value: AggregateType;
}

export type AggregateUpdate = AggregateColumnUpdate | AggregateTypeUpdate;

// create the redux slice
export const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        addAggregate: (
            state,
            { payload }: PayloadAction<Omit<Aggregate, 'aggregateId'>>,
        ) => {
            state.aggregates.push({
                ...payload,
                aggregateId: `agg_max_${state.aggregates.length}`,
            });
        },
        updateAggregate: (state, { payload }: PayloadAction<Aggregate>) => {
            return {
                ...state,
                aggregates: state.aggregates.map((agg) =>
                    agg.aggregateId === payload.aggregateId ? payload : agg,
                ),
            };
        },
    },
});

// export the slice's reducer
export default analysisSlice.reducer;
//export the slices actions for ease of use in components
export const analysisActions = analysisSlice.actions;
