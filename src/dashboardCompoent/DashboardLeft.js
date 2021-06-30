import React, { Component } from "react";
import { Menu, Button, Tooltip, Dropdown } from "antd";
import {
  CheckOutlined,
  PlusOutlined,
  ClearOutlined,
  DeleteOutlined,
  StrikethroughOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./DashboardLeft.css";
import "./DashboardMenu.js";
import DashboardMenu from "./DashboardMenu.js";
import DashboardDrawer from "./DashboardDrawer";

export default class DashboardLeft extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      visible: false,
    };
  }

  handleClick = (e) => {
    this.props.changeVar(e.key);
  };

  handleMenuClick = (e) => {
    this.props.clearVar(e.key);
  };

  //The following two functions are used to show/unshow drawer
  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  menuClear = (
    <Menu onClick={this.handleMenuClick} mode="inline">
      <Menu.Item key="clearAll" title={""} icon={<DeleteOutlined />}>
        Clear All
      </Menu.Item>
      <Menu.Item
        key="clearCompared"
        title={""}
        icon={<StrikethroughOutlined />}
      >
        Clear compared
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div calssName="leftside">
        <div
          className="logo"
          style={{
            height: "40px",
            "margin-left": "13px",
            "margin-right": "10px",
            "margin-top": "16px",
          }}
        />

        <DashboardMenu data={this.props.data} handleClick={this.handleClick} />

        <div className="sideButtons" style={{ padding: 5 }}>
          <Tooltip title="View selected" placement="right">
            <Button
              block
              className="sideButton"
              type="primary"
              icon={<CheckOutlined />}
              onClick={this.props.viewSelected}
            />
          </Tooltip>
          <Tooltip title="Add for comparison" placement="right">
            <Button
              block
              className="sideButton"
              icon={<PlusOutlined />}
              onClick={this.props.addSelected}
              disabled={this.props.noVis}
            />
          </Tooltip>
          <Tooltip title="Variable Info" placement="right">
            <Button
              block
              className="sideButton"
              icon={<InfoCircleOutlined />}
              onClick={this.showDrawer}
            />
            <DashboardDrawer
              data={this.props.data}
              selectVar={this.props.selectVar}
              onClose={this.onClose}
              visible={this.state.visible}
            />
          </Tooltip>
          <Dropdown overlay={this.menuClear}>
            <Button block className="sideButton" icon={<ClearOutlined />} />
          </Dropdown>
        </div>
      </div>
    );
  }
}
