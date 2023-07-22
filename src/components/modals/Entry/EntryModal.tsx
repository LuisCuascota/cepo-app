import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getFormattedDate } from "../../../shared/utils/date.utils";
import {
  EntryDetail,
  EntryRow,
} from "../../../store/interfaces/Entry/entry.interfaces";
import { PaymentMethodEnum } from "../../../shared/enums/paymentMethod.enum";
import { useEntryModalState } from "./state/useEntryModalState";

export interface EntryModalProps {
  open: boolean;
  handleClose: () => void;
  entryData?: EntryRow;
}

export const EntryModal = (props: EntryModalProps) => {
  const { isLoading, entryRowDetail, handleBuildDoc } =
    useEntryModalState(props);

  return (
    <Dialog maxWidth={"xl"} open={props.open} onClose={props.handleClose}>
      <DialogTitle textAlign={"center"}>
        {"Detalle de Comprobante de Ingreso"}
      </DialogTitle>
      <DialogContent>
        {props.entryData && (
          <Grid container spacing={1}>
            <Grid item md={4}>
              <Typography>{`Nº: ${props.entryData.number}`}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>{`Fecha: ${getFormattedDate(
                props.entryData.date
              )}`}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>{`Medio: ${
                props.entryData.is_transfer
                  ? PaymentMethodEnum.TRANSFER
                  : PaymentMethodEnum.CASH
              }`}</Typography>
            </Grid>
            <Grid item md={8}>
              <Typography>{`Socio: ${props.entryData.names} ${props.entryData.surnames}`}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>{`Monto: ${props.entryData.amount}`}</Typography>
            </Grid>
          </Grid>
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">{"Por concepto de"}</TableCell>
                <TableCell align="left">{"Valor"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array(11)
                    .fill(0)
                    .map((_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Array(2)
                          .fill(0)
                          .map((_, colIndex) => (
                            <TableCell key={colIndex}>
                              <Skeleton animation="wave" />
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                : entryRowDetail.map((row: EntryDetail, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.value ? row.value : 0}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          variant={"contained"}
          color={"secondary"}
          disabled={isLoading}
          onClick={handleBuildDoc}
        >
          {"Imprimir"}
        </Button>
        <Button onClick={props.handleClose}>{"Cerrar"}</Button>
      </DialogActions>
    </Dialog>
  );
};
