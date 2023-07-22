import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { EntryOption } from "../../../../../store/interfaces/Entry/entry.interfaces";
import {
  setDisableSave,
  setOptionsValue,
} from "../../../../../store/actions/Entry/entry.actions";
import { EntryTypeEnum } from "../../../../../shared/enums/entryType.enum";
import { UseEntryDetailStateInterfaces } from "./useEntryDetailState.interfaces";
import { selectEntry } from "../../../../../store/selectors/selectors";

export const useEntryDetailState = (): UseEntryDetailStateInterfaces => {
  const dispatch = useAppDispatch();
  const { getOptionsStatus, options } = useAppSelector(selectEntry);
  const [entryOptions, setEntryOptions] = useState<EntryOption[]>([]);
  const [isOpenLoanModal, setOpenLoanModal] = useState<boolean>(false);

  const onItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedOptions: EntryOption[] = options.map(
      (option: EntryOption) => ({
        ...option,
        value:
          option.id.toString() === event.target.id
            ? +event.target.value
            : option.value
            ? option.value
            : 0,
      })
    );

    dispatch(setOptionsValue(updatedOptions));
  };

  const onVisualisation = (type: EntryTypeEnum) => {
    if (type == EntryTypeEnum.loanFee) {
      setOpenLoanModal(true);
    }
  };

  const onCloseLoanModal = () => {
    setOpenLoanModal(false);
  };

  const validateEnableSave = () => {
    const filteredOptions = options.filter((option) => option.showDetails);

    if (options.length > 0 && filteredOptions.length == 0)
      dispatch(setDisableSave(false));
  };

  useEffect(() => {
    if (getOptionsStatus === FetchStateEnum.SUCCESS) {
      setEntryOptions(options);
      validateEnableSave();
    }
  }, [options]);

  return {
    entryOptions,
    isOpenLoanModal,
    onCloseLoanModal,
    onItemChange,
    onVisualisation,
  };
};
