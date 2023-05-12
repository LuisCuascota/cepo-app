import { createSlice } from "@reduxjs/toolkit";
import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";
import { FeeLoanToPay, LoanState } from "../../interfaces/Loan/loan.interfaces";
import {
  getLoanByAccount,
  getLoanCount,
  postNewLoan,
} from "../../thunks/Loan/loan.thunks";

export const initialState: LoanState = {
  count: 0,
  feeLoanToPay: [],
  getLoanCountStatus: FetchStateEnum.PENDING,
  getLoanStatus: FetchStateEnum.PENDING,
  loanData: undefined,
  postNewLoanStatus: FetchStateEnum.PENDING,
};

export const loanSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getLoanByAccount.pending, (state: LoanState) => {
      state.getLoanStatus = FetchStateEnum.PENDING;
    });
    builder.addCase(getLoanByAccount.fulfilled, (state, { payload }) => {
      state.getLoanStatus = FetchStateEnum.SUCCESS;
      state.loanData = payload;
    });
    builder.addCase(getLoanByAccount.rejected, (state) => {
      state.getLoanStatus = FetchStateEnum.FAILED;
    });
    builder.addCase(getLoanCount.pending, (state: LoanState) => {
      state.getLoanCountStatus = FetchStateEnum.PENDING;
    });
    builder.addCase(getLoanCount.fulfilled, (state, { payload }) => {
      state.getLoanCountStatus = FetchStateEnum.SUCCESS;
      state.count = payload.count;
    });
    builder.addCase(getLoanCount.rejected, (state) => {
      state.getLoanCountStatus = FetchStateEnum.FAILED;
    });
    builder.addCase(postNewLoan.pending, (state: LoanState) => {
      state.postNewLoanStatus = FetchStateEnum.PENDING;
    });
    builder.addCase(postNewLoan.fulfilled, (state) => {
      state.postNewLoanStatus = FetchStateEnum.SUCCESS;
    });
    builder.addCase(postNewLoan.rejected, (state) => {
      state.postNewLoanStatus = FetchStateEnum.FAILED;
    });
  },
  initialState,
  name: "loan",
  reducers: {
    setFeeLoanToPay(state, action: { payload: FeeLoanToPay[] }) {
      state.feeLoanToPay = action.payload;
    },
  },
});

export default loanSlice.reducer;
