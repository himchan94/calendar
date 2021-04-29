import React from "react";

import Main from "../pages/Main";

import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Main />
        {/* <Write /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
