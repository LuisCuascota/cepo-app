import React from "react";
import { EntryContainer } from "./containers/Entry/Entry";
import { Route, Routes } from "react-router-dom";
import { RoutesEnum } from "./shared/enums/routes.enum";
import { SimulatorContainer } from "./containers/Simulator/Simulator";
import { LoanContainer } from "./containers/Loan/Loan";
import { ListEntries } from "./containers/views/ViewEntry/ListEntries";
import { ListLoan } from "./containers/views/ViewLoan/ListLoan";

function App() {
  return (
    <Routes>
      <Route path={RoutesEnum.ENTRY} element={<EntryContainer />} />
      <Route path={RoutesEnum.SIMULATOR} element={<SimulatorContainer />} />
      <Route path={RoutesEnum.LOAN} element={<LoanContainer />} />
      <Route path={RoutesEnum.VIEW_ENTRY} element={<ListEntries />} />
      <Route path={RoutesEnum.VIEW_LOAN} element={<ListLoan />} />
    </Routes>
  );
}

export default App;
