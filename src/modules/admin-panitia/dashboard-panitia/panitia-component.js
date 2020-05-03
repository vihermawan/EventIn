import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import LoadingContainer from '../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;

class PanitiaComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/participant-dashboard.png`);
        const image2 = require(`../../../assets/images/event-dashboard.png`);
        const image3 = require(`../../../assets/images/certificate-dashboard.png`);

        const { initialData } = this.props
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
                    <Breadcrumb.Item>Dashboard Panitia</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24}>
                        <Row>
                            <Col lg={8} md={12} sm={12}>
                                <div className="card-dashboard">
                                <Row>
                                    <Col lg={16} md={12} sm={12}>
                                        <div className="desc-card-dashboard">
                                            <div className="title-desc-card">
                                                <span>Total Peserta</span>
                                            </div>
                                            <LoadingContainer loading={initialData.loading}>
                                                <div className="title-total-card"  style={{minHeight:"105px"}}>
                                                    <span>{initialData.total_regis}</span>
                                                </div>
                                            </LoadingContainer>
                                            <div className="title-info-card">
                                                <span>Yang Mendaftar Hari ini</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8} md={12} sm={12}>
                                        <div className="img-card-dashboard">
                                            <img
                                                src={image1}
                                                alt="participant-dashboard"
                                                style={{maxWidth: '100%'}}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                            <Col lg={8} md={12} sm={12}>
                                <div className="card-dashboard">
                                    <Row>
                                    <Col lg={16} md={12} sm={12}>
                                        <div className="desc-card-dashboard">
                                            <div className="title-desc-card">
                                                <span>Total Event</span>
                                            </div>
                                            <LoadingContainer loading={initialData.loading}>
                                            <div className="title-total-card" style={{minHeight:"105px"}}>
                                                <span>{initialData.total_event}</span>
                                            </div>
                                            </LoadingContainer>
                                            <div className="title-info-card">
                                                <span>Event yang Selesai</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8} md={12} sm={12}>
                                        <div className="img-card-dashboard">
                                            <img
                                                src={image2}
                                                alt="event-dashboard"
                                                style={{maxWidth: '100%'}}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                            <Col lg={8} md={12} sm={12}>
                                <div className="card-dashboard">
                                    <Row>
                                    <Col lg={16} md={12} sm={12}>
                                        <div className="desc-card-dashboard">
                                            <div className="title-desc-card">
                                                <span>Total Sertifikat</span>
                                            </div>
                                            <LoadingContainer loading={initialData.loading}>
                                            <div className="title-total-card"  style={{minHeight:"105px"}}>
                                                <span>{initialData.total_certificate}</span>
                                            </div>
                                            </LoadingContainer>
                                            <div className="title-info-card">
                                                <span>Sertfiikat Selesai</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8} md={12} sm={12}>
                                        <div className="img-card-dashboard">
                                            <img
                                                src={image3}
                                                alt="certificate-dashboard"
                                                style={{maxWidth: '100%'}}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24}>
                                <div className="card-graphic">
                                    <LoadingContainer loading={initialData.loading}>
                                        <div style={{textAlign:"center",fontWeight:"bold"}}><span>Grafik Total Peserta Event</span></div>
                                        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                                    </LoadingContainer>
                                </div>
                            </Col>  
                        </Row>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default PanitiaComponent;