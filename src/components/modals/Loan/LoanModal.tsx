import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useLoanModalState } from "./state/useLoanModalState";
import { LoanDetail } from "../../../store/interfaces/Loan/loan.interfaces";
import moment from "moment";
import { PayButton } from "./components/PayButton";

export interface LoanModalProps {
  open: boolean;
  handleClose: () => void;
}

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
            <Typography>{`Fecha: ${moment(loan?.loan.date)
              .format("YYYY-MM-DD")
              .toString()}`}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>{`Cantidad: ${loan?.loan.value}`}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography>{`Meses: ${loan?.loan.term}`}</Typography>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">{"Cuota"}</TableCell>
                <TableCell align="right">{"Fecha de Pago"}</TableCell>
                <TableCell align="right">{"Cuota Capital"}</TableCell>
                <TableCell align="right">{"Interes"}</TableCell>
                <TableCell align="right">{"Total a Pagar"}</TableCell>
                <TableCell align="right">{"Saldo"}</TableCell>
                <TableCell align="right">{"Acción"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loan?.detail.map((loanDetail: LoanDetail) => (
                <TableRow key={loanDetail.fee_number}>
                  <TableCell>{loanDetail.fee_number}</TableCell>
                  <TableCell>
                    {moment(loanDetail.payment_date)
                      .format("YYYY-MM-DD")
                      .toString()}
                  </TableCell>
                  <TableCell>{loanDetail.fee_value}</TableCell>
                  <TableCell>{loanDetail.interest}</TableCell>
                  <TableCell>{loanDetail.fee_total}</TableCell>
                  <TableCell>{loanDetail.balance_after_pay}</TableCell>
                  <TableCell>
                    {!loanDetail.is_paid && (
                      <PayButton
                        loanDetail={loanDetail}
                        loan={loan?.loan}
                        onPayAction={onPayButton}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
