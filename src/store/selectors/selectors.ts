import { RootState } from "../store";

export const selectLoan = (state: RootState) => state.loan;

export const selectEntry = (state: RootState) => state.entry;

export const selectPerson = (state: RootState) => state.person;
