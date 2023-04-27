import { Box, IconButton, TextField, Typography } from "@mui/material";
import { EntryItemStyles } from "./EntryItem.styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { EntryItemProps } from "./EntryItem.interfaces";

export const EntryItem = (props: EntryItemProps) => {
  return (
    <Box sx={EntryItemStyles.content}>
      <Typography sx={EntryItemStyles.text} key={props.option.id}>
        {props.option.description}
      </Typography>
      <Box display={"flex"}>
        <TextField
          id={props.option.id.toString()}
          sx={EntryItemStyles.input}
          type={"number"}
          size={"small"}
          value={props.option.value}
          onChange={props.onItemChange}
        />
        <IconButton
          color="primary"
          aria-label={"Detalle de Préstamo"}
          disabled={!props.option.showDetails}
          onClick={() => props.onVisualisation(props.option.id)}
        >
          <VisibilityIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
