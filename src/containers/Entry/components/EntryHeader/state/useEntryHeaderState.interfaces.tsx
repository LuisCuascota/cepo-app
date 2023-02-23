import { ChangeEvent, SyntheticEvent } from "react";

export interface SelectorPerson {
  label: string;
  id: number;
}

export interface HeaderState {
  entryCount: number;
  personList: SelectorPerson[];
  onChangePaymentMethod: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelector: (
    _event: SyntheticEvent,
    value: SelectorPerson | null
  ) => void;
}
