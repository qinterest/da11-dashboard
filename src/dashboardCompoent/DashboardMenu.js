import React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./DashboardLeft.css";

const { SubMenu } = Menu;

export default function DashboardMenu(props) {
  const data = props.data;
  let dataCat = data.map(function (d) {
    return d["Category"];
  });
  dataCat = [...new Set(dataCat)];

  let submenus = dataCat.map((cat,index) => (
    <SubMenu
      key={index}
      title={
        <span>
          <HomeOutlined />
          <span className="menuTitle">{cat}</span>
        </span>
      }
    >
      {props.data
        .filter((d) => d["Category"] === cat.toString())
        .map((d) => (
          <Menu.Item key={d.key} title={d.Indicator}>
            {d.Indicator}
          </Menu.Item>
        ))}
    </SubMenu>
  ));

  return (
    <Menu
      onClick={props.handleClick}
      defaultSelectedKeys={["data0"]}
      defaultOpenKeys={["0","1"]}
      mode="inline"
    >
      {submenus}
    </Menu>
  );
}