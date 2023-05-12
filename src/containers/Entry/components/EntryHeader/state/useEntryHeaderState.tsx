import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { getPersonList } from "../../../../../store/thunks/Person/person.thunks";
import {
  getEntryCount,
  getEntryOptionList,
} from "../../../../../store/thunks/Entry/entry.thunks";
import { HeaderState } from "./useEntryHeaderState.interfaces";
import {
  setDisableSearch,
  setNewEntryAccount,
  setNewEntryIsTransfer,
  setNewEntryNumber,
} from "../../../../../store/actions/Entry/entry.actions";
import { PaymentMethodEnum } from "../../../../../shared/enums/paymentMethod.enum";

export const useEntryHeaderState = (): HeaderState => {
  const dispatch = useAppDispatch();
  const [entryCount, setEntryCount] = useState<number>(0);
  const {
    entry: { getEntryCountStatus, count, disableSearch },
  } = useAppSelector((state) => state);

  const onChangePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === PaymentMethodEnum.CASH)
      dispatch(setNewEntryIsTransfer(false));
    if (event.target.value === PaymentMethodEnum.TRANSFER)
      dispatch(setNewEntryIsTransfer(true));
  };

  const onChangeSelector = (id: number) => {
    dispatch(getEntryOptionList(id));
    dispatch(setNewEntryAccount(id));
    dispatch(setDisableSearch(true));
  };

  useEffect(() => {
    dispatch(getPersonList());
    dispatch(getEntryCount());
  }, []);

  useEffect(() => {
    if (getEntryCountStatus === FetchStateEnum.SUCCESS) {
      setEntryCount(count);
      dispatch(setNewEntryNumber(count));
      dispatch(setDisableSearch(false));
    }
  }, [getEntryCountStatus]);

  return {
    disableSearch,
    entryCount,
    onChangePaymentMethod,
    onChangeSelector,
  };
};
