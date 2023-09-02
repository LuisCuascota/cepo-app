import {
  Loan,
  LoanDetail,
} from "../../../../store/interfaces/Loan/loan.interfaces";

export interface LoanHeaderProps {
  onCalculate: (detail: LoanDetail[]) => void;
  onSaveLoan: (detail: Loan) => LoanDetail[];
}
