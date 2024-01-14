import { PayloadAction, createSlice } from '@reduxjs/toolkit';


// define an interface for the state of the OpviaAnalysis Slice
type AggregateType = "maximum" | "minimum"
interface Aggregate {
    type: AggregateType;
    columnIndex: number;
    value: string | number
}
export interface OpviaAnalysisState {
    aggregates: Aggregate[];
}


// declare the initial state for the slice
const initialState: OpviaAnalysisState = {
    aggregates: [],
};

// create the redux slice
export const opviaAnalysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        addAggregate: (state, {payload}: PayloadAction<Aggregate> ) => {
            state.aggregates.push(payload)
        }
    },
});

// export the slice's reducer
export default opviaAnalysisSlice.reducer;
//export the slices actions for ease of use in components
export const opviaAnalysisActions = opviaAnalysisSlice.actions;
