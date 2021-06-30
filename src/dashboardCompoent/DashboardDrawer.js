import React, { Component } from "react";
import { Drawer } from "antd";
import "./DashboardLeft.css";

export default class DashboardDrawer extends Component {
  render() {
    const selectObj = this.props.data.filter(
      (d) => d.key.toString() === this.props.selectVar
    )[0];

    return (
      <Drawer
        placement="right"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <h1>{selectObj ? selectObj.Indicator : ''}</h1>
        <p>{selectObj ? selectObj.Description : ''}</p>
      </Drawer>
    );
  }
}
