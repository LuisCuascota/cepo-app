import { LoanTypeEnum } from "../../../../shared/enums/loanType.enum";

export interface SimulatorHeaderProps {
  onSimulate: (event: SimulatorHeaderEvent) => void;
}

export interface SimulatorHeaderEvent {
  months: number;
  type: LoanTypeEnum;
  value: number;
}
