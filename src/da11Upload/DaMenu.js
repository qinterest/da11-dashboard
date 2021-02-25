import React from "react";
import { Menu } from "antd";
import { HomeOutlined, DollarOutlined, CloudOutlined } from "@ant-design/icons";
import "./Da11Left.css";

const { SubMenu } = Menu;

export default function DaMenu(props) {
  const data = props.data;
  const sub1 = data
    .filter((d) => d["Category"] === "Environment")
    .map((d) => (
      <Menu.Item key={d.key} title={d.Indicator}>
          {d.Indicator}
        </Menu.Item>
    ));

  const sub2 = data
    .filter((d) => d["Category"] === "Economic")
    .map((d) => (
      <Menu.Item key={d.key} title={d.Indicator}>
          {d.Indicator}
        </Menu.Item>
    ));

  const sub3 = data
    .filter((d) => d["Category"] === "Social")
    .map((d) => (
      <Menu.Item key={d.key} title={d.Indicator}>
          {d.Indicator}
        </Menu.Item>
    ));

  return (
    <Menu
      onClick={props.handleClick}
      defaultSelectedKeys={["Env0"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <CloudOutlined />
            <span className="menuTitle">Environmental</span>
          </span>
        }
      >
        {sub1}
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <DollarOutlined />
            <span className="menuTitle">Economic</span>
          </span>
        }
      >
        {sub2}
      </SubMenu>
      <SubMenu
        key="sub3"
        title={
          <span>
            <HomeOutlined />
            <span className="menuTitle">Social</span>
          </span>
        }
      >
        {sub3}
      </SubMenu>
    </Menu>
  );
}

//<Menu.Item key="var1-1" title={'Mangrove'}>Mangrove</Menu.Item>
