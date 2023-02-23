import { createAsyncThunk } from "@reduxjs/toolkit";
import { Routes } from "../../../shared/api/routes";
import {
  EntryCount,
  EntryOption,
  NewEntry,
  NewEntryDetail,
} from "../../interfaces/Entry/entry.interfaces";
import axios from "../../../shared/api/axios-util";

export const getEntryOptionList = createAsyncThunk<EntryOption[]>(
  "entry/option",
  async () => {
    const response = await axios.get(Routes.GET_ENTRY_OPTION_LIST);

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

export const postNewEntry = createAsyncThunk<string, NewEntry>(
  "entry/new",
  async (payload: NewEntry) => {
    const response = await axios.post(Routes.POST_NEW_ENTRY, payload);

    return response.data;
  }
);

export const postNewEntryDetails = createAsyncThunk<string, NewEntryDetail[]>(
  "entry/detail",
  async (payload: NewEntryDetail[]) => {
    const response = await axios.post(Routes.POST_NEW_ENTRY_DETAIL, payload);

    return response.data;
  }
);
