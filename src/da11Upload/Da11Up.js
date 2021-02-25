import React, { Component } from "react";
import Da11Map from "../charts/Da11Map";

export default class Da11Up extends Component {
  render() {
    const dataVis = this.props;
    return <Da11Map dataVis={dataVis} />;
  }
}
