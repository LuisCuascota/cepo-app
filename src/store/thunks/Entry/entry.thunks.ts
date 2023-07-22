import { createAsyncThunk } from "@reduxjs/toolkit";
import { Routes } from "../../../shared/api/routes";
import {
  EntryCount,
  EntryDetail,
  EntryOption,
  EntryPagination,
  EntryRow,
  NewEntryComplete,
} from "../../interfaces/Entry/entry.interfaces";
import axios from "../../../shared/api/axios-util";

export const getEntryOptionList = createAsyncThunk<EntryOption[], number>(
  "entry/option",
  async (account: number) => {
    const response = await axios.get(
      `${Routes.GET_ENTRY_OPTION_LIST}/${account}`
    );

    return response.data;
  }
);

export const getEntryCount = createAsyncThunk<EntryCount>(
  "entry/count",
  async () => {
    const response = await axios.get(Routes.GET_ENTRY_COUNT);

    return response.data;
  }
);

export const postNewEntry = createAsyncThunk<string, NewEntryComplete>(
  "entry/new",
  async (payload: NewEntryComplete) => {
    const response = await axios.post(Routes.ENTRY, payload);

    return response.data;
  }
);

export const getEntryRowsPaginated = createAsyncThunk<
  EntryRow[],
  EntryPagination
>("entry/rows", async (pagination: EntryPagination) => {
  const response = await axios.get(`${Routes.ENTRY}`, {
    params: pagination,
  });

  return response.data;
});

export const getEntryDetailByNumber = createAsyncThunk<EntryDetail[], number>(
  "entry/detail",
  async (number: number) => {
    const response = await axios.get(`${Routes.ENTRY_DETAIL}/${number}`);

    return response.data;
  }
);
