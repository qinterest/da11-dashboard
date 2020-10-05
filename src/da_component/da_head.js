import React, { Component } from 'react';
import escap from '../escap.png';

import { Row, Col ,Typography ,Menu, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Title,Text } = Typography;
const menu = (
    <Menu style={{color: '#F2F2F2'}}>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">Scenario 2</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2020</a>
      </Menu.Item>
    </Menu>
  );

export default class Da_head extends Component {
    

    render() {
        return (
        <div>
          <img src={escap} style={{width: 130}} alt="ESCAP Logo" /> 
          <Text strong style={{fontSize:36, color:'#333333'}}>Ocean accounts for Quang Ninh, Vietnam</Text>
          <div style={{float:'right'}}>
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color: '#333333'}}>
                Scenario 1<DownOutlined />
                </a>
            </Dropdown>
          </div>
        </div>
        )
    }
}