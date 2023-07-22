import { ChangeEvent, useEffect, useState } from "react";
import { LoanTypeEnum } from "../../../../../shared/enums/loanType.enum";
import { LoanHeaderProps } from "../LoanHeader.interfaces";
import { getPersonList } from "../../../../../store/thunks/Person/person.thunks";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { createLoanFees } from "../../../../../shared/utils/loan.utils";
import { getFormattedDate } from "../../../../../shared/utils/date.utils";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { getLoanCount } from "../../../../../store/thunks/Loan/loan.thunks";
import { selectLoan } from "../../../../../store/selectors/selectors";

export const useLoanHeaderState = (props: LoanHeaderProps) => {
  const dispatch = useAppDispatch();
  const { postNewLoanStatus, count } = useAppSelector(selectLoan);
  const [months, setMonths] = useState<number>(0);
  const [type, setType] = useState<LoanTypeEnum>(LoanTypeEnum.FIXED_FEE);
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState<string>(getFormattedDate());
  const [personId, setPersonId] = useState<number>(0);
  const [guarantor1Id, setGuarantor1Id] = useState<number>(0);
  const [guarantor2Id, setGuarantor2Id] = useState<number>(0);

  const onChangeLoanType = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === LoanTypeEnum.FIXED_FEE)
      setType(LoanTypeEnum.FIXED_FEE);
    if (event.target.value === LoanTypeEnum.VARIABLE_FEE)
      setType(LoanTypeEnum.VARIABLE_FEE);
  };
  const onChangeMonths = (event: ChangeEvent<HTMLInputElement>) =>
    setMonths(+event.target.value);
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(+event.target.value);
  const onChangeDate = (newDate: string) => setDate(newDate);
  const onSelectPerson = (id: number) => setPersonId(id);
  const onSelectGuarantor1 = (id: number) => setGuarantor1Id(id);
  const onSelectGuarantor2 = (id: number) => setGuarantor2Id(id);

  const onCalculate = () => {
    props.onCalculate(
      createLoanFees({
        loanNumber: count,
        months,
        type,
        value,
        withTotals: false,
      })
    );
  };
  const onSaveLoan = () => {
    props.onSaveLoan({
      account: personId,
      date,
      guarantor1_account: guarantor1Id,
      guarantor2_account: guarantor2Id,
      number: count,
      rate: 2,
      term: months,
      value,
    });
  };

  useEffect(() => {
    dispatch(getPersonList());
    dispatch(getLoanCount());
  }, []);

  useEffect(() => {
    if (postNewLoanStatus === FetchStateEnum.SUCCESS) {
      props.onCalculate([]);
      dispatch(getLoanCount());
    }
  }, [postNewLoanStatus]);

  return {
    count,
    onCalculate,
    onChangeDate,
    onChangeLoanType,
    onChangeMonths,
    onChangeValue,
    onSaveLoan,
    onSelectGuarantor1,
    onSelectGuarantor2,
    onSelectPerson,
  };
};
