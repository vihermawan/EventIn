import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, BackTop, Row, Col, Button, Input, Dropdown, Menu, Icon, Tabs, Card } from 'antd';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/id';
import LoadingContainer from '../../../common/component/loading/loading-container'
import '../../../assets/css/event.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'

const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

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

class AllEventComponent extends Component {
    render() { 
        const {cardData,initialData,onDetailEvent,onStartLoadingHome ,onFinishLoadingHome} = this.props
        const image1 = require(`../../../assets/images/event-image1.png`);  
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                    onStartLoadingHome={onStartLoadingHome}
                    onFinishLoadingHome={onFinishLoadingHome}
                />
                <LoadingContainer loading={initialData.loadingHome}>
                    <Content style={{ overflow: "hidden" }}>
                        {/* Section 1 */}
                        <Row className="section-container" style={{marginBottom: 50, marginTop:50}}>
                            <Col lg={24}>
                                <span style={{marginLeft:'1%'}} className="text-soft-blue title-big-event bold">Semua Event</span>
                            </Col>
                            <Col lg={24} className="card-container">
                                <LoadingContainer loading={initialData.loading}>
                                    <Col lg={24} style={{minHeight: "300px"}}>
                                        <Row gutter={16}>
                                            {
                                            cardData.map( data =>
                                                <Col lg={6} md={12} sm={12} xs={24} className="mt-30">
                                                    <Card
                                                        hoverable
                                                        className="event-card-container"
                                                        cover={<img
                                                            alt="background event card"
                                                            src={data.foto}
                                                            style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}/>}
                                                    >
                                                    <Row>
                                                        <Col lg={12} md={12} sm={24} xs={12}>
                                                            <div className="text-black semi-bold"><Moment format="DD MMMM YYYY">{data.date}</Moment></div>
                                                        </Col>
                                                        <Col lg={12} md={12} sm={24} xs={12}>
                                                            <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                {data.price}
                                                            </span>
                                                        </Col>
                                                        <Col lg={24} className="mt-10">
                                                            <Link onClick={() => onDetailEvent(data.id)}><h2 className="text-soft-blue semi-bold">{data.title}</h2></Link>
                                                        </Col>
                                                        <Col lg={24}>
                                                            {data.place}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                            )}
                                        </Row>
                                    </Col>
                                </LoadingContainer>       
                            </Col>
                        </Row>
                        <BackTop />
                    </Content>
                    <Footer/>
                </LoadingContainer>
            </Layout>
        );
    }
}
export default AllEventComponent;