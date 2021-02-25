import React, { Component } from "react";
import "./App.less";
import Dashboard from "./Dashboard";
import UploadData from "./UploadData";
import UploadDashboard from "./UploadDashboard";
import Welcome from "./Welcome";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Welcome />} />
            <Route path="/example" exact component={() => <Dashboard />} />
            <Route path="/uploadData" exact component={() => <UploadData />} />
            <Route path="/uploadDashboard" exact component={() => <UploadDashboard />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
