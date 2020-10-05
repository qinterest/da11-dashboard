import React, { Component } from 'react';
//import { Typography } from 'antd';
import './Da11Header.css';

import { message, Select} from 'antd';
const { Option } = Select;



//onst { Title } = Typography;


export default class Da11Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick  = this.handleClick.bind(this);
      };

    handleClick = (value) => {
        var info= (Number(value)===9999) ? 'Scenario 1': value;
        message.info(`Visualization for ${info}`);
        this.props.changeCurrentYr(value);
    };

    render() {
        return (
            <div>
                <text className='headerTitle'>Ocean accounts for Quang Ninh, Vietnam</text>
                <div className='selectCurrent' style={{float:'right'}} >
                        <Select defaultValue="2019" onChange={this.handleClick} size='large' bordered={false} style={{color: '#F2F2F2', width: '100px',fontSize:'18px'}} showArrow={false}>
                            <Option value="2019">2019</Option>
                            <Option value="2010">2010</Option>
                            <Option value="9999">Scenario 1</Option>
                        </Select>
                </div>
            </div>
            
        )
    }
}