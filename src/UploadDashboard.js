import React, { Component } from "react";
import "./App.less";
import { message, Layout } from "antd";
import Da11Header from "./da11Upload/Da11Header";
import Da11Left from "./da11Upload/Da11Left";
import Da11Down from "./da11Upload/Da11Down";
import Da11Up from "./da11Upload/Da11Up";
import * as d3 from "d3";

const { Header, Content, Sider, Footer } = Layout;

export default class UploadDashboard extends Component {
  state = {
    data: [],
    columns: [],
    collapsed: false,
    viewMode: "Time Series",
    selectVar: "Env0",
    viewVar: "",
    comparedVar: [],
    currentYr: "2001",
    comparedYr: "2001",
    noVis: true,
  };

  componentWillMount() {
    this.getCsvData();
  }

  async getCsvData() {
    let csvData = await d3.csv("TestData.csv").then(function (data) {
      var envIx = 0,
        ecoIx = 0,
        socIx = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i]["Category"] === "Economic") {
          data[i].key = "Eco" + envIx.toString();
          ecoIx++;
        }
        if (data[i]["Category"] === "Environment") {
          data[i].key = "Env" + envIx.toString();
          envIx++;
        }
        if (data[i]["Category"] === "Social") {
          data[i].key = "Soc" + envIx.toString();
          socIx++;
        }
      }
      return data;
    });

    this.setState({
      data: csvData,
    });
    console.log(csvData);
    var cols = csvData.columns;
    var delIndex = cols.indexOf("Category");
    cols.splice(delIndex, 1);
    delIndex = cols.indexOf("Indicator");
    cols.splice(delIndex, 1);

    this.setState({
      columns: cols,
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
      this.setState({
        viewVar: "",
      });
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
    message.info(`View ${viewObj.Indicator}`);

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
      message.info(`Add ${viewObj.Indicator} for comparision`);
    }
  };

  render() {
    return (
      <Layout style={{ backgroundColor: "#e6fcff" }}>
        <Header
          style={{ height: 64, backgroundColor: "#009edb", paddingLeft: "8px" }}
        >
          <Da11Header />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.toggle}
            width={208}
            style={{ backgroundColor: "#ffffff" }}
          >
            <Da11Left
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
                      <Da11Up />
                    </div>
                  </Content>
                  <Content style={{ height: 280 }}>
                    <div
                      className="site-layout-background"
                      style={{ minHeight: 280 }}
                    >
                      <Da11Down
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
              United Nations ESCAP ©2020
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
