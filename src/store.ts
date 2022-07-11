import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { api } from "./Services";
import productsSlice from "./Services/Products/slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  productsSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
