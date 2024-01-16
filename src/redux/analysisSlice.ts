import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Aggregate } from '../types/tableTypes';


export interface OpviaAnalysisState {
    aggregates: Aggregate[];
}

// declare the initial state for the slice
const initialState: OpviaAnalysisState = {
    aggregates: [
        {
            type: 'maximum',
            columnIndex: 1,
            value: 5297,
            aggregateId: 'agg_maximum_1',
        },
        {
            type: 'minimum',
            columnIndex: 1,
            value: 3,
            aggregateId: 'agg_minimum_2',
        },
        {
            type: 'minimum',
            columnIndex: 2,
            value: 24,
            aggregateId: 'agg_minimum_3',
        },
    ],
};

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
                aggregateId: `agg_${payload.type}_${state.aggregates.length}`,
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
