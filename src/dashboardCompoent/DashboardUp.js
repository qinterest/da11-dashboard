import React, { Component } from "react";
import MapChart from "./dashboardCharts/MapChart";

export default class DashboardUp extends Component {
  render() {
    const geodata = this.props.geodata;
    const geofile = this.props.geofile;
    return <MapChart geodata={geodata} geofile={geofile} />;
  }
}
