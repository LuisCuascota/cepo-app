import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LoanDetail } from "../../../store/interfaces/Loan/loan.interfaces";
import moment from "moment";
import { LoanModalStyles } from "../../modals/Loan/LoanModal.styles";
import { PayButton } from "../payButton/PayButton";
import { getFormattedDate } from "../../../shared/utils/date.utils";

export interface LoanTableProps {
  loanDetail: LoanDetail[];
  onPayButton?: (loanDetail: LoanDetail) => void;
  withActions?: boolean;
}

export const LoanTable = (props: LoanTableProps) => {
  const getRowStyle = (loanDetail: LoanDetail) => {
    if (!loanDetail.is_paid && moment().isAfter(loanDetail.payment_date))
      return LoanModalStyles.latePayment;
    if (
      !loanDetail.is_paid &&
      moment().isSame(loanDetail.payment_date, "month")
    )
      return LoanModalStyles.currentPayment;
    if (loanDetail.is_paid) return LoanModalStyles.madePayment;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">{"Cuota"}</TableCell>
            <TableCell align="left">{"Fecha de Pago"}</TableCell>
            <TableCell align="left">{"Cuota Capital"}</TableCell>
            <TableCell align="left">{"Interes"}</TableCell>
            <TableCell align="left">{"Total a Pagar"}</TableCell>
            <TableCell align="left">{"Saldo"}</TableCell>
            {props.withActions && (
              <TableCell align="right">{"Acción"}</TableCell>
            )}
          </TableRow>
        </TableHead>
        {props.loanDetail && (
          <TableBody>
            {props.loanDetail.map((loanDetail: LoanDetail) => (
              <TableRow
                key={loanDetail.fee_number}
                sx={getRowStyle(loanDetail)}
              >
                <TableCell>{loanDetail.fee_number}</TableCell>
                <TableCell>
                  {getFormattedDate(loanDetail.payment_date)}
                </TableCell>
                <TableCell>{loanDetail.fee_value}</TableCell>
                <TableCell>{loanDetail.interest}</TableCell>
                <TableCell>{loanDetail.fee_total}</TableCell>
                <TableCell>{loanDetail.balance_after_pay}</TableCell>
                {props.withActions && (
                  <TableCell>
                    {!loanDetail.is_paid && (
                      <PayButton
                        loanDetail={loanDetail}
                        onPayAction={props.onPayButton!}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
