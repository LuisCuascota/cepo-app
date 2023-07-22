import { EntryModalProps } from "../EntryModal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectEntry } from "../../../../store/selectors/selectors";
import { getEntryDetailByNumber } from "../../../../store/thunks/Entry/entry.thunks";
import { FetchStateEnum } from "../../../../shared/enums/fetchState.enum";
import { buildDoc } from "../../../../shared/utils/buildDoc.utils";

export const useEntryModalState = (props: EntryModalProps) => {
  const dispatch = useAppDispatch();
  const { entryRowDetail, getEntryDetailStatus } = useAppSelector(selectEntry);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBuildDoc = () => {
    if (props.entryData) buildDoc(props.entryData, entryRowDetail);
  };

  useEffect(() => {
    if (props.entryData) {
      setIsLoading(true);
      dispatch(getEntryDetailByNumber(props.entryData.number));
    }
  }, [props.entryData]);

  useEffect(() => {
    if (getEntryDetailStatus === FetchStateEnum.SUCCESS) setIsLoading(false);
  }, [getEntryDetailStatus]);

  return {
    entryRowDetail,
    handleBuildDoc,
    isLoading,
  };
};
