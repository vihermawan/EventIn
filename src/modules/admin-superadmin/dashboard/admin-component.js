import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/admin-superadmin/superadmin.css'
import '../../../assets/css/dashboard-all/table-style.css'
import LoadingContainer from '../../../common/component/loading/loading-container'
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';

import { Link } from 'react-router-dom';
// constant content
const { Content } = Layout;
const year = moment().format('YYYY');
class AdminComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/Group 5.png`);
        const image2 = require(`../../../assets/images/Group 6.png`);
        const image3 = require(`../../../assets/images/Group 7.png`);
        // const image1 = require(`../../../assets/images/participant-dashboard.png`);
        // const image2 = require(`../../../assets/images/event-dashboard.png`);
        // const image3 = require(`../../../assets/images/certificate-dashboard.png`);
        // const image4 = require(`../../../assets/images/sertifikat-dashboard.png`);
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
                            {/* <Row>
                                <Col lg={6} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Total Penandatangan</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            {// <Link to="/admin/list-peserta"><span> 
                                                            }
                                                                {initialData.total_biodata}
                                                            {// </span></Link>
                                                            }
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
                                        <div className="title-info-card">
                                            <span>Menunggu diterima</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={8} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Total Sertifikat</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            {// <Link to="/admin/list-panitia"><span> 
                                                            }
                                                                {initialData.total_approval}
                                                            {// </span></Link> 
                                                            }
                                                        </div>
                                                    </LoadingContainer>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="img-card-dashboard-admin">
                                                    <img
                                                        src={image2}
                                                        alt="participant-dashboard"
                                                        style={{maxWidth: '100%'}}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="title-info-card">
                                            <span>Yang dibuat</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={8} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Total Event</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            {// <Link to="/admin/waiting-list"><span> 
                                                            }
                                                                {initialData.total_event}
                                                            {// </span></Link> 
                                                            }
                                                        </div>
                                                    </LoadingContainer>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="img-card-dashboard-admin">
                                                    <img
                                                        src={image4}
                                                        alt="participant-dashboard"
                                                        style={{maxWidth: '100%'}}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>        
                                        <div className="title-info-card">
                                            <span>terselenggara</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={8} md={12} sm={12}>
                                    <div className="card-dashboard-admin">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="desc-card-dashboard-admin">
                                                    <div className="title-desc-card-admin">
                                                        <span>Total User</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={16} md={12} sm={12}>
                                                <div className="desc-card-dashboard-admin">
                                                    <LoadingContainer loading={initialData.loading}>
                                                        <div className="title-total-card-admin"  style={{minHeight:"105px"}}>
                                                            {// <Link to="/admin/list-all-event"><span> 
                                                            }
                                                                {initialData.total_event}
                                                            {// </span></Link> 
                                                            }
                                                        </div>
                                                    </LoadingContainer>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="img-card-dashboard-admin">
                                                    <img
                                                        src={image2}
                                                        alt="participant-dashboard"
                                                        style={{maxWidth: '100%'}}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="title-info-card">
                                            <span>terdaftar</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row> */}
                            
                        <Row>
                            <Col lg={8} md={12} sm={12}>
                                <div className="card-dashboard">
                                <Row>
                                    <Col lg={16} md={12} sm={12}>
                                        <div className="desc-card-dashboard">
                                            <div className="title-desc-card">
                                                <span>Total Event</span>
                                            </div>
                                            <LoadingContainer loading={initialData.loading}>
                                                <div className="title-total-card"  style={{minHeight:"105px"}}>
                                                    <span>{initialData.total_event}</span>
                                                </div>
                                            </LoadingContainer>
                                            <div className="title-info-card">
                                                <span>Yang Terselenggara</span>
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
                                                <span>Total Sertifikat</span>
                                            </div>
                                            <LoadingContainer loading={initialData.loading}>
                                            <div className="title-total-card" style={{minHeight:"105px"}}>
                                                <span>{initialData.total_certificate}</span>
                                            </div>
                                            </LoadingContainer>
                                            <div className="title-info-card">
                                                <span>Yang Dibuat</span>
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
                                                <span>Total User</span>
                                            </div>
                                            <LoadingContainer loading={initialData.loading}>
                                            <div className="title-total-card"  style={{minHeight:"105px"}}>
                                                <span>{initialData.total_user}</span>
                                            </div>
                                            </LoadingContainer>
                                            <div className="title-info-card">
                                                <span>Yang Terdaftar</span>
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
                                <Col lg={16} md={24} sm={24}>
                                    <div className="card-graphic">
                                        <LoadingContainer loading={initialData.loading}>
                                            <div style={{textAlign:"center",fontWeight:"bold"}}><span>Grafik Jumlah Event yang Diselenggarakan Tahun {year}</span></div>
                                            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                                        </LoadingContainer>
                                    </div>
                                </Col>  
                                <Col lg={7} md={24} sm={24}>
                                    <div className="card-graphic">
                                        <LoadingContainer loading={initialData.loading}>
                                            <div style={{textAlign:"center",fontWeight:"bold"}}><span>Grafik Jumlah User</span></div>
                                            <div id="chartpiediv" style={{ width: "100%", height: "500px" }}></div>
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