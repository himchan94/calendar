import React from "react";

import Main from "../pages/Main";
import Write from "../pages/Write";

import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <BrowserRouter>
          <Route path="/" exact component={Main} />
          <Route path="/write" exact component={Write} />
        </BrowserRouter>
      </BrowserRouter>
    </div>
  );
};

export default App;
