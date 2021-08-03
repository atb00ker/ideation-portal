import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import ApolloProvider from "./components/GraphQL/ApolloProvider";
import AuthProvider from "./components/Auth/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import TopicAdd from "./pages/TopicAdd/TopicAdd";
import TopicDetails from "./pages/TopicDetails/TopicDetails";
import './index.scss';

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/topic/:uuid" render={(props) => <TopicDetails {...props} />} />
            <Route path="/topic/" component={TopicAdd} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
