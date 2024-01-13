import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { dummyTableData } from '../data/dummyData';

// define the type for the data containing object that is passed to the table
export type TableData = { [key: string]: string | number };

// define an interface that represents a column to be rendered in the table
export interface OpviaTableColumn {
  columnName: string;
  columnType: string;
  columnId: string;
}

// define an interface for the state of the OpviaTable
export interface OpviaTableState {
  data: TableData;
  columns: OpviaTableColumn[];
}

// declare the initial state of the columns for the table
const defaultColumns = [
  { columnName: 'Time', columnType: 'time', columnId: 'time_col' },
  {
    columnName: 'Cell Density (Cell Count/Litre)',
    columnType: 'data',
    columnId: 'var_col_1',
  },
  {
    columnName: 'Volume (Litres)',
    columnType: 'data',
    columnId: 'var_col_2',
  },
];

// declare the initial state for the slice
const initialState = {
  data: dummyTableData,
  columns: defaultColumns,
};

// create the redux slice
export const opviaTableSlice = createSlice({
  name: 'opviaTable',
  initialState,
  reducers: {
    addFxColumn: (state, action: PayloadAction<OpviaTableColumn>) => {
      state.columns.push(action.payload);
    },
  },
});

// export the slice's reducer
export default opviaTableSlice.reducer;
//export the slices actions for ease of use in components
export const opviaTableActions = opviaTableSlice.actions;
