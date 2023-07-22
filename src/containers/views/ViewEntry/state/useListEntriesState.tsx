import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectEntry } from "../../../../store/selectors/selectors";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getEntryCount,
  getEntryRowsPaginated,
} from "../../../../store/thunks/Entry/entry.thunks";
import { FetchStateEnum } from "../../../../shared/enums/fetchState.enum";
import { EntryRow } from "../../../../store/interfaces/Entry/entry.interfaces";
import { getPersonList } from "../../../../store/thunks/Person/person.thunks";

export const useListEntriesState = () => {
  const dispatch = useAppDispatch();
  const { entryRows, count, getEntryCountStatus, getEntryRowsStatus } =
    useAppSelector(selectEntry);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowSelected, setRowSelected] = useState<EntryRow>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [accountSelector, setAccountSelector] = useState<number | undefined>();

  const onPageChange = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onOpenModal = (row: EntryRow) => {
    setRowSelected(row);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setRowSelected(undefined);
    setIsModalOpen(false);
  };

  const onSelectPerson = (id: number) => {
    setAccountSelector(id);
  };
  const onClearPerson = () => {
    setAccountSelector(undefined);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getEntryCount());
    dispatch(getPersonList());
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getEntryRowsPaginated({
        account: accountSelector,
        limit: rowsPerPage,
        offset: page * rowsPerPage,
      })
    );
  }, [page, rowsPerPage, accountSelector]);

  useEffect(() => {
    if (
      getEntryCountStatus === FetchStateEnum.SUCCESS &&
      getEntryRowsStatus === FetchStateEnum.SUCCESS
    )
      setIsLoading(false);
  }, [getEntryCountStatus, getEntryRowsStatus]);

  return {
    entryRows,
    isLoading,
    modal: {
      isModalOpen,
      onCloseModal,
      onOpenModal,
      rowSelected,
    },
    pagination: {
      count,
      onPageChange,
      onRowsPerPageChange,
      page,
      rowsPerPage,
    },
    search: {
      onClearPerson,
      onSelectPerson,
    },
  };
};
