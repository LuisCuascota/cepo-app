import { Box, TextField, Typography } from "@mui/material";
import { EntryItemStyles } from "./EntryItem.styles";
import { ChangeEvent } from "react";

export interface EntryItemProps {
  code: number;
  description: string;
  onItemChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EntryItem = (props: EntryItemProps) => {
  return (
    <Box sx={EntryItemStyles.content}>
      <Typography sx={EntryItemStyles.text} key={props.code}>
        {props.description}
      </Typography>
      <TextField
        id={props.code.toString()}
        sx={EntryItemStyles.input}
        type={"number"}
        size={"small"}
        onChange={props.onItemChange}
      />
    </Box>
  );
};
