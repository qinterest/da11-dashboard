import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Space, Button } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import "./Welcome.css";
import bgvideo from "./bgvideo.mp4";

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <video autoPlay muted loop id="welcome-video">
          <source src={bgvideo} type="video/mp4" />
        </video>
        {/*<div className="welcome-logo">
          <a href="https://www.unescap.org/">
            <img
              src="https://www.unescap.org/sites/default/d8files/ESCAP-logo-master-white.png"
              alt="logo"
            />
          </a>
    </div>*/}
        <div className="content">
          <text className="headerTitle">Ocean accounts dashboard</text>
          <h2>A visualization tool for harmonizing, standardizing and structuring the ocean data</h2>
          <Space size="middle">
          <Link to="/uploadData">
            <Button
              danger
              // disabled
              type="primary"
              shape="round"
              icon={<UploadOutlined />}
              size="large"
            >
              Upload data
            </Button>
            </Link>
            <Link to="/example">
              <Button shape="round" icon={<SearchOutlined />} size="large">
                View example
              </Button>
            </Link>
          </Space>
        </div>
        {/*<div className="welcome-footer">
          <Space size="large" align="center">
            <div>© United Nations ESCAP</div>
            <a href="http://www.un.org/">UN Web Site</a>
            <a href="https://www.un.org/sustainabledevelopment/">SDGs</a>
            <a href="https://www.unescap.org/about/terms-of-use/">
              Terms of Use
            </a>
            <a href="https://www.unescap.org/about/fraud-alert">Fraud Alert</a>
          </Space>
        </div>*/}
      </div>
    );
  }
}
