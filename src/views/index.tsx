import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/home";
import Navbar from "./components/Navbar/navbar";
import './assets/styles/global.scss';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
