import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, BackTop, Row, Col, Button, Input, Dropdown, Menu, Icon, Tabs, Card } from 'antd';

import '../../../assets/css/event.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'


const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

const cardData = [
    {
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
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

class EventComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/event-image1.png`);
        const image2 = require(`../../../assets/images/event-image1.png`);
        const image3 = require(`../../../assets/images/event-image1.png`);
        
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                />
                <Content style={{ overflow: "hidden" }}>
                    {/* Section 1 */}
                    <Row className="section-container">
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24}>
                                    <div className="title-container">
                                        <span className="text-soft-blue title-biggest bold">Search</span>
                                        <br/>
                                        <span className="text-soft-blue title-big bold">place what do you want to go event.</span>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="image-hidden">
                                        <img
                                            src={image1}
                                            alt="Event 1"
                                            style={{maxWidth: '100%'}}
                                        />
                                    </div>
                                    <div className="description-container desc-big">
                                        Find anything event and place what you want in here...
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="button-section-1-container">
                                        <Search
                                            onSearch={value => console.log(value)}
                                            placeholder="Enter the location..."
                                            className ="button-search"
                                            style={{ width: 200 }}
                                        />
                                        <Dropdown 
                                            marginLeft={16}
                                            overlay={menu}>
                                            <Button>
                                                Category Event <Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-big-container">
                                <img
                                    src={image1}
                                    alt="Event 1"
                                    style={{maxWidth: '100%'}}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="section-container" style={{marginBottom: 50}}>
                        <Col lg={24}>
                            <span style={{marginLeft:'5%'}} className="text-soft-blue title-big-event bold">Event For You</span>
                        </Col>
                        <Col lg={24} className="card-container">
                        <Tabs style={{marginLeft:'5%', marginRight:'5%'}} defaultActiveKey="1">
                            <TabPane 
                                tab="All" key="1">
                                <Col lg={24}>
                                    <Row gutter={16}>
                                        {
                                            cardData.map( data =>
                                                <Col lg={6} md={12} sm={12} xs={24} className="mt-30">
                                                    <Card
                                                        hoverable
                                                        className="event-card-container"
                                                        cover={<img
                                                            alt="background event card"
                                                            src={data.image}
                                                            style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
                                                        />}>
                                                        <Row>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <div className="text-black semi-bold">{data.date}</div>
                                                            </Col>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                    {data.price}
                                                                </span>
                                                            </Col>
                                                            <Col lg={24} className="mt-10">
                                                                <Link to='/detail'><h2 className="text-soft-blue semi-bold">{data.title}</h2></Link>
                                                            </Col>
                                                            <Col lg={24}>
                                                                {data.lokasi}
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    </Row>

                                </Col>
                            </TabPane>
                            <TabPane tab="This Weekend" key="2">
                            <Col lg={24} className="card-container">
                                    <Row gutter={16}>
                                        {
                                            cardData.map( data =>
                                                <Col lg={6} md={12} sm={12} xs={24} className="mt-30">
                                                    <Card
                                                        hoverable
                                                        className="event-card-container"
                                                        cover={<img
                                                            alt="background event card"
                                                            src={data.image}
                                                            style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
                                                        />}
                                                    >
                                                        <Row>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <div className="text-black semi-bold">{data.date}</div>
                                                            </Col>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                    {data.price}
                                                                </span>
                                                            </Col>
                                                            <Col lg={24} className="mt-10">
                                                                <h2 className="text-soft-blue semi-bold">{data.title}</h2>
                                                            </Col>
                                                            <Col lg={24}>
                                                                {data.lokasi}
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    </Row>

                                </Col>
                            </TabPane>
                            <TabPane tab="Music" key="3">
                            <Col lg={24} className="card-container">
                                    <Row gutter={16}>
                                        {
                                            cardData.map( data =>
                                                <Col lg={6} md={12} sm={12} xs={24} className="mt-30">
                                                    <Card
                                                        hoverable
                                                        className="event-card-container"
                                                        cover={<img
                                                            alt="background event card"
                                                            src={data.image}
                                                            style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
                                                        />}
                                                    >
                                                        <Row>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <div className="text-black semi-bold">{data.date}</div>
                                                            </Col>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                    {data.price}
                                                                </span>
                                                            </Col>
                                                            <Col lg={24} className="mt-10">
                                                                <h2 className="text-soft-blue semi-bold">{data.title}</h2>
                                                            </Col>
                                                            <Col lg={24}>
                                                                {data.lokasi}
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    </Row>

                                </Col>
                            </TabPane>
                            <TabPane tab="Talkshow" key="4">
                            This Weekend
                            </TabPane>
                            <TabPane tab="Game" key="5">
                            This Weekend
                            </TabPane>
                            <TabPane tab="Food & Drink" key="6">
                            This Weekend
                            </TabPane>
                            <TabPane tab="Ospek" key="7">
                            This Weekend
                            </TabPane>
                        </Tabs>       
                        </Col>
                    </Row>
                    <Row className="section-container" style={{marginBottom: 50}}>
                        <Col lg={24}>
                            <span style={{marginLeft:'5%'}} className="text-soft-blue title-big-event bold">This Week</span>
                        </Col>
                        <Col lg={24} className="card-container" >
                            <Col lg={24} >
                                    <Row gutter={16} style={{marginLeft:'5%', marginRight:'5%'}}>
                                        {
                                            cardData.map( data =>
                                                <Col lg={6} md={12} sm={12} xs={24} className="mt-30">
                                                    <Card
                                                        hoverable
                                                        className="event-card-container"
                                                        cover={<img
                                                            alt="background event card"
                                                            src={data.image}
                                                            style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
                                                        />}
                                                    >
                                                        <Row>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <div className="text-black semi-bold">{data.date}</div>
                                                            </Col>
                                                            <Col lg={12} md={12} sm={24} xs={12}>
                                                                <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                    {data.price}
                                                                </span>
                                                            </Col>
                                                            <Col lg={24} className="mt-10">
                                                                <Link to='/detail'><h2 className="text-soft-blue semi-bold">{data.title}</h2></Link>
                                                            </Col>
                                                            <Col lg={24}>
                                                                {data.lokasi}
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    </Row>

                                </Col>
                        </Col>
                    </Row>
                    <BackTop />
                </Content>
                <Footer/>
            </Layout>
        );
    }
}
export default EventComponent;