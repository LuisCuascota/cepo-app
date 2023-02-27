import { createAsyncThunk } from "@reduxjs/toolkit";
import { Routes } from "../../../shared/api/routes";
import {
  EntryCount,
  EntryOption,
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
    const response = await axios.post(Routes.POST_NEW_ENTRY, payload);

    return response.data;
  }
);
