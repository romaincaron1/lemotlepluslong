import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";
import { transitions, positions, Provider as AlertProvider, types } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./styles/main.scss";

import Home from "./pages/home";
import Play from "./pages/play";

const options = {
  position: positions.BOTTOM_CENTER,
  offset: "10px",
  timeout: 10000,
  transition: transitions.FADE,
  containerStyle: {
    innerWidth: "400px"
  }
};

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <Router>
      <div>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/play/:names" component={Play} />
        </main>
      </div>
    </Router>
  </AlertProvider>
);

render(<Root />, document.getElementById('root'));