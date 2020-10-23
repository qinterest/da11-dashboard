import React, { PureComponent } from "react";
import draw from "./vis";
import "./style.css";

export default class DownChart extends PureComponent {
  componentDidMount() {
    draw(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataVis.viewVar !== prevProps.dataVis.viewVar) {
      draw(this.props);
    }
  }

  render() {
    return <div id="map" className="map" style={{ display: "inline-block" }} />;
  }
}
