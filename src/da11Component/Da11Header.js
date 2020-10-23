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
                <text className='headerTitle'>Ocean accounts dashboard</text>
            </div>
            
        )
    }
}