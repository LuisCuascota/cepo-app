import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { SimulatorHeader } from "./components/SimulatorHeader/SimulatorHeader";
import { LoanFee, useSimulatorState } from "./state/useSimulatorState";

export const SimulatorContainer = () => {
  const { loanFees, onSimulate } = useSimulatorState();

  return (
    <Container fixed>
      <Paper elevation={2}>
        <SimulatorHeader onSimulate={onSimulate} />
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
              </TableRow>
            </TableHead>
            <TableBody>
              {loanFees.map((loan: LoanFee) => (
                <TableRow key={loan.feeNumber}>
                  <TableCell>{loan.feeNumber}</TableCell>
                  <TableCell>{loan.paymentDate}</TableCell>
                  <TableCell>{loan.feeValue}</TableCell>
                  <TableCell>{loan.interest}</TableCell>
                  <TableCell>{loan.feeTotal}</TableCell>
                  <TableCell>{loan.feeBalance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
