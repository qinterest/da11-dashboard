import React, { Component } from "react";
import { Link } from "react-router-dom";
// import CSVReader from "react-csv-reader";
import * as d3 from "d3";
import { Upload, message, Table, Button, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./UploadData.css";

// const papaparseOptions = {
//   header: true,
//   dynamicTyping: true,
//   skipEmptyLines: true,
// };

export default class UploadData extends Component {
  state = {
    csvlist: [],

    dashdata: [],
    dashcols: [],

    data: "",
    columns: [],

    geofile: [],

    ready: false,
  };

  // handleForce = (data, fileInfo) => {
  //   const datakeys = Object.keys(data[0]);
  //   var dashcols = [];
  //   var dashdata = [];

  //   for (let i = 0; i < datakeys.length; i++) {
  //     dashcols.push({
  //       title: datakeys[i],
  //       dataIndex: datakeys[i],
  //       key: datakeys[i],
  //     });
  //   }

  //   for (let i = 0; i < data.length; i++) {
  //     dashdata.push(data[i]);
  //   }

  //   this.setState({
  //     dashdata: dashdata,
  //     dashcols: dashcols,
  //   });

  //   sessionStorage.setItem("data", JSON.stringify(data));
  // };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  handleChange = (info) => {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handlecsvChange = (info) => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    this.setState({
      csvlist: fileList,
    });
  };

  beforeUpload = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let geofile = this.state.geofile;
      let name = file.name.replace(".geojson", "");
      let url = reader.result;
      let gf = {
        name: name,
        url: url,
      };
      geofile.push(gf);
      this.setState({
        geofile: geofile,
      });
    };
  };

  getCsvData = async (url) => {
    let dataOri = await d3.csv(url).then(function (data) {
      var dashcols = [];
      var dashdata = [];

      var defaultcols = ["Indicator", "Category", "Description"];

      let cols = data.map((d) => Object.keys(d)).flat();
      cols = [...new Set(cols)];
      cols = cols.filter((item) => !defaultcols.includes(item));

      for (let i = 0; i < defaultcols.length; i++) {
        dashcols.push({
          title: defaultcols[i],
          dataIndex: defaultcols[i],
          key: defaultcols[i],
        });
      }

      for (let i = 0; i < cols.length; i++) {
        dashcols.push({
          title: cols[i],
          dataIndex: cols[i],
          key: cols[i],
        });
      }

      for (let i = 0; i < data.length; i++) {
        dashdata.push(data[i]);
      }

      for (let i = 0; i < data.length; i++) {
        data[i].key = "data" + i.toString();
      }
      return { data: data, dashdata: dashdata, dashcols: dashcols };
    });

    const { dashdata, dashcols } = dataOri;

    this.setState({
      dashdata: dashdata,
      dashcols: dashcols,
    });

    const { data } = dataOri;
    let forDeletion = ["Indicator", "Category", "Description", "Unit", "key"];
    let cols = data.map((d) => Object.keys(d)).flat();
    cols = [...new Set(cols)];
    cols = cols.filter((item) => !forDeletion.includes(item));

    this.setState({
      data: data,
      columns: cols,
      ready:false,
    });
    if (data[0].Indicator && data[0].Category){
      this.setState({
        ready:true,
      })
    }
    
  };

  beforUploadcsv = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let url = reader.result;
      this.getCsvData(url);
    };
  };

  note = () => {
    return (
      <div class="note">
        <h1>How to upload data for ESCAP Ocean Accounting Dashboard?*</h1>
        <ol>
          <li>
            Upload tabular data (.csv, time series ocean accounting data). The
            csv file SHOULD include a header (The elements in the first row
            should be the field (column) labels). The csv file SHOULD at least
            have these columns:
            <ul>
              <li>
                Indicator (exact same field label). The names of the ocean
                accounts (e.g. Marine fishing, ecosystem services).
              </li>
              <li>
                Category (exact same field label). The category of the ocean
                accounts (e.g. environmental, economic, social).
              </li>
              <li>
                Description (exact same field label, optional). The
                description of the ocean accounts.
              </li>
              <li>
                Other columns should be named by time (e.g., 1994, 2000s,
                2030-project).{" "}
              </li>
            </ul>
            Preview of the csv file would show up when upload is finished. Download example file{" "}
            <a
              href="ExampleTabularData.csv"
              style={{
                color: "#1A9EFC",
              }}
              download
            >
              here
            </a>
            .
          </li>
          <li>
            (optional) Upload geographical data (.geojson). The GeoJSON file
            should be named clearly (e.g. Mangrove-2010, Ports, TN-1995).
          </li>
          <li>
            Click <Tag color="#2db7f5">Visualize it!</Tag> button. (This button
            will show up when uploaded tabular data are properly formatted.)
          </li>
        </ol>
        Browser compatibility of the Ocean Accounting Dashboard:
        <ul>
          <li>Google Chrome (√) </li>
          <li>Microsoft Edge (√) </li>
          <li style={{color:"red"}}>Mozilla Firefox (X)</li>
        </ul>
        <p style={{ "font-size": "12px" }}>
          *This is still a beta version. Please contact{" "}
          <a
            href="mailto:maoqi@pku.edu.cn"
            style={{
              color: "#1A9EFC",
              "font-size": "12px",
              "font-weight": "bold",
            }}
          >
            us
          </a>
          . We are grateful for your feedback.
        </p>
      </div>
    );
  };

  visualBtn = (path) => {
    return (
      <Link to={path}>
        <Button size="large" type="primary" block>
          Visualize it!
        </Button>
      </Link>
    );
  };

  render() {
    const props = {
      name: "file",
      accept: ".geojson,",
      onChange: this.handleChange,
      customRequest: this.dummyRequest,
      beforeUpload: this.beforeUpload,
    };

    const propscsv = {
      name: "file",
      maxCount: 1,
      accept: ".csv,",
      onChange: this.handlecsvChange,
      customRequest: this.dummyRequest,
      beforeUpload: this.beforUploadcsv,
      fileList: this.state.csvlist,
    };

    var path = {
      pathname: "/uploadDashboard",
      state: {
        geofile: this.state.geofile,
        data: this.state.data,
        columns: this.state.columns,
      },
    };

    return (
      <container>
        {this.note()}
        <Upload {...propscsv}>
          <Button size="large" icon={<UploadOutlined />} block>
            Click to Upload tabular data (CSV)
          </Button>
        </Upload>
        <Upload {...props}>
          <Button size="large" icon={<UploadOutlined />}>
            Click to Upload geographical data (GeoJSON)
          </Button>
        </Upload>
        <Table columns={this.state.dashcols} dataSource={this.state.dashdata} />
        {this.state.ready ? this.visualBtn(path) : ""}
      </container>
    );
  }
}