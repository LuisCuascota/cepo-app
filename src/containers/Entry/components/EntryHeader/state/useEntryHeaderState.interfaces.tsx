import { ChangeEvent } from "react";

export interface HeaderState {
  entryCount: number;
  onChangePaymentMethod: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelector: (id: number) => void;
  disableSearch: boolean;
}
