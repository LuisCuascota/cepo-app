import { ChangeEvent, useEffect, useState } from "react";
import { LoanTypeEnum } from "../../../../../shared/enums/loanType.enum";
import { LoanHeaderProps } from "../LoanHeader.interfaces";
import { getPersonList } from "../../../../../store/thunks/Person/person.thunks";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { createLoanFees } from "../../../../../shared/utils/loan.utils";
import { getFormattedDate } from "../../../../../shared/utils/date.utils";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { getLoanCount } from "../../../../../store/thunks/Loan/loan.thunks";
import {
  selectLoan,
  selectPerson,
} from "../../../../../store/selectors/selectors";
import { buildLoanPDFDoc } from "../../../../../shared/utils/buildLoanDoc.utils";
import { LoanDetail } from "../../../../../store/interfaces/Loan/loan.interfaces";

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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loanFees, setLoanFees] = useState<LoanDetail[]>([]);

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
  const { persons } = useAppSelector(selectPerson);

  const onCalculate = () => {
    props.onCalculate(
      createLoanFees(
        {
          loanNumber: count,
          months,
          type,
          value,
          withTotals: false,
        },
        date
      )
    );
  };
  const onSaveLoan = () => {
    setLoanFees(
      props.onSaveLoan({
        account: personId,
        date,
        guarantor1_account: guarantor1Id,
        guarantor2_account: guarantor2Id,
        number: count,
        rate: 2,
        term: months,
        value,
      })
    );
  };

  const handleClose = () => {
    props.onCalculate([]);
    dispatch(getLoanCount());
    setOpenDialog(false);
  };

  const handlePrint = () => {
    const personData = persons.find((person) => person.number === personId);

    buildLoanPDFDoc(
      {
        account: personId,
        date,
        guarantor1_account: guarantor1Id,
        guarantor2_account: guarantor2Id,
        names: `${personData!.names} ${personData!.surnames}`,
        number: count,
        rate: 2,
        term: months,
        value,
      },
      loanFees
    );
    handleClose();
  };

  useEffect(() => {
    dispatch(getPersonList());
    dispatch(getLoanCount());
  }, []);

  useEffect(() => {
    if (postNewLoanStatus === FetchStateEnum.SUCCESS) {
      setOpenDialog(true);
    }
  }, [postNewLoanStatus]);

  return {
    count,
    dialog: {
      handleClose,
      handlePrint,
      open: openDialog,
    },
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
