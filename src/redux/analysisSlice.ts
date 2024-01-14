import { PayloadAction, createSlice } from '@reduxjs/toolkit';


// define an interface for the state of the OpviaAnalysis Slice
export type AggregateType = "maximum" | "minimum"
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
    aggregates: [
        {
            type: "maximum",
            columnIndex: 1,
            value: 0,
            aggregateId: "agg_max_0"
        }
    ],
};

// create the redux slice
export const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        addAggregate: (state, {payload}: PayloadAction<Omit<Aggregate, "aggregateId">> ) => {
            state.aggregates.push({...payload, aggregateId: `agg_max_${state.aggregates.length}`})
        }
    },
});

// export the slice's reducer
export default analysisSlice.reducer;
//export the slices actions for ease of use in components
export const analysisActions = analysisSlice.actions;
