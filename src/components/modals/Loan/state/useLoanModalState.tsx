import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useEffect, useState } from "react";
import { getLoanByAccount } from "../../../../store/thunks/Loan/loan.thunks";
import { FetchStateEnum } from "../../../../shared/enums/fetchState.enum";
import {
  FeeLoanToPay,
  LoanDetail,
  LoanResponse,
} from "../../../../store/interfaces/Loan/loan.interfaces";
import { EntryTypeEnum } from "../../../../shared/enums/entryType.enum";
import {
  setDisableSave,
  setOptionsValue,
} from "../../../../store/actions/Entry/entry.actions";
import { setFeeLoanToPay } from "../../../../store/actions/Loan/loan.actions";
import {
  LoanModalProps,
  useLoanModalStateProps,
} from "./useLoanModalState.interfaces";
import { selectEntry, selectLoan } from "../../../../store/selectors/selectors";

export const useLoanModalState = (
  props: LoanModalProps
): useLoanModalStateProps => {
  const dispatch = useAppDispatch();
  const [loan, setLoan] = useState<LoanResponse>();
  const [detailSelected, setDetailSelected] = useState<LoanDetail[]>([]);
  const {
    newEntry: { account_number, number },
    options,
  } = useAppSelector(selectEntry);
  const { getLoanStatus, loanData } = useAppSelector(selectLoan);

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
        entry: number,
        id: loanDetail.id!,
      });
    });

    const updatedOptions = options.map((option) => {
      switch (option.id) {
        case EntryTypeEnum.loanFee:
          return {
            ...option,
            value: totalFee,
          };
        case EntryTypeEnum.loanInterest:
          return {
            ...option,
            value: totalInterest,
          };
        default:
          return option;
      }
    });

    dispatch(setDisableSave(false));
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

  return { loan, onClose, onPayButton, onSave };
};
