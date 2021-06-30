import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom"

import "./App.less";
import { message, Layout } from "antd";
import DashboardHeader from "./dashboardCompoent/DashboardHeader";
import DashboardLeft from "./dashboardCompoent/DashboardLeft";
import DashboardDown from "./dashboardCompoent/DashboardDown";
import DashboardUp from "./dashboardCompoent/DashboardUp";
import * as d3 from "d3";
// import { set } from "ol/transform";

function AweDashboard(props) {
  const { Header, Content, Sider, Footer } = Layout;

  const [data, setdata] = useState([]);
  const [geodata, setgeodata] = useState([]);
  const [geofile, setgeofile] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [collapsed, setcollapsed] = useState(false);
  const [viewMode, setviewMode] = useState("Time Series");
  const [selectVar, setselectVar] = useState("data0");
  const [viewVar, setviewVar] = useState('');
  const [comparedVar, setcomparedVar] = useState([]);
  const [currentYr, setcurrentYr] = useState('');
  const [comparedYr, setcomparedYr] = useState('');
  const [noVis, setnoVis] = useState(true);

  const getCsvData = async () => {

    // let data =JSON.parse(sessionStorage.getItem('data')).map(function (d,index) {
    //   d.key = "data" + index.toString();
    //   return d;
    // });
    // let forDeletion = ["Indicator", "Category", "Description", "Unit", "key"];
    // let cols=data.map((d) => (Object.keys(d))).flat();
    // cols = [...new Set(cols)];
    // cols = cols.filter((item) => !forDeletion.includes(item));

    // let geofile = JSON.parse(sessionStorage.getItem('geofile'));

    let data = await d3.csv("QuangNinhData.csv").then(function (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].key = "data" + i.toString();
      }
      return data;
    }); // generate data key

    let forDeletion = ["Indicator", "Category", "Description", "Unit"];
    let cols = data.columns;
    cols = cols.filter((item) => !forDeletion.includes(item));

    setdata(data);
    setcolumns(cols);
    setgeofile(geofile);
    setcurrentYr(cols[0]);
    setcomparedYr(cols[0]);
  };

  const toggle = () => {
    setcollapsed(!collapsed)
  };

  const changeView = (value) => {
    setviewMode(value)
  };

  const changeCurrentYr = (value) => {
    setcurrentYr(value)
  };

  const changeComparedYr = (value) => {
    setcomparedYr(value)
  };

  const changeVar = (value) => {
    setselectVar(value)
  };

  const clearVar = (value) => {
    if (value.toString() === "clearAll".toString()) {
      setcomparedVar([])
      setnoVis(true)
      message.info(`Clear all.`);
    }
    if (value.toString() === "clearCompared") {
      const viewV = viewVar;
      let cv = [];
      if (viewV) {
        cv.push(viewV);
      }
      setcomparedVar(cv)

      message.info(`Clear compared variables.`);
    }
  };

  const viewSelected = () => {
    const sv = selectVar;

    setviewVar(sv)
    setnoVis(false)

    const viewObj = data.filter((d) => d.key === sv)[0];
    message.info(`View "${viewObj.Indicator}".`);

    let cv = [];
    if (!cv.includes(sv)) {
      cv.push(sv);
      setcomparedVar(cv)
    }
  };

  const addSelected = () => {
    let cv = comparedVar;
    const sv = selectVar;
    if (!cv.includes(sv)) {
      cv.push(sv);
      setcomparedVar(cv)
      const viewObj = data.filter((d) => d.key === sv)[0];
      message.info(`Add "${viewObj.Indicator}" for comparision.`);
    }
  };

  useEffect(()=>{
    getCsvData()
  },[]);

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
          collapsed={collapsed}
          onCollapse={toggle}
          width={208}
          style={{ backgroundColor: "#ffffff" }}
        >
          <DashboardLeft
            noVis={noVis}
            changeVar={changeVar}
            clearVar={clearVar}
            viewSelected={viewSelected}
            addSelected={addSelected}
            selectVar={selectVar}
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
                    <DashboardUp
                      geodata={geodata}
                      geofile={geofile}
                    />
                  </div>
                </Content>
                <Content style={{ height: 280 }}>
                  <div
                    className="site-layout-background"
                    style={{ minHeight: 280 }}
                  >
                    <DashboardDown
                      data={data.filter((d) =>
                          comparedVar.includes(d.key)
                        )}
                      cols={columns}
                      viewMode={viewMode}
                      changeView={changeView}
                      viewVar={viewVar}
                      comparedVar={comparedVar}
                      comparedYr={comparedYr}
                      currentYr={currentYr}
                      changeComparedYr={changeComparedYr}
                      changeCurrentYr={changeCurrentYr}
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
};

export default AweDashboard;
