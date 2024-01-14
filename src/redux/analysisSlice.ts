import { PayloadAction, createSlice } from '@reduxjs/toolkit';


// define an interface for the state of the OpviaAnalysis Slice
export type AggregateType = "maximum" | "minimum"
export interface Aggregate {
    type: AggregateType;
    columnIndex: number;
    value: string | number
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
        }
    ],
};

// create the redux slice
export const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        addAggregate: (state, {payload}: PayloadAction<Aggregate> ) => {
            state.aggregates.push(payload)
        }
    },
});

// export the slice's reducer
export default analysisSlice.reducer;
//export the slices actions for ease of use in components
export const analysisActions = analysisSlice.actions;
