import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useEffect, useState } from "react";
import { getLoanByAccount } from "../../../../store/thunks/Loan/loan.thunks";
import { FetchStateEnum } from "../../../../shared/enums/fetchState.enum";
import {
  FeeLoanToPay,
  LoanDetail,
  LoanResponse,
} from "../../../../store/interfaces/Loan/loan.interfaces";
import { LoanModalProps } from "../LoanModal";
import { EntryTypeEnum } from "../../../../shared/enums/entryType.enum";
import { setOptionsValue } from "../../../../store/actions/Entry/entry.actions";
import { setFeeLoanToPay } from "../../../../store/actions/Loan/loan.actions";

export const useLoanModalState = (props: LoanModalProps) => {
  const dispatch = useAppDispatch();
  const [loan, setLoan] = useState<LoanResponse>();
  const [detailSelected, setDetailSelected] = useState<LoanDetail[]>([]);
  const {
    newEntry: { account_number, number },
    getLoanStatus,
    loanData,
    options,
  } = useAppSelector((state) => ({
    ...state.entry,
    ...state.loan,
  }));

  const onPayButton = (loanDetail: LoanDetail) => {
    detailSelected.push(loanDetail);
    setDetailSelected(detailSelected);
  };

  const onClose = () => {
    setDetailSelected([]);
    props.handleClose();
  };

  const onSave = () => {
    let totalFee: number = 0;
    let totalInterest: number = 0;
    const feeToPay: FeeLoanToPay[] = [];

    detailSelected.map((loanDetail) => {
      totalFee += loanDetail.fee_value;
      totalInterest += loanDetail.interest;
      feeToPay.push({
        balance: +(
          loanData!.loan.value -
          loanDetail.fee_number * loanDetail.fee_value
        ).toFixed(2),
        entry: number,
        id: loanDetail.id,
      });
    });

    const updatedOptions = options.map((option) => {
      switch (option.id) {
        case EntryTypeEnum.loanFee:
          return {
            description: option.description,
            id: option.id,
            value: totalFee,
          };
        case EntryTypeEnum.loanInterest:
          return {
            description: option.description,
            id: option.id,
            value: totalInterest,
          };
        default:
          return option;
      }
    });

    dispatch(setOptionsValue(updatedOptions));
    dispatch(setFeeLoanToPay(feeToPay));
    setDetailSelected([]);
    props.handleClose();
  };

  useEffect(() => {
    if (props.open) dispatch(getLoanByAccount(account_number));
  }, [props.open]);

  useEffect(() => {
    if (getLoanStatus === FetchStateEnum.SUCCESS) {
      setLoan(loanData);
    }
  }, [getLoanStatus]);

  return { detailSelected, loan, onClose, onPayButton, onSave };
};
