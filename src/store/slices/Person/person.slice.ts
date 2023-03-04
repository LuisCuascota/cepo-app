import { createSlice } from "@reduxjs/toolkit";
import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";
import { PersonState } from "../../interfaces/Person/person.interfaces";
import { getPersonList } from "../../thunks/Person/person.thunks";

export const initialState: PersonState = {
  getPersonsStatus: FetchStateEnum.PENDING,
  persons: [],
};

export const personSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getPersonList.pending, (state: PersonState) => {
      state.getPersonsStatus = FetchStateEnum.PENDING;
    });
    builder.addCase(getPersonList.fulfilled, (state, { payload }) => {
      state.getPersonsStatus = FetchStateEnum.SUCCESS;
      state.persons = payload;
    });
    builder.addCase(getPersonList.rejected, (state) => {
      state.getPersonsStatus = FetchStateEnum.FAILED;
    });
  },
  initialState,
  name: "person",
  reducers: {},
});

export default personSlice.reducer;
