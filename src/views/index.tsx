import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import AuthProvider from "./components/Auth/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import './assets/styles/global.scss';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
