import { Grid, Paper } from "@mui/material";
import { EntryHeader } from "./components/EntryHeader/EntryHeader";
import { EntryDetail } from "./components/EntryDetail/EntryDetail";
import { EntryFooter } from "./components/EntryFooter/EntryFooter";

export const EntryContainer = () => {
  return (
    <Paper elevation={2}>
      <Grid container spacing={1}>
        <Grid item md={12}>
          <EntryHeader />
        </Grid>
        <Grid item md={12}>
          <EntryDetail />
        </Grid>
        <Grid item md={12}>
          <EntryFooter />
        </Grid>
      </Grid>
    </Paper>
  );
};
