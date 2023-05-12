import { createAsyncThunk } from "@reduxjs/toolkit";
import { Routes } from "../../../shared/api/routes";
import axios from "../../../shared/api/axios-util";
import { LoanCount, LoanResponse } from "../../interfaces/Loan/loan.interfaces";

export const getLoanByAccount = createAsyncThunk<LoanResponse, number>(
  "loan/detail",
  async (account: number) => {
    const response = await axios.get(
      `${Routes.GET_LOAN_BY_ACCOUNT}/${account}`
    );

    return response.data;
  }
);

export const getLoanCount = createAsyncThunk<LoanCount>(
  "loan/count",
  async () => {
    const response = await axios.get(Routes.GET_LOAN_COUNT);

    return response.data;
  }
);

export const postNewLoan = createAsyncThunk<string, LoanResponse>(
  "loan/new",
  async (payload: LoanResponse) => {
    const response = await axios.post(`${Routes.POST_NEW_LOAN}`, payload);

    return response.data;
  }
);
