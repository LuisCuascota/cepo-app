import { entrySlice } from "../../slices/Entry/entry.slice";

export const {
  setNewEntryAccount,
  setNewEntryAmount,
  setNewEntryDate,
  setNewEntryIsTransfer,
  setNewEntryNumber,
  setOptionsValue,
  setDisableSave,
  setDisableSearch,
} = entrySlice.actions;
