import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import AuthProvider from "./components/Auth/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import ApolloProvider from "./components/GraphQL/ApolloProvider";
import './assets/styles/global.scss';

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
