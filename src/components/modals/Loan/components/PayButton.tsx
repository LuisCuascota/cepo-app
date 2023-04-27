import { Button } from "@mui/material";
import {
  Loan,
  LoanDetail,
} from "../../../../store/interfaces/Loan/loan.interfaces";
import { useState } from "react";

export interface PayButtonProps {
  loanDetail: LoanDetail;
  loan: Loan;
  onPayAction: (detail: LoanDetail) => void;
}

export const PayButton = (props: PayButtonProps) => {
  const [disable, setDisable] = useState<boolean>(false);

  return (
    <Button
      disabled={disable}
      color="info"
      size={"small"}
      variant={"contained"}
      onClick={() => {
        props.onPayAction(props.loanDetail);
        setDisable(true);
      }}
    >
      {"Pagar"}
    </Button>
  );
};
