import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import AppMenu from "./AppMenu";

const App = () => {
  return (
    <div className="LoveBits">
      <Router>
        <Routes />
        <AppMenu />
      </Router>
    </div>
  );
};

export default App;
