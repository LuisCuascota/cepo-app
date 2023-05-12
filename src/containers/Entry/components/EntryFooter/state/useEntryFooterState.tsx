import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { NewEntryDetail } from "../../../../../store/interfaces/Entry/entry.interfaces";
import {
  setDisableSave,
  setNewEntryAmount,
  setNewEntryDate,
  setOptionsValue,
} from "../../../../../store/actions/Entry/entry.actions";
import {
  getEntryCount,
  // postNewEntry,
} from "../../../../../store/thunks/Entry/entry.thunks";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { LoanToPay } from "../../../../../store/interfaces/Loan/loan.interfaces";
import { UseEntryFooterState } from "./useEntryFooterState.interfaces";

export const useEntryFooterState = (): UseEntryFooterState => {
  const dispatch = useAppDispatch();
  const [totalValue, setTotalValue] = useState<number>(0);
  const [saveIsLoad, setSaveIsLoad] = useState<boolean>(false);

  const {
    options,
    newEntry,
    count,
    postNewEntryStatus,
    feeLoanToPay,
    loanData,
    disableSave,
  } = useAppSelector((state) => ({
    ...state.entry,
    ...state.loan,
  }));

  const onSave = () => {
    setSaveIsLoad(true);
    const newEntryDetail: NewEntryDetail[] = options
      .filter((option) => option.value && option.value > 0)
      .map((option) => ({
        entry_number: count,
        type_id: option.id,
        value: option.value,
      }));

    let loanToPay: LoanToPay | undefined;

    if (loanData) {
      loanToPay = {
        feeToPay: feeLoanToPay,
        loanNumber: loanData.loan.number!,
        term: loanData.loan.term,
      };
    }

    // dispatch(
    //   postNewEntry({
    //     detail: newEntryDetail,
    //     header: newEntry,
    //     loanToPay,
    //   })
    // );
    console.log({
      detail: newEntryDetail,
      header: newEntry,
      loanToPay,
    });
  };

  const onCancelSave = () => {
    dispatch(getEntryCount());
    dispatch(setOptionsValue([]));
    dispatch(setDisableSave(true));
    setTotalValue(0);
  };

  const onChangeDate = (date: string) => {
    dispatch(setNewEntryDate(date));
  };

  useEffect(() => {
    if (options.length > 0) {
      const sum = options
        .filter((option) => (option.value ? true : false))
        .reduce((total, current) => total + current.value, 0);

      setTotalValue(sum);
      dispatch(setNewEntryAmount(sum));
    }
  }, [options]);

  useEffect(() => {
    if (postNewEntryStatus === FetchStateEnum.SUCCESS) {
      dispatch(getEntryCount());
      dispatch(setOptionsValue([]));
      dispatch(setDisableSave(true));
      setTotalValue(0);
      setSaveIsLoad(false);
    }
  }, [postNewEntryStatus]);

  return {
    disableSave,
    onCancelSave,
    onChangeDate,
    onSave,
    saveIsLoad,
    totalValue,
  };
};
