import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, BackTop, Row, Col, Card } from 'antd';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import LoadingContainer from '../../../common/component/loading/loading-container'
import '../../../assets/css/event.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import ButtonStatus from '../../../common/component/button/button-status';
const { Content } = Layout;

class AllEventKategoriComponent extends Component {
    render() { 
        const {cardData,initialData,onDetailEvent,onStartLoadingHome ,onFinishLoadingHome,nextPage,success,error,see, closed} = this.props
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
                        <Row className="section-container" style={{marginBottom: 50, marginTop:50}}>
                            <Col lg={24}>
                                <span style={{marginLeft:'1%'}} className="text-soft-blue title-big-event bold">Semua Event</span>
                            </Col>
                            <Col lg={24} className="card-container">
                                <LoadingContainer loading={initialData.loading}>
                                    <Col lg={24} style={{minHeight: "300px"}}>
                                        <Row gutter={[16,16]}>
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
                                        <Row>
                                            <Col span={24} >
                                                <div className="tombol-tengah button-section-1-container" style={initialData.current_page ===  initialData.last_page ? {display:"none"}:{display:"block"}}>
                                                        <ButtonDashboard
                                                            text="Show More"
                                                            className='button-participate'
                                                            onClick={nextPage}
                                                            paddingLeft="40px"
                                                            paddingRight="40px"
                                                        />
                                                </div>
                                            </Col>
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
export default AllEventKategoriComponent;