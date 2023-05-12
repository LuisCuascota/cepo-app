import { CreateLoanFeesParams } from "../../../../shared/utils/loan.utils";

export interface SimulatorHeaderProps {
  onSimulate: (event: CreateLoanFeesParams) => void;
}
