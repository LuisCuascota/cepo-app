import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  EntryDetail,
  EntryRow,
  NewEntryDetail,
} from "../../../../../store/interfaces/Entry/entry.interfaces";
import {
  setDisableSave,
  setNewEntryAmount,
  setNewEntryDate,
  setOptionsValue,
} from "../../../../../store/actions/Entry/entry.actions";
import {
  getEntryCount,
  postNewEntry,
} from "../../../../../store/thunks/Entry/entry.thunks";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { LoanToPay } from "../../../../../store/interfaces/Loan/loan.interfaces";
import { UseEntryFooterState } from "./useEntryFooterState.interfaces";
import {
  selectEntry,
  selectLoan,
  selectPerson,
} from "../../../../../store/selectors/selectors";
import { buildEntryPDFDoc } from "../../../../../shared/utils/buildEntryDoc.utils";
import { setFeeLoanToPay } from "../../../../../store/actions/Loan/loan.actions";

export const useEntryFooterState = (): UseEntryFooterState => {
  const dispatch = useAppDispatch();
  const [totalValue, setTotalValue] = useState<number>(0);
  const [saveIsLoad, setSaveIsLoad] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { options, newEntry, postNewEntryStatus, disableSave } =
    useAppSelector(selectEntry);
  const { persons } = useAppSelector(selectPerson);
  const { feeLoanToPay, loanData } = useAppSelector(selectLoan);

  const buildEntryDoc = () => {
    const personData = persons.find(
      (person) => person.number === newEntry.account_number
    );

    const entryDocHead: EntryRow = {
      account_number: newEntry.account_number,
      amount: newEntry.amount,
      date: newEntry.date,
      is_transfer: newEntry.is_transfer,
      names: personData!.names,
      number: newEntry.number,
      place: newEntry.place,
      surnames: personData!.surnames,
    };

    const entryDocDetail: EntryDetail[] = options.map((option) => ({
      description: option.description,
      value: option.value,
    }));

    buildEntryPDFDoc(entryDocHead, entryDocDetail);
  };

  const onSave = () => {
    setSaveIsLoad(true);
    const newEntryDetail: NewEntryDetail[] = options
      .filter((option) => option.value && option.value > 0)
      .map((option) => ({
        entry_number: newEntry.number,
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

    dispatch(
      postNewEntry({
        detail: newEntryDetail,
        header: newEntry,
        loanToPay,
      })
    );
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
    dispatch(setFeeLoanToPay([]));

    setTotalValue(0);
  };

  const onChangeDate = (date: string) => {
    dispatch(setNewEntryDate(date));
  };

  const handleClose = () => {
    dispatch(getEntryCount());
    dispatch(setOptionsValue([]));
    dispatch(setDisableSave(true));
    dispatch(setFeeLoanToPay([]));

    setTotalValue(0);
    setSaveIsLoad(false);
    setOpenDialog(false);
  };

  const handlePrint = () => {
    buildEntryDoc();
    handleClose();
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
      setOpenDialog(true);
    }
  }, [postNewEntryStatus]);

  return {
    dialog: {
      handleClose,
      handlePrint,
      open: openDialog,
    },
    disableSave,
    onCancelSave,
    onChangeDate,
    onSave,
    saveIsLoad,
    totalValue,
  };
};
