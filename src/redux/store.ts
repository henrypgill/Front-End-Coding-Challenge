import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import opviaTableReducer from './opviaTableSlice';

// export a type that represents the data structure of the store
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// declare and export the redux store
const store = configureStore({
    reducer: {
        opviaTable: opviaTableReducer,
    },
});
export default store;

//export the store's dispatch and selector functions for ease of use
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
