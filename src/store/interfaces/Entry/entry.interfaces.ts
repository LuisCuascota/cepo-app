import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";
import { FeeLoanToPay, LoanToPay } from "../Loan/loan.interfaces";

export interface EntryOption {
  id: number;
  description: string;
  value: number;
  showDetails: boolean;
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
}
