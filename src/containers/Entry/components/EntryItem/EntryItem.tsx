import { Box, TextField, Typography } from "@mui/material";
import { EntryItemStyles } from "./EntryItem.styles";
import { ChangeEvent } from "react";
import { EntryOption } from "../../../../store/interfaces/Entry/entry.interfaces";

export interface EntryItemProps {
  option: EntryOption;
  onItemChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EntryItem = (props: EntryItemProps) => {
  return (
    <Box sx={EntryItemStyles.content}>
      <Typography sx={EntryItemStyles.text} key={props.option.id}>
        {props.option.description}
      </Typography>
      <TextField
        id={props.option.id.toString()}
        sx={EntryItemStyles.input}
        type={"number"}
        size={"small"}
        defaultValue={props.option.value}
        onChange={props.onItemChange}
      />
    </Box>
  );
};
