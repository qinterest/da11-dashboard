import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Welcome extends Component {
  render() {
    return (
      <div className='welcome'>
        <p>logo</p>
        <p>title</p>
        <p>footer</p>
        <Link to="/example">Example</Link>
      </div>
    );
  }
}
