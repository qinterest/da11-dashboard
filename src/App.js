import React, { Component } from "react";
import "./App.less";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Welcome />} />
            <Route path="/example" exact component={() => <Dashboard />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
