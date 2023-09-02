import { LoanDetail } from "../../store/interfaces/Loan/loan.interfaces";
import { LoanTypeEnum } from "../enums/loanType.enum";
import moment from "moment";
import { getFistSaturday } from "./date.utils";

export interface CreateLoanFeesParams {
  months: number;
  type: LoanTypeEnum;
  value: number;
  withTotals: boolean;
  loanNumber?: number;
}

export const createLoanFees = (
  event: CreateLoanFeesParams,
  date?: string
): LoanDetail[] => {
  const loanFees: LoanDetail[] = [];
  const paymentDate = date ? moment(date) : moment();
  const feeLoanValue = (event.value / event.months).toFixed(2);
  let feeValue = event.value;
  let interest = 0;
  let feeTotal = 0;
  let interestTotal = 0;

  if (event.type === LoanTypeEnum.FIXED_FEE) interest = event.value * 0.02;

  for (let value = 1; value <= event.months; value++) {
    if (event.type === LoanTypeEnum.VARIABLE_FEE) {
      interest = feeValue * 0.02;
    }

    feeValue -= +feeLoanValue;
    loanFees.push({
      balance_after_pay: +feeValue.toFixed(2),
      fee_number: value,
      fee_total: +(+feeLoanValue + interest).toFixed(2),
      fee_value: +feeLoanValue,
      interest: +interest.toFixed(2),
      is_paid: false,
      loan_number: event.loanNumber,
      payment_date: getFistSaturday(paymentDate),
    });

    feeTotal += +feeLoanValue;
    interestTotal += +interest.toFixed(2);
  }

  if (event.withTotals)
    loanFees.push({
      balance_after_pay: 0,
      fee_number: 0,
      fee_total: +(feeTotal + interestTotal).toFixed(2),
      fee_value: +feeTotal.toFixed(2),
      interest: +interestTotal.toFixed(2),
      is_paid: false,
      payment_date: "TOTALES",
    });

  return loanFees;
};
