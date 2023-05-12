import { Container, Paper } from "@mui/material";
import { SimulatorHeader } from "./components/SimulatorHeader/SimulatorHeader";
import { useSimulatorState } from "./state/useSimulatorState";
import { LoanTable } from "../../components/loan/loanTable/LoanTable";

export const SimulatorContainer = () => {
  const { loanFees, onSimulate } = useSimulatorState();

  return (
    <Container fixed>
      <Paper elevation={2}>
        <SimulatorHeader onSimulate={onSimulate} />
        <LoanTable loanDetail={loanFees} withActions={false} />
      </Paper>
    </Container>
  );
};
