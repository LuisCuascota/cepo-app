import { ChangeEvent, useState } from "react";
import { LoanTypeEnum } from "../../../../../shared/enums/loanType.enum";
import { SimulatorHeaderProps } from "../SimulatorHeader.interfaces";

export const useSimulatorHeaderState = (props: SimulatorHeaderProps) => {
  const [months, setMonths] = useState<number>(0);
  const [type, setType] = useState<LoanTypeEnum>(LoanTypeEnum.FIXED_FEE);
  const [value, setValue] = useState<number>(0);

  const onChangeMonths = (event: ChangeEvent<HTMLInputElement>) => {
    setMonths(+event.target.value);
  };

  const onChangeLoanType = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === LoanTypeEnum.FIXED_FEE)
      setType(LoanTypeEnum.FIXED_FEE);
    if (event.target.value === LoanTypeEnum.VARIABLE_FEE)
      setType(LoanTypeEnum.VARIABLE_FEE);
  };

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
  };

  const onSimulate = () => {
    props.onSimulate({ months, type, value, withTotals: true });
  };

  return { onChangeLoanType, onChangeMonths, onChangeValue, onSimulate };
};
