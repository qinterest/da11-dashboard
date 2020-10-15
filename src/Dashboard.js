import React, { Component } from "react";
import "./App.less";
import { message, Layout } from "antd";
import Da11Header from "./da11Component/Da11Header";
import Da11Left from "./da11Component/Da11Left";
import Da11Down from "./da11Component/Da11Down";
import Da11Up from "./da11Component/Da11Up";
import testData from "./data/test_data.js";
// import { generate, presetPalettes } from '@ant-design/colors';
// const colorPlatte = generate('#009edb');

const { Header, Content, Sider, Footer } = Layout;
const data = testData;

export default class Dashboard extends Component {
  state = {
    collapsed: false,
    selectVar: "",
    viewVar: "",
    comparedVar: [],
    currentYr: "2019",
    comparedYr: "2010",
    noVis: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
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

    const viewObj = data.filter((d) => d.key.toString() === sv)[0];
    message.info(`View ${viewObj.name}`);

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
      const viewObj = data.filter((d) => d.key.toString() === sv)[0];
      message.info(`Add ${viewObj.name} for comparision`);
    }
  };

  render() {
    return (
      <Layout style={{ backgroundColor: "#e6fcff" }}>
        <Header
          style={{ height: 64, backgroundColor: "#009edb", paddingLeft: "8px" }}
        >
          <Da11Header changeCurrentYr={this.changeCurrentYr} />
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
              data={data}
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
                      <Da11Up viewVar={this.state.viewVar} />
                    </div>
                  </Content>
                  <Content style={{ height: 280 }}>
                    <div
                      className="site-layout-background"
                      style={{ minHeight: 280 }}
                    >
                      <Da11Down
                        viewVar={this.state.viewVar}
                        comparedVar={this.state.comparedVar}
                        comparedYr={this.state.comparedYr}
                        currentYr={this.state.currentYr}
                        changeComparedYr={this.changeComparedYr}
                        data={data.filter((d) =>
                          this.state.comparedVar.includes(d.key)
                        )}
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
