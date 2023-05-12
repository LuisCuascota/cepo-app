import { FetchStateEnum } from "../../../shared/enums/fetchState.enum";

export interface Loan {
  number?: number;
  account: number;
  date: string;
  value: number;
  term: number;
  rate: number;
  guarantor1_account: number;
  guarantor2_account: number;
}

export interface LoanDetail {
  id?: number;
  fee_number: number;
  payment_date: string;
  fee_value: number;
  interest: number;
  fee_total: number;
  balance_after_pay: number;
  is_paid: boolean;
  loan_number?: number;
}

export interface LoanResponse {
  detail: LoanDetail[];
  loan: Loan;
}

export interface FeeLoanToPay {
  id: number;
  balance: number;
  entry: number;
}

export interface LoanToPay {
  feeToPay: FeeLoanToPay[];
  loanNumber: number;
  term: number;
}

export interface LoanState {
  loanData: LoanResponse | undefined;
  getLoanStatus: FetchStateEnum;
  feeLoanToPay: FeeLoanToPay[];
  postNewLoanStatus: FetchStateEnum;
  count: number;
  getLoanCountStatus: FetchStateEnum;
}

export interface LoanCount {
  count: number;
}
