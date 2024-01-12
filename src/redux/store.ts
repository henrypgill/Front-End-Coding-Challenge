import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import opviaTableReducer from "./opviaTableSlice"


export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


const store = configureStore({
  reducer: {
    opviaTable: opviaTableReducer,
  },
});

export default store

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
