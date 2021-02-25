import React, { Component } from "react";
import { Drawer } from "antd";

export default class Da11Left extends Component {
  render() {
    const selectObj = this.props.data.filter(
      (d) => d.key.toString() === this.props.selectVar
    )[0];

    const drawerContent = ({ title, content }) => <h1>{title}</h1>;

    return (
      <Drawer
        placement="right"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <h1>{selectObj.name}</h1>
        <img alt="drawer-img" src={selectObj.contentimage} />
        <p>{selectObj.content}</p>
      </Drawer>
    );
  }
}
