import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/admin-superadmin/superadmin.css'
import '../../../assets/css/dashboard-all/table-style.css'
import LoadingContainer from '../../../common/component/loading/loading-container'
import { Link } from 'react-router-dom';
// constant content
const { Content } = Layout;

class AdminComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/participant-dashboard.png`);
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
                    <Breadcrumb.Item>Dashboard Admin</Breadcrumb.Item>
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
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            <Link to="/admin/list-peserta"><span>{initialData.total_peserta}</span></Link> 
                                                        </div>
                                                    </LoadingContainer>
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
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            <Link to="/admin/list-panitia"><span>{initialData.total_panitia}</span></Link>
                                                        </div>
                                                    </LoadingContainer>
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
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            <Link to="/admin/waiting-list"><span>{initialData.total_sertifikat}</span></Link>
                                                        </div>
                                                    </LoadingContainer>
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
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            <Link to="/admin/list-all-event"><span>{initialData.total_event}</span></Link>
                                                        </div>
                                                    </LoadingContainer>
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
                                        <LoadingContainer loading={initialData.loading}>
                                            <div style={{textAlign:"center",fontWeight:"bold"}}><span>Grafik Total Event Selama Setahun</span></div>
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
 
export default AdminComponent;