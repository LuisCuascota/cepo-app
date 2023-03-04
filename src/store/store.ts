import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import entryReducer from "./slices/Entry/entry.slice";
import loanReducer from "./slices/Loan/loan.slice";
import personReducer from "./slices/Person/person.slice";

export const store = configureStore({
  reducer: {
    entry: entryReducer,
    loan: loanReducer,
    person: personReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
