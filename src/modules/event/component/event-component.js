import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';

import Navbar from '../../../common/layout/navbar-landing'

const { Content } = Layout;

class EventComponent extends Component {
    render() {
        return ( 
            <Layout className="landing-container">
                <Navbar />
                <Content style={{ overflow: "hidden" }}>
                    
                    <BackTop />
                </Content>
            </Layout>
        );
    }
}
 
export default EventComponent;