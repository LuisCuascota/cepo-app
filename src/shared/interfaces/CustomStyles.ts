import { SxProps } from "@mui/material";

interface InlineStyle {
  [k: string]: React.CSSProperties;
}

export interface CustomStyles {
  [k: string]: React.CSSProperties | InlineStyle | SxProps;
}
