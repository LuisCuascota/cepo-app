import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import moment, { Moment } from "moment";

export interface DatePikerInputProps {
  onChangeDate: (date: string) => void;
}
export const DatePikerInput = (props: DatePikerInputProps) => {
  const [dateValue, setDateValue] = useState<Moment | null>(moment());

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        inputFormat={"YYYY-MM-DD"}
        value={dateValue}
        onChange={(newValue) => {
          setDateValue(newValue);
          props.onChangeDate(newValue?.format("YYYY-MM-DD").toString()!);
        }}
        renderInput={(params) => <TextField {...params} size={"small"} />}
      />
    </LocalizationProvider>
  );
};
