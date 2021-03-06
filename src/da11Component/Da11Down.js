import React, { Component } from 'react';
import './Da11Down.css';
import DownChart from '../charts/DownChart';

import { message, Select} from 'antd';
const { Option } = Select;




export default class Da11Down extends Component {
    constructor(props) {
        super(props);
        this.handleClick  = this.handleClick.bind(this);
      };

    handleClick = (value) => {
        var info= (Number(value)===9999) ? 'Scenario 1': value;
        message.info(`Compared to ${info}`);
        this.props.changeComparedYr(value);
    };

    handleBase = (value) => {
        var info= (Number(value)===9999) ? 'Scenario 1': value;
        message.info(`Visualization for ${info}`);
        this.props.changeCurrentYr(value);
    };

    render() {
        const dataVis = this.props,
            width = 1080,
            height = 250;
        return (
            <div id='da11Down' style= {{padding:5}}> 
                <div id='downTitle' style= {{padding:5}}>
                    <text className='downTitle'>Changes in accounts</text>
                    <div className='selectBase' style={{float:'right'}}>
                    <Select defaultValue="2019" onChange={this.handleBase} bordered={false} style={{width: '100px'}}>
                            <Option value="2019">2018</Option>
                            <Option value="2010">2015</Option>
                            <Option value="9999">Scenario 1</Option>
                        </Select>
                        Compared to
                        <Select defaultValue="2010" onChange={this.handleClick} bordered={false} style={{width: '100px'}}>
                            <Option value="2019">2019</Option>
                            <Option value="2010">2015</Option>
                            <Option value="9999">Scenario 1</Option>
                        </Select>
                    </div>
                </div>
                <div>
                    <DownChart dataVis={dataVis} width={width} height={height}/>
                </div>
            </div>
        )
    }
}