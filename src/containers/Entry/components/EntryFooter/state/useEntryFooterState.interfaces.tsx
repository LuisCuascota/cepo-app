import { Moment } from "moment";
import { Dispatch, SetStateAction } from "react";

export interface UseEntryFooterState {
  onSave: () => void;
  saveIsLoad: boolean;
  totalValue: number;
  date: DateButton;
}

export interface DateButton {
  setValue: Dispatch<SetStateAction<Moment | null>>;
  value: Moment | null;
}
