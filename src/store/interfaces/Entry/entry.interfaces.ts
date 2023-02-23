import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";

export interface EntryOption {
  id: number;
  description: string;
  value: number;
}

export interface EntryCount {
  count: number;
}

export interface NewEntry {
  number: number;
  account_number: number;
  amount: number;
  date: string;
  place: string;
  is_transfer: boolean;
}

export interface NewEntryDetail {
  entry_number: number;
  type_id: number;
  value: number;
}

export interface EntryState {
  options: EntryOption[];
  getOptionsStatus: FetchStateEnum;
  count: number;
  getEntryCountStatus: FetchStateEnum;
  newEntry: NewEntry;
  postNewEntryStatus: FetchStateEnum;
  postNewEntryDetailsStatus: FetchStateEnum;
}
