import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/admin-signer/dashboard-signer.css'
import LoadingContainer from '../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;

class SignerComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/participant-dashboard.png`);
        const {initialData} = this.props;
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
                    <Breadcrumb.Item>Dashboard Penandatangan</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24}>
                        <Row>
                        <LoadingContainer loading={initialData.loading}>
                            <Col lg={24} md={24} sm={24}>
                                <div className="card-signer">
                                <Row>
                                    <Col lg={2} md={12} sm={12}>
                                        <div className="img-card-signer">
                                            <img
                                                src={image1}
                                                alt="participant-dashboard"
                                                style={{maxWidth: '100%'}}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={22} md={12} sm={12}>
                                        <div className="desc-signer-dashboard">
                                            <div className="title-signer-card">
                                                <span>Welcome</span>
                                            </div>
                                            <div className="desc-signer-card">
                                                <span>{initialData.nama_penandatangan}</span>
                                            </div>
                                            <div className="signer-info-card">
                                                <span>{initialData.jabatan} {initialData.instansi}</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </LoadingContainer>
                        </Row>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default SignerComponent;