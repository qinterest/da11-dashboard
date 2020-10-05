import React, { Component } from 'react';
import { Typography, Layout, Menu, Card, Col, Row} from 'antd';

const { Header, Content, Sider, Footer } = Layout;

const tabList = [
    {
      key: 'tab1',
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2',
    },
  ];
  
  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };
  

export default class Da_head extends Component {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
      };
    
      onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
      };

    render() {
        
        return (
        <Content>
            <Layout>
            <Row gutter={16}>
                <Col span={20}>
                <Content style={{padding:'1%'}}>
                    <Card style={{'font-family': "'Roboto', sans-serif"}}>
                        map
                    </Card>
                </Content>
                <Content style={{padding:'1%'}}>
                    <Card
                     style={{ width: '100%' }}
                     tabList={tabList}
                     activeTabKey={this.state.key}
                     onTabChange={key => {
                        this.onTabChange(key, 'key');
                        }
                     }
                    >
                    {contentList[this.state.key]}
                    </Card>
                </Content>
                </Col>
                <Col span={4} style={{'padding': '1%'}}>
                    <Card title="Accounts info" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>
            </Layout>
        <Footer style={{ textAlign: 'center' }}>ESCAP ©2018</Footer>
        </Content>
        )
    }
}