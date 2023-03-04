import { createSlice } from "@reduxjs/toolkit";
import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";
import { FeeLoanToPay, LoanState } from "../../interfaces/Loan/loan.interfaces";
import { getLoanByAccount } from "../../thunks/Loan/loan.thunks";

export const initialState: LoanState = {
  feeLoanToPay: [],
  getLoanStatus: FetchStateEnum.PENDING,
  loanData: undefined,
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
