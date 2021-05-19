import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userReducer } from "../users/reducer";

/**
 * Added a combineReducer here in case we ever need to
 * add to the reducers.
 */
const rootReducer = combineReducers({
  userReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
