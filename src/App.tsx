import React from "react";
import { Container } from "@mui/material";
import { EntryContainer } from "./containers/Entry/Entry";

function App() {
  return (
    <div className="App">
      <Container fixed>
        <EntryContainer />
      </Container>
    </div>
  );
}

export default App;
