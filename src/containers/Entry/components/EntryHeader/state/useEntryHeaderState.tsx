import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { PersonData } from "../../../../../store/interfaces/Entry/person.interfaces";
import { getPersonList } from "../../../../../store/thunks/Person/person.thunks";
import { getEntryCount } from "../../../../../store/thunks/Entry/entry.thunks";
import { HeaderState, SelectorPerson } from "./useEntryHeaderState.interfaces";
import {
  setNewEntryAccount,
  setNewEntryIsTransfer,
  setNewEntryNumber,
} from "../../../../../store/actions/Entry/entry.actions";
import { PaymentMethodEnum } from "../../../../../shared/enums/paymentMethod.enum";

export const useEntryHeaderState = (): HeaderState => {
  const dispatch = useAppDispatch();
  const [personList, setPersonList] = useState<SelectorPerson[]>([]);
  const [entryCount, setEntryCount] = useState<number>(0);
  const {
    person: { getPersonsStatus, persons },
    entry: { getEntryCountStatus, count },
  } = useAppSelector((state) => state);

  const buildSelector = () => {
    setPersonList(
      persons.map((person: PersonData) => ({
        id: person.number ? person.number : 0,
        label: `${person.number ? person.number : 0}-${person.names} ${
          person.surnames
        }`,
      }))
    );
  };

  const onChangePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === PaymentMethodEnum.CASH)
      dispatch(setNewEntryIsTransfer(false));
    if (event.target.value === PaymentMethodEnum.TRANSFER)
      dispatch(setNewEntryIsTransfer(true));
  };

  const onChangeSelector = (
    _event: SyntheticEvent,
    value: SelectorPerson | null
  ) => {
    if (value) dispatch(setNewEntryAccount(value.id));
  };

  useEffect(() => {
    dispatch(getPersonList());
    dispatch(getEntryCount());
  }, []);

  useEffect(() => {
    if (getPersonsStatus === FetchStateEnum.SUCCESS) buildSelector();
  }, [getPersonsStatus]);

  useEffect(() => {
    if (getEntryCountStatus === FetchStateEnum.SUCCESS) {
      setEntryCount(count);
      dispatch(setNewEntryNumber(count));
    }
  }, [getEntryCountStatus]);

  return { entryCount, onChangePaymentMethod, onChangeSelector, personList };
};
