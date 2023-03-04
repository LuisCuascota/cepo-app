import { Box } from "@mui/material";
import { useEntryDetailState } from "./state/useEntryDetailState";
import { EntryItem } from "../EntryItem/EntryItem";
import { EntryOption } from "../../../../store/interfaces/Entry/entry.interfaces";
import { LoanModal } from "../../../../components/modals/Loan/LoanModal";

export const EntryDetail = () => {
  const {
    entryOptions,
    isOpenLoanModal,
    onCloseLoanModal,
    onItemChange,
    onVisualisation,
  } = useEntryDetailState();

  return (
    <>
      <LoanModal open={isOpenLoanModal} handleClose={onCloseLoanModal} />
      <Box padding={1}>
        {entryOptions.map((option: EntryOption) => (
          <EntryItem
            key={option.id}
            option={option}
            onItemChange={onItemChange}
            onVisualisation={onVisualisation}
          />
        ))}
      </Box>
    </>
  );
};
