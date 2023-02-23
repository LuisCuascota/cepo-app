import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { getEntryOptionList } from "../../../../../store/thunks/Entry/entry.thunks";
import { FetchStateEnum } from "../../../../../shared/enums/fetchState.enum";
import { EntryOption } from "../../../../../store/interfaces/Entry/entry.interfaces";
import { setOptionsValue } from "../../../../../store/actions/Entry/entry.actions";

export const useEntryDetailState = () => {
  const dispatch = useAppDispatch();
  const { getOptionsStatus, options } = useAppSelector((state) => ({
    ...state.entry,
  }));
  const [entryOptions, setEntryOptions] = useState<EntryOption[]>([]);

  const onItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedOptions: EntryOption[] = options.map(
      (option: EntryOption) => ({
        description: option.description,
        id: option.id,
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

  useEffect(() => {
    dispatch(getEntryOptionList());
  }, []);

  useEffect(() => {
    if (getOptionsStatus === FetchStateEnum.SUCCESS) setEntryOptions(options);
  }, [getOptionsStatus]);

  return {
    entryOptions,
    onItemChange,
  };
};
