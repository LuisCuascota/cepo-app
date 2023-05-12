import {
  LoanDetail,
  LoanResponse,
} from "../../../../store/interfaces/Loan/loan.interfaces";

export interface useLoanModalStateProps {
  loan: LoanResponse | undefined;
  onClose: () => void;
  onPayButton: (loanDetail: LoanDetail) => void;
  onSave: () => void;
}

export interface LoanModalProps {
  open: boolean;
  handleClose: () => void;
}
