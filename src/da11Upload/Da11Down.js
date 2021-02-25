import React, { Component } from "react";
import "./Da11Down.css";
import DifferenceChart from "../charts/DifferenceChart";
import TimeseriesChart from "../charts/TimeSeries";

import { message, Select } from "antd";
const { Option } = Select;

export default class Da11Down extends Component {
  handleMode = (value) => {
    var info = value;
    message.info(`${info} view mode.`);
    this.props.changeView(value);
  };

  handleBase = (value) => {
    var info = value;
    message.info(`Visualization for ${info}`);
    this.props.changeCurrentYr(value);
  };

  handleCompared = (value) => {
    var info = value;
    message.info(`Compared to ${info}`);
    this.props.changeComparedYr(value);
  };

  selectItems = (cols, dataVis, width, height) => {
    let options = cols.map((col) => <Option value={col}>{col}</Option>);
    return (
      <div>
        <div className="selectBase" style={{ float: "right" }}>
          <Select
            defaultValue="2001"
            bordered={false}
            style={{ width: "100px" }}
            onChange={this.handleBase}
          >
            {options}
          </Select>
          Compared to
          <Select
            defaultValue="2001"
            bordered={false}
            style={{ width: "100px" }}
            onChange={this.handleCompared}
          >
            {options}
          </Select>
        </div>
        <div>
          <DifferenceChart dataVis={dataVis} width={width} height={height} />
        </div>
      </div>
    );
  };

  selectTime = (cols, dataVis, width, height) => {
    return (
      <div>
        <div className="selectBase" style={{ float: "right" }}></div>
        <div>
          <TimeseriesChart dataVis={dataVis} width={width} height={height} />
        </div>
      </div>
    );
  };

  render() {
    const dataVis = this.props,
      width = 1080,
      height = 250;

    const cols = this.props.cols;
    var viewSelect;
    if (this.props.viewMode === "Differences") {
      viewSelect = this.selectItems(cols, dataVis, width, height);
    } else {
      viewSelect = this.selectTime(cols, dataVis, width, height);
    }
    return (
      <div id="da11Down" style={{ padding: 5 }}>
        <div id="downTitle" style={{ padding: 5 }}>
          <text className="downTitle">Changes in accounts</text>
          <Select
            defaultValue="Time Series"
            bordered={false}
            style={{ width: "150px" }}
            onChange={this.handleMode}
          >
            <Option value="Differences">Differences</Option>
            <Option value="Time Series">Time Series</Option>
          </Select>
          {viewSelect}
        </div>
      </div>
    );
  }
}
