import React, { Component } from "react";
import { Link } from "react-router-dom";
import CSVReader from "react-csv-reader";
import { Table, Button } from "antd";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
};

export default class UploadData extends Component {
  state = {
    dashdata: [],
    dashcols: [],
  };

  handleForce = (data, fileInfo) => {
    const datakeys = Object.keys(data[0]);
    var dashcols = [];
    var dashdata = [];

    for (let i = 0; i < datakeys.length; i++) {
      dashcols.push({
        title: datakeys[i],
        dataIndex: datakeys[i],
        key: datakeys[i],
      });
    }

    for (let i = 0; i < data.length; i++) {
      data[i].keys = (i + 1).toString();
      dashdata.push(data[i]);
    }

    this.setState({
      dashdata: dashdata,
      dashcols: dashcols,
    });

    console.log(dashdata);
  };

  render() {
    var data = {id:3,name:"sam",age:36};
    var path = {
      pathname:'/uploadDashboard',
      state:data,
    };
    return (
      <container>

        <CSVReader
          cssClass="react-csv-input"
          label="Upload geojson"
          onFileLoaded={(data, fileInfo) => console.dir('hello')}
          onError={null}
        />
        <CSVReader
          cssClass="react-csv-input"
          label="Upload your data"
          onFileLoaded={this.handleForce}
          parserOptions={papaparseOptions}
        />
        <Table columns={this.state.dashcols} dataSource={this.state.dashdata} />

        <Link
          to={path}
        >
          <Button shape="round" size="large">
            Visualize it!
          </Button>
        </Link>
      </container>
    );
  }
}
