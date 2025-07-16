import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./slices/matchesSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
