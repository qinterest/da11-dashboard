import React, { Component } from "react";
import "./App.less";
import UploadData from "./UploadData";
import UploadDashboard from "./UploadDashboard";

import { HashRouter as Router, Route } from "react-router-dom";

export default class Upload extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/uploaddata" exact component={() => <UploadData />} />
          <Route path="/uploaddashboard" exact component={() => <UploadDashboard />} />
        </Router>
      </div>
    );
  }
}
