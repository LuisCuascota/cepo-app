import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { EntryFooterStyles } from "./EntryFooter.styles";
import { useEntryFooterState } from "./state/useEntryFooterState";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export const EntryFooter = () => {
  const { date, onSave, saveIsLoad, totalValue } = useEntryFooterState();

  return (
    <>
      <Box sx={EntryFooterStyles.content}>
        <Box display={"flex"}>
          <Typography sx={EntryFooterStyles.labelText}>{"Fecha: "}</Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              inputFormat={"YYYY-MM-DD"}
              value={date.value}
              onChange={(newValue) => {
                date.setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} size={"small"} />}
            />
          </LocalizationProvider>
        </Box>
        <Box display={"flex"}>
          <Typography sx={EntryFooterStyles.labelText}>{"Total: "}</Typography>
          <TextField
            type={"number"}
            size={"small"}
            value={totalValue}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box sx={EntryFooterStyles.buttonContent}>
        <LoadingButton
          onClick={onSave}
          endIcon={<SaveIcon />}
          loading={saveIsLoad}
          loadingPosition="end"
          variant="contained"
        >
          <span>{"Guardar Ingreso"}</span>
        </LoadingButton>
      </Box>
    </>
  );
};
