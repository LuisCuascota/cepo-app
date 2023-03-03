import React from "react";
import { EntryContainer } from "./containers/Entry/Entry";
import { Route, Routes } from "react-router-dom";
import { RoutesEnum } from "./shared/enums/routes.enum";
import { SimulatorContainer } from "./containers/Simulator/Simulator";

function App() {
  return (
    <Routes>
      <Route path={RoutesEnum.ENTRY} element={<EntryContainer />} />
      <Route path={RoutesEnum.SIMULATOR} element={<SimulatorContainer />} />
    </Routes>
  );
}

export default App;
