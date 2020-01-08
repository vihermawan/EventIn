import React, { Component } from 'react';
import { Layout, BackTop, Row, Col, Button, Input, Dropdown, Menu, Icon, Tabs } from 'antd';
import '../../../assets/css/registered.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'


const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

const cardData = [
    {
        image: require(`../../../assets/images/ava.png`),
        title: 'Organizer',
        description: 'Organizer make an event with funtastic, so wanna be organizer ?'
    }
]

const benefitData = [
    {
        image: require(`../../../assets/images/benefit-1.png`),
        title: 'Tracking',
        description: 'Organizer can tracks how much participant join their events'
    },
    {
        image: require(`../../../assets/images/benefit-2.png`),
        title: 'E-Certificate',
        description: 'Participant can get e-certificate when he done join event'
    },
    {
        image: require(`../../../assets/images/benefit-3.png`),
        title: 'Paperless',
        description: 'Organizer can take signatured with signer just by system'
    },
    {
        image: require(`../../../assets/images/benefit-4.png`),
        title: 'Simplifying',
        description: 'Organize your event, and make your events more good'
    },
    {
        image: require(`../../../assets/images/benefit-5.png`),
        title: 'Newst Event',
        description: 'Participant can seacrh event nearby his location anything event what he wants'
    },
    {
        image: require(`../../../assets/images/benefit-6.png`),
        title: 'Both Time',
        description: 'Everypeople can join to be a participant or organizer'
    },
    
]

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

class RegisteredComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/event-image1.png`);
        const image2 = require(`../../../assets/images/event-image1.png`);
        const image3 = require(`../../../assets/images/event-image1.png`);
        
        return ( 
            <Layout className="landing-container-event">
                <Navbar
                    navigate={this.props.navigate}
                />
                <Content style={{ overflow: "hidden" }}>
                <Row gutter={24} type="flex" justify="center">
                                {
                                    cardData.map( data =>
                                        <Col lg={24} className="text-align-center card-container2">
                                            <div className="card-content2">
                                                <img src={data.image} alt="organizer" className="card-image2"/>
                                                <div className="text-black semi-bold card-title">
                                                    {data.title}
                                                </div>
                                                <div className="card-description">
                                                    {data.description}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                    <BackTop />
                </Content>
                <Footer/>
            </Layout>
        );
    }
}
export default RegisteredComponent;