import { ChangeEvent } from "react";
import { EntryOption } from "../../../../store/interfaces/Entry/entry.interfaces";
import { EntryTypeEnum } from "../../../../shared/enums/entryType.enum";

export interface EntryItemProps {
  option: EntryOption;
  onItemChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onVisualisation: (type: EntryTypeEnum) => void;
}
