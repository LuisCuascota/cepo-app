import { Container, Paper } from "@mui/material";
import { LoanHeader } from "./components/LoanHeader/LoanHeader";
import { useLoanState } from "./state/useLoanState";
import { LoanTable } from "../../components/loan/loanTable/LoanTable";

export const LoanContainer = () => {
  const { loanFees, onCalculate, onSaveLoan } = useLoanState();

  return (
    <Container fixed>
      <Paper elevation={2}>
        <LoanHeader onCalculate={onCalculate} onSaveLoan={onSaveLoan} />
        <LoanTable loanDetail={loanFees} withActions={false} />
      </Paper>
    </Container>
  );
};
