import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";
import { LoanToPay } from "../Loan/loan.interfaces";

export interface EntryOption {
  id: number;
  description: string;
  value: number;
  showDetails: boolean;
}

export interface EntryRow {
  number: number;
  names: string;
  surnames: string;
  date: string;
  amount: number;
  is_transfer: boolean;
  place: string;
  account_number: number;
}

export interface EntryPagination {
  limit: number;
  offset: number;
  account?: number;
}

export interface EntryDetail {
  description: string;
  value?: number;
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

export interface NewEntryComplete {
  header: NewEntry;
  detail: NewEntryDetail[];
  loanToPay?: LoanToPay;
}

export interface EntryState {
  options: EntryOption[];
  getOptionsStatus: FetchStateEnum;
  count: number;
  getEntryCountStatus: FetchStateEnum;
  newEntry: NewEntry;
  postNewEntryStatus: FetchStateEnum;
  disableSave: boolean;
  disableSearch: boolean;
  getEntryRowsStatus: FetchStateEnum;
  entryRows: EntryRow[];
  getEntryDetailStatus: FetchStateEnum;
  entryRowDetail: EntryDetail[];
}
