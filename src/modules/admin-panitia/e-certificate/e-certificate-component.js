import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col } from 'antd';

// constant content
const { Content } = Layout;

class ECertificateComponent extends Component {
    render() { 
        return ( 
            <Content
                style={{
                    margin : "5px 10px 0px 10px",
                    padding: 15,
                    minHeight: 280,
                    borderRadius: "8px",
                }}
            >
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Dashboard CreateEvent</Breadcrumb.Item>
                </Breadcrumb>
                disini content isinya
            </Content>
        );
    }
}
 
export default ECertificateComponent;