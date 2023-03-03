import { Box } from "@mui/material";
import { useEntryDetailState } from "./state/useEntryDetailState";
import { EntryItem } from "../EntryItem/EntryItem";
import { EntryOption } from "../../../../store/interfaces/Entry/entry.interfaces";

export const EntryDetail = () => {
  const { entryOptions, onItemChange } = useEntryDetailState();

  return (
    <Box padding={1}>
      {entryOptions.map((option: EntryOption) => (
        <EntryItem
          key={option.id}
          option={option}
          onItemChange={onItemChange}
        />
      ))}
    </Box>
  );
};
