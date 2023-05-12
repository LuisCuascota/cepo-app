import React from "react";
import { EntryContainer } from "./containers/Entry/Entry";
import { Route, Routes } from "react-router-dom";
import { RoutesEnum } from "./shared/enums/routes.enum";
import { SimulatorContainer } from "./containers/Simulator/Simulator";
import { LoanContainer } from "./containers/Loan/Loan";

function App() {
  return (
    <Routes>
      <Route path={RoutesEnum.ENTRY} element={<EntryContainer />} />
      <Route path={RoutesEnum.SIMULATOR} element={<SimulatorContainer />} />
      <Route path={RoutesEnum.LOAN} element={<LoanContainer />} />
    </Routes>
  );
}

export default App;
