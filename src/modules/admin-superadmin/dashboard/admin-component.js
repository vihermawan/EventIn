import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/admin-superadmin/superadmin.css'
import '../../../assets/css/dashboard-all/table-style.css'
// constant content
const { Content } = Layout;

class AdminComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/participant-dashboard.png`);
        const image2 = require(`../../../assets/images/event-dashboard.png`);
        const image3 = require(`../../../assets/images/certificate-dashboard.png`);
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
                                <Col lg={6} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Semua Peserta</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-total-card-admin">
                                                        <span>10</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="img-card-dashboard-admin">
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
                                <Col lg={6} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Semua Panitia</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-total-card-admin">
                                                        <span>10</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="img-card-dashboard-admin">
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
                                <Col lg={6} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Semua Sertifikat</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-total-card-admin">
                                                        <span>10</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="img-card-dashboard-admin">
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
                                <Col lg={6} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Semua Event</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-total-card-admin">
                                                        <span>10</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="img-card-dashboard-admin">
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
                            </Row>
                            
                            <Row>
                                <Col lg={24} md={24} sm={24}>
                                    <div className="card-graphic">
                                        asa
                                    </div>
                                </Col>  
                            </Row>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default AdminComponent;