import { SimulatorHeaderEvent } from "../components/SimulatorHeader/SimulatorHeader.interfaces";
import { LoanTypeEnum } from "../../../shared/enums/loanType.enum";
import { useState } from "react";
import moment, { Moment } from "moment";

export interface LoanFee {
  feeNumber: number;
  paymentDate: string;
  feeValue: string;
  interest: string;
  feeTotal: string;
  feeBalance: string;
}
export const useSimulatorState = () => {
  const [loanFees, setLoanFees] = useState<LoanFee[]>([]);

  const getFistSaturday = (date: Moment): string => {
    date.add("month", 1);
    date.date(1).day(6);

    return date.format("YYYY-MM-DD").toString();
  };

  const onSimulate = (event: SimulatorHeaderEvent) => {
    const loanFees: LoanFee[] = [];
    const paymentDate = moment();
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
        feeBalance: feeValue.toFixed(2),
        feeNumber: value,
        feeTotal: (+feeLoanValue + interest).toFixed(2),
        feeValue: feeLoanValue,
        interest: interest.toFixed(2),
        paymentDate: getFistSaturday(paymentDate),
      });

      feeTotal += +feeLoanValue;
      interestTotal += +interest.toFixed(2);
    }

    loanFees.push({
      feeBalance: "",
      feeNumber: 0,
      feeTotal: (feeTotal + interestTotal).toFixed(2),
      feeValue: feeTotal.toFixed(2),
      interest: interestTotal.toFixed(2),
      paymentDate: "",
    });

    setLoanFees(loanFees);
  };

  return { loanFees, onSimulate };
};
