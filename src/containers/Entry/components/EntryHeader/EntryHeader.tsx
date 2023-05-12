import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEntryHeaderState } from "./state/useEntryHeaderState";
import { EntryHeaderStyles } from "./EntryHeader.styles";
import { PaymentMethodEnum } from "../../../../shared/enums/paymentMethod.enum";
import { PersonSearch } from "../../../../components/search/personSearch/PersonSearch";

export const EntryHeader = () => {
  const { entryCount, onChangePaymentMethod, onChangeSelector, disableSearch } =
    useEntryHeaderState();

  return (
    <Grid container sx={EntryHeaderStyles.content}>
      <Grid item md={12}>
        <Typography textAlign={"center"}>CEPO DE ORO</Typography>
      </Grid>
      <Grid item md={5}>
        <Typography>Comprobante de Ingreso</Typography>
      </Grid>
      <Grid item md={7}>
        <Box sx={EntryHeaderStyles.optionBox}>
          <RadioGroup
            row
            defaultValue={PaymentMethodEnum.CASH}
            onChange={onChangePaymentMethod}
          >
            <FormControlLabel
              value={PaymentMethodEnum.CASH}
              control={<Radio size={"small"} />}
              label="Efectivo"
            />
            <FormControlLabel
              value={PaymentMethodEnum.TRANSFER}
              control={<Radio size={"small"} />}
              label="Transferencia"
            />
          </RadioGroup>
          <Typography>N{entryCount}</Typography>
        </Box>
      </Grid>
      <Grid item md={5}>
        <Typography>{"Recibí de:"}</Typography>
      </Grid>
      <Grid item md={7}>
        <PersonSearch
          disableSearch={disableSearch}
          onChangeSelector={onChangeSelector}
        />
      </Grid>
    </Grid>
  );
};
