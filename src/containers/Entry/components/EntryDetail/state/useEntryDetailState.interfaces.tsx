import { EntryOption } from "../../../../../store/interfaces/Entry/entry.interfaces";
import { ChangeEvent } from "react";
import { EntryTypeEnum } from "../../../../../shared/enums/entryType.enum";

export interface UseEntryDetailStateInterfaces {
  entryOptions: EntryOption[];
  isOpenLoanModal: boolean;
  onCloseLoanModal: () => void;
  onItemChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onVisualisation: (type: EntryTypeEnum) => void;
}
