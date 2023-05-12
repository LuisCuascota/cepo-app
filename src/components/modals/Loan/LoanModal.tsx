import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useLoanModalState } from "./state/useLoanModalState";
import { LoanModalProps } from "./state/useLoanModalState.interfaces";
import { LoanTable } from "../../loan/loanTable/LoanTable";
import { getFormattedDate } from "../../../shared/utils/date.utils";

export const LoanModal = (props: LoanModalProps) => {
  const { loan, onPayButton, onClose, onSave } = useLoanModalState(props);

  return (
    <Dialog maxWidth={"xl"} open={props.open} onClose={onClose}>
      <DialogTitle textAlign={"center"}>{"Detalle de Préstamo"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={0}>
          <Grid item md={3}>
            <Typography>{`Cod: ${loan?.loan.number}`}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>{`Fecha: ${getFormattedDate(
              loan?.loan.date
            )}`}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>{`Cantidad: ${loan?.loan.value}`}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>{`Meses: ${loan?.loan.term}`}</Typography>
          </Grid>
        </Grid>
        <LoanTable
          loanDetail={loan?.detail!}
          onPayButton={onPayButton}
          withActions={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{"Cerrar"}</Button>
        <Button onClick={onSave} variant={"contained"}>
          {"Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
