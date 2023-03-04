import { createAsyncThunk } from "@reduxjs/toolkit";
import { Routes } from "../../../shared/api/routes";
import axios from "../../../shared/api/axios-util";
import { PersonData } from "../../interfaces/Person/person.interfaces";

export const getPersonList = createAsyncThunk<PersonData[]>(
  "person/list",
  async () => {
    const response = await axios.get(Routes.GET_PERSON_LIST);

    return response.data;
  }
);
