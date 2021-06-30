import React, { Component } from "react";
import "./App.less";
import { message, Layout } from "antd";
import DashboardHeader from "./dashboardCompoent/DashboardHeader";
import DashboardLeft from "./dashboardCompoent/DashboardLeft";
import DashboardDown from "./dashboardCompoent/DashboardDown";
import DashboardUp from "./dashboardCompoent/DashboardUp";
import * as d3 from "d3";

const { Header, Content, Sider, Footer } = Layout;

export default class AweDashboard extends Component {
  state = {
    data: [],
    geodata: [],
    columns: [], //indicating data time
    collapsed: false,
    viewMode: "Time Series",
    selectVar: "data0",
    viewVar: "",
    comparedVar: [],
    currentYr: "",
    comparedYr: "",
    noVis: true,
  };

  componentWillMount() {
    this.getCsvData();
  }

  async getCsvData() {
    let data = await d3.csv("QuangNinhData.csv").then(function (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].key = "data" + i.toString();
      }
      return data;
    }); // generate data key

    let forDeletion = ["Indicator", "Category", "Description", "Unit"];
    let cols = data.columns;
    cols = cols.filter((item) => !forDeletion.includes(item));

    let geoData = await d3.csv("QuangNinhGeoData.csv").then(function (data) {
      return data;
    });

    this.setState({
      data: data,
      columns: cols,
      geoData: geoData,
      currentYr: cols[0],
      comparedYr: cols[0]
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  changeView = (value) => {
    this.setState({
      viewMode: value,
    });
  };

  changeCurrentYr = (value) => {
    this.setState({
      currentYr: value,
    });
  };

  changeComparedYr = (value) => {
    this.setState({
      comparedYr: value,
    });
  };

  changeVar = (value) => {
    this.setState({
      selectVar: value,
    });
  };

  clearVar = (value) => {
    if (value.toString() === "clearAll".toString()) {
      // this.setState({
      //   viewVar: "data0",
      // });
      this.setState({
        comparedVar: [],
      });
      this.setState({
        noVis: true,
      });
      message.info(`Clear all.`);
    }
    if (value.toString() === "clearCompared") {
      const viewV = this.state.viewVar;
      let cv = [];
      if (viewV) {
        cv.push(viewV);
      }
      this.setState({
        comparedVar: cv,
      });

      message.info(`Clear compared variables.`);
    }
  };

  viewSelected = () => {
    const sv = this.state.selectVar;
    this.setState({
      viewVar: sv,
      noVis: false,
    });

    const viewObj = this.state.data.filter((d) => d.key === sv)[0];
    message.info(`View "${viewObj.Indicator}".`);

    let cv = [];
    if (!cv.includes(sv)) {
      cv.push(sv);
      this.setState({
        comparedVar: cv,
      });
    }
  };

  addSelected = () => {
    let cv = this.state.comparedVar;
    const sv = this.state.selectVar;
    if (!cv.includes(sv)) {
      cv.push(sv);
      this.setState({
        comparedVar: cv,
      });
      const viewObj = this.state.data.filter((d) => d.key === sv)[0];
      message.info(`Add "${viewObj.Indicator}" for comparision.`);
    }
  };

  render() {
    return (
      <Layout style={{ backgroundColor: "#e6fcff" }}>
        <Header
          style={{ height: 64, backgroundColor: "#009edb", paddingLeft: "8px" }}
        >
          <DashboardHeader />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.toggle}
            width={208}
            style={{ backgroundColor: "#ffffff" }}
          >
            <DashboardLeft
              noVis={this.state.noVis}
              changeVar={this.changeVar}
              clearVar={this.clearVar}
              viewSelected={this.viewSelected}
              addSelected={this.addSelected}
              selectVar={this.state.selectVar}
              data={this.state.data}
            />
          </Sider>
          <Layout>
            <Layout style={{ padding: "8px 8px 0 8px" }}>
              <Content style={{ height: 800, paddingRight: 8 }}>
                <Layout>
                  <Content style={{ height: 520, paddingDown: "8px" }}>
                    <div
                      className="site-layout-background"
                      style={{ minHeight: 510 }}
                    >
                      <DashboardUp
                        geodata={this.state.geoData}
                      />
                    </div>
                  </Content>
                  <Content style={{ height: 280 }}>
                    <div
                      className="site-layout-background"
                      style={{ minHeight: 280 }}
                    >
                      <DashboardDown
                        data={this.state.data.filter((d) =>
                            this.state.comparedVar.includes(d.key)
                          )}
                        cols={this.state.columns}
                        viewMode={this.state.viewMode}
                        changeView={this.changeView}
                        viewVar={this.state.viewVar}
                        comparedVar={this.state.comparedVar}
                        comparedYr={this.state.comparedYr}
                        currentYr={this.state.currentYr}
                        changeComparedYr={this.changeComparedYr}
                        changeCurrentYr={this.changeCurrentYr}
                      />
                    </div>
                  </Content>
                </Layout>
              </Content>
            </Layout>
            <Footer style={{ height: 24, textAlign: "center" }}>
              United Nations ESCAP ©2021
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
