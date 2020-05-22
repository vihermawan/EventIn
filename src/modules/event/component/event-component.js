import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, BackTop, Row, Col, Input, Tabs, Card, Result } from 'antd';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import LoadingContainer from '../../../common/component/loading/loading-container'
import '../../../assets/css/event.css'
import EllipsisText from "react-ellipsis-text";
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import ButtonStatus from '../../../common/component/button/button-status';

const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

class EventComponent extends Component {
    render() { 
        const {cardData,initialData,onDetailEvent,kategori, onTabChange,cardDataEventKategori,onStartLoadingHome ,onFinishLoadingHome, onEventKategori,onSeacrhEvent,cardDataEventSeacrh,cardDataEvenyWeek,success,error, see, closed} = this.props
        const image1 = require(`../../../assets/images/event-image1.png`);  
        const dateNow =  moment().format('YYYY-MM-DD')
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
                                                            onSearch={value => onSeacrhEvent(value)}
                                                            placeholder="Pencarian..."
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
                        <div style={initialData.size_event_seacrh > 0 ? {display:"none"}:{display:"block"}}>
                            <Row className="section-container" style={{marginBottom: 50}}>
                            {/* Populer Event */}
                                <Col lg={24}>
                                    <span style={{marginLeft:'2%'}} className="text-soft-blue title-big-event bold">Semua Event</span>
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
                                                                                <div style={Date.parse(data.endregist) > Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                                    <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                        <ButtonStatus
                                                                                            text="Available"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#070E57"
                                                                                            onClick = {() => success(data.quota)}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                    <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                        <ButtonStatus
                                                                                            text="Full"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#FF0303"
                                                                                            onClick = {()=>error()}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div style={Date.parse(data.endregist) < Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                                    <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                        <ButtonStatus
                                                                                            text="Closed"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#FF0303"
                                                                                            onClick = {()=>closed()}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                    <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                        <ButtonStatus
                                                                                            text="See Ya"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#00d1a7"
                                                                                            onClick = {()=>see(data.title)}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div style={Date.parse(data.endregist) === Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                                    <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                        <ButtonStatus
                                                                                            text="See Ya"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#00d1a7"
                                                                                            onClick = {()=>see(data.title)}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={24} className="mt-10">
                                                                                <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                                    {data.price}
                                                                                </span>
                                                                            </Col>
                                                                            <Col lg={24} className="mt-10">
                                                                                <Link onClick={() => onDetailEvent(data.id)}><h2 className="text-soft-blue semi-bold"><EllipsisText text={data.title} length={"20"} tooltip={data.title}/></h2></Link>
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
                                        {/* Kategori Event */}
                                            <LoadingContainer loading={initialData.loading}>
                                                <Col lg={24} style={{minHeight: "300px"}}>
                                                    <Row gutter={[16,16]} type="flex">
                                                        {
                                                            cardDataEventKategori.map( data =>
                                                                <Col lg={6} md={12} sm={12} xs={24} style={initialData.size > 0 ? {display:"block"}:{display:"none"}}>
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
                                                                            <div style={Date.parse(data.endregist) > Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                                    <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                        <ButtonStatus
                                                                                            text="Available"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#070E57"
                                                                                            onClick = {() => success(data.quota)}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                    <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                        <ButtonStatus
                                                                                            text="Full"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#FF0303"
                                                                                            onClick = {()=>error()}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div style={Date.parse(data.endregist) < Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                                    <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                        <ButtonStatus
                                                                                            text="Closed"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#FF0303"
                                                                                            onClick = {()=>closed()}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                    <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                        <ButtonStatus
                                                                                            text="See Ya"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#00d1a7"
                                                                                            onClick = {()=>see(data.title)}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div style={Date.parse(data.endregist) === Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                                    <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                        <ButtonStatus
                                                                                            text="See Ya"
                                                                                            height={10}
                                                                                            borderRadius="5px"
                                                                                            background="#00d1a7"
                                                                                            onClick = {()=>see(data.title)}
                                                                                            float = "right"
                                                                                            fontSize = "10px"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={24} className="mt-10">
                                                                                <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                                    {data.price}
                                                                                </span>
                                                                            </Col>
                                                                            <Col lg={24} className="mt-10">
                                                                                <Link onClick={() => onDetailEvent(data.id)}><h2 className="text-soft-blue semi-bold"><EllipsisText text={data.title} length={"20"} tooltip={data.title}/></h2></Link>
                                                                            </Col>
                                                                            <Col lg={24}>
                                                                                {data.place}
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </Col>
                                                            )
            
                                                        }
                                                        <Col lg={24} md={24} sm={24} xs={24} style={initialData.size === 0 ? {display:"block"}:{display:"none"}}>
                                                            <Result
                                                                status="404"
                                                                title="Event Belum Ada"
                                                                subTitle="Mohon maaf belum ada event yang dibuat"
                                                            />,
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={24}>
                                                            <div className="tombol-tengah button-section-1-container" style={initialData.countEvent < 17 ? {display:"none"}:{display:"block"}}>
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
                                <LoadingContainer loading={initialData.loadingWeek}>
                                    {/*Event Minggu Ini */}
                                    <Col lg={24} style={{minHeight: "300px"}}>
                                            <Row gutter={[16,16]} style={{marginLeft:'2%', marginRight:'2%'}} type="flex">
                                                {
                                                    cardDataEvenyWeek.map( data =>
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
                                                                        <div style={Date.parse(data.endregist) > Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                            <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                <ButtonStatus
                                                                                    text="Available"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#070E57"
                                                                                    onClick = {() => success(data.quota)}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                            <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                <ButtonStatus
                                                                                    text="Full"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#FF0303"
                                                                                    onClick = {()=>error()}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div style={Date.parse(data.endregist) < Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                            <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                <ButtonStatus
                                                                                    text="Closed"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#FF0303"
                                                                                    onClick = {()=>closed()}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                            <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                <ButtonStatus
                                                                                    text="See Ya"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#00d1a7"
                                                                                    onClick = {()=>see(data.title)}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div style={Date.parse(data.endregist) === Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                            <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                <ButtonStatus
                                                                                    text="See Ya"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#00d1a7"
                                                                                    onClick = {()=>see(data.title)}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={24} className="mt-10">
                                                                        <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                            {data.price}
                                                                        </span>
                                                                    </Col>
                                                                    <Col lg={24} className="mt-10">
                                                                        <Link onClick={() => onDetailEvent(data.id)}><h2 className="text-soft-blue semi-bold"><EllipsisText text={data.title} length={"20"} tooltip={data.title}/></h2></Link>
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
                                </LoadingContainer>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} >
                                    <div className="tombol-tengah button-section-1-container" style={initialData.countEvent < 12 ? {display:"none"}:{display:"block"}}>
                                        <Link to="/allevent">
                                            <ButtonRounded
                                                text="Semua Event"
                                                className='button-participate'
                                            />
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div style={initialData.size_event_seacrh > 0 ? {display:"block"}:{display:"none"}}>
                            {/* Pencarian Event */}
                            <Row className="section-container" style={{marginBottom: 50}}>
                                <Col lg={24}>
                                    <span style={{marginLeft:'2%'}} className="text-soft-blue title-big-event bold">Hasil Pencarian</span>
                                </Col>
                                <Col lg={24} className="card-container" >
                                    <Col lg={24} >
                                            <Row gutter={[16,16]} style={{marginLeft:'2%', marginRight:'2%'}} type="flex">
                                                {
                                                    cardDataEventSeacrh.map( data =>
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
                                                                        <div style={Date.parse(data.endregist) > Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                            <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                <ButtonStatus
                                                                                    text="Available"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#070E57"
                                                                                    onClick = {() => success(data.quota)}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                            <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                <ButtonStatus
                                                                                    text="Full"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#FF0303"
                                                                                    onClick = {()=>error()}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div style={Date.parse(data.endregist) < Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                            <div style={data.quota === 0 ? {display:"none"}:{display:"block"}}  >
                                                                                <ButtonStatus
                                                                                    text="Closed"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#FF0303"
                                                                                    onClick = {()=>closed()}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                            <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                <ButtonStatus
                                                                                    text="See Ya"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#00d1a7"
                                                                                    onClick = {()=>see(data.title)}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div style={Date.parse(data.endregist) === Date.parse(dateNow) ? {display:"block"}:{display:"none"}}>
                                                                            <div style={data.quota === 0 ? {display:"block"}:{display:"none"}} >
                                                                                <ButtonStatus
                                                                                    text="See Ya"
                                                                                    height={10}
                                                                                    borderRadius="5px"
                                                                                    background="#00d1a7"
                                                                                    onClick = {()=>see(data.title)}
                                                                                    float = "right"
                                                                                    fontSize = "10px"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={24} className="mt-10">
                                                                        <span className="text-white background-soft-blue semi-bold event-card-badge">
                                                                            {data.price}
                                                                        </span>
                                                                    </Col>
                                                                    <Col lg={24} className="mt-10">
                                                                        <Link to='/detail'><h2 className="text-soft-blue semi-bold"><EllipsisText text={data.title} length={"20"} tooltip={data.title}/></h2></Link>
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
                        </div>
                        <BackTop />
                    </Content>
                    <Footer/>
                </LoadingContainer>
            </Layout>
        );
    }
}
export default EventComponent;