import moment, { Moment } from "moment";

export const getFistSaturday = (date: Moment): string => {
  date.add(1, "month");
  date.date(1).day(6);

  return date.format("YYYY-MM-DD").toString();
};

export const getFormattedDate = (date?: string): string => {
  if (date) {
    return moment(date).isValid()
      ? moment(date).format("YYYY-MM-DD").toString()
      : date;
  } else return moment().format("YYYY-MM-DD").toString();
};
