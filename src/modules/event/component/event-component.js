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
import ButtonRounded from '../../../common/component/button/button-rounded'
import ButtonDashboard from '../../../common/component/button/button-dashboard';


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

class EventComponent extends Component {
    render() { 
        const {cardData,initialData,onDetailEvent,kategori, onTabChange,cardDataEventKategori,onStartLoadingHome ,onFinishLoadingHome, onEventKategori} = this.props
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
                        <Row className="section-container">
                            <Col lg={12} md={12} sm={12}>
                                <Row>
                                    <Col span={24}>
                                        <div className="title-container">
                                            <span className="text-soft-blue title-biggest bold">Temukan</span>
                                            <br/>
                                            <span className="text-soft-blue title-big bold">event sesuai hobimu</span>
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
                                            Temukan berbagai event terkeren dan terupdate...
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <div className="button-section-1-container-search">
                                            <Row>
                                                <Col lg={18} md={12} sm={12}>
                                                    <div className="button-search">
                                                        <Search
                                                            onSearch={value => console.log(value)}
                                                            placeholder="Pencarian..."
                                                            // style={{ width: 200 }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
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
                                <span style={{marginLeft:'2%'}} className="text-soft-blue title-big-event bold">Populer</span>
                            </Col>
                            <Col lg={24} className="card-container">
                                <Tabs style={{marginLeft:'2%', marginRight:'2%'}} defaultActiveKey="1" onChange={onTabChange}>
                                    <TabPane 
                                        tab="All" key="0">                              
                                        <LoadingContainer loading={initialData.loading}>
                                            <Col lg={24} style={{minHeight: "300px"}}>
                                                <Row gutter={[16,16]} type="flex">
                                                    {
                                                        cardData.map( data =>
                                                            <Col lg={6} md={12} sm={12} xs={24}>
                                                                <Card
                                                                    hoverable
                                                                    className="event-card-container"
                                                                    cover={<img
                                                                        alt="background event card"
                                                                        src={data.foto}
                                                                        style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
                                                                    />}
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
                                                        )
                                                    }
                                                </Row>
                                                <Row>
                                                    <Col span={24} >
                                                        <div className="tombol-tengah button-section-1-container" style={initialData.countEvent < 17 ? {display:"none"}:{display:"block"}}>
                                                            <Link to="/allevent">
                                                                <ButtonRounded
                                                                    text="Semua Event"
                                                                    className='button-participate'
                                                                />
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </LoadingContainer>
                                    </TabPane>
                                    {
                                    kategori.map( data =>
                                    <TabPane tab={data.kategori} key={data.id_kategori}>
                                            <LoadingContainer loading={initialData.loading}>
                                            <Col lg={24} style={{minHeight: "300px"}}>
                                                <Row gutter={16}>
                                                    {
                                                        cardDataEventKategori.map( data =>
                                                            <Col lg={6} md={12} sm={12} xs={24} className="mt-30">
                                                                <Card
                                                                    hoverable
                                                                    className="event-card-container"
                                                                    cover={<img
                                                                        alt="background event card"
                                                                        src={data.foto}
                                                                        style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
                                                                    />}
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
                                                        )
        
                                                    }
                                                </Row>
                                                <Row>
                                                    <Col span={24} >
                                                        <div className="tombol-tengah button-section-1-container" style={initialData.countEvent < 1 ? {display:"none"}:{display:"block"}}>
                                                                <ButtonDashboard
                                                                    text="Semua Event"
                                                                    className='button-participate'
                                                                    onClick={() => onEventKategori(data.id_kategori)}
                                                                />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </LoadingContainer>
                                    </TabPane>
                                    )}
                                </Tabs>       
                            </Col>
                        </Row>
                        <Row className="section-container" style={{marginBottom: 50}}>
                            <Col lg={24}>
                                <span style={{marginLeft:'2%'}} className="text-soft-blue title-big-event bold">Minggu ini</span>
                            </Col>
                            <Col lg={24} className="card-container" >
                                <Col lg={24} >
                                        <Row gutter={[16,16]} style={{marginLeft:'2%', marginRight:'2%'}} type="flex">
                                            {
                                                cardData.map( data =>
                                                    <Col lg={6} md={12} sm={12} xs={24} className="mt-30">
                                                        <Card
                                                            hoverable
                                                            className="event-card-container"
                                                            cover={<img
                                                                alt="background event card"
                                                                src={data.foto}
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
                                                                    {data.place}
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
                        <Row>
                            <Col span={24} >
                                <div className="tombol-tengah button-section-1-container" style={initialData.countEvent < 17 ? {display:"none"}:{display:"block"}}>
                                    <Link to="/allevent">
                                        <ButtonRounded
                                            text="Semua Event"
                                            className='button-participate'
                                        />
                                    </Link>
                                </div>
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
export default EventComponent;