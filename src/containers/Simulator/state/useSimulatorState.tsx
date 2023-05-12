import { useState } from "react";
import { LoanDetail } from "../../../store/interfaces/Loan/loan.interfaces";
import {
  createLoanFees,
  CreateLoanFeesParams,
} from "../../../shared/utils/loan.utils";

export const useSimulatorState = () => {
  const [loanFees, setLoanFees] = useState<LoanDetail[]>([]);

  const onSimulate = (event: CreateLoanFeesParams) => {
    setLoanFees(createLoanFees(event));
  };

  return { loanFees, onSimulate };
};
