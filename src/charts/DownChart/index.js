import React, { PureComponent } from "react";
import draw from "./vis";

export default class DownChart extends PureComponent {
  componentDidMount() {
      draw(this.props);
  }

  componentDidUpdate(preProps) {
      draw(this.props);
  }

  render() {
    return <div className="vis-down" style={{ display: "inline-block" }} />;
  }
}
