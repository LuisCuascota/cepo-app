import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { LoanTypeEnum } from "../../../../shared/enums/loanType.enum";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useSimulatorHeaderState } from "./state/useSimulatorHeaderState";
import { SimulatorHeaderProps } from "./SimulatorHeader.interfaces";

export const SimulatorHeader = (props: SimulatorHeaderProps) => {
  const { onChangeMonths, onChangeLoanType, onChangeValue, onSimulate } =
    useSimulatorHeaderState(props);

  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Typography>{"Simulador de Crédito"}</Typography>
      </Grid>
      <Grid item md={3}>
        <Typography>{"Valor"}</Typography>
        <TextField
          type={"number"}
          size={"small"}
          defaultValue={0}
          onChange={onChangeValue}
        />
      </Grid>
      <Grid item md={3}>
        <Typography>{"Meses"}</Typography>
        <TextField
          type={"number"}
          size={"small"}
          defaultValue={0}
          onChange={onChangeMonths}
        />
      </Grid>

      <Grid item md={3}>
        <Typography>{"Tipo de Cuota"}</Typography>
        <RadioGroup
          row
          defaultValue={LoanTypeEnum.FIXED_FEE}
          onChange={onChangeLoanType}
        >
          <FormControlLabel
            value={LoanTypeEnum.FIXED_FEE}
            control={<Radio size={"small"} />}
            label="Fijo"
          />
          <FormControlLabel
            value={LoanTypeEnum.VARIABLE_FEE}
            control={<Radio size={"small"} />}
            label="Variable"
          />
        </RadioGroup>
      </Grid>
      <Grid item md={3}>
        <LoadingButton
          endIcon={<SaveIcon />}
          loadingPosition="end"
          variant="contained"
          onClick={onSimulate}
        >
          <span>{"Simular"}</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
