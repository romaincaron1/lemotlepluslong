import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./styles/main.scss";

import Home from "./pages/home";
import Play from "./pages/play";
import End from "./pages/end";

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
          <Route path="/play/:gamemode/:names" component={Play} />
          <Route path="/end/:winner" component={End} />
        </main>
      </div>
    </Router>
  </AlertProvider>
);

render(<Root />, document.getElementById('root'));