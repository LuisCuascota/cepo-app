import { createAsyncThunk } from "@reduxjs/toolkit";
import { Routes } from "../../../shared/api/routes";
import axios from "../../../shared/api/axios-util";
import { LoanResponse } from "../../interfaces/Loan/loan.interfaces";

export const getLoanByAccount = createAsyncThunk<LoanResponse, number>(
  "loan/detail",
  async (account: number) => {
    const response = await axios.get(
      `${Routes.GET_LOAN_BY_ACCOUNT}/${account}`
    );

    return response.data;
  }
);
