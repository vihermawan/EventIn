import React, { Component } from 'react';
import { Layout, BackTop, Row, Col,Icon, Tag } from 'antd';
import {  faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import '../../../assets/css/profile.css'

// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import ButtonEdit from '../../../common/component/button/button-edit';
import LoadingContainer from '../../../common/component/loading/loading-container'
const { Content } = Layout;

class ProfileComponent extends Component {
    render() { 
        const {initialData,dataProfile,onEditPeserta,onStartLoadingHome,onFinishLoadingHome} =this.props;
        return ( 
            <Layout className="landing-container" style={{minHeight: "100vh"}} >
                <Navbar
                    navigate={this.props.navigate}
                    onStartLoadingHome={onStartLoadingHome}
                    onFinishLoadingHome={onFinishLoadingHome}
                />
                <Content style={{ overflow: "hidden" }}>
                <LoadingContainer loading={initialData.loadingHome}>
                    <div style={{minHeight:"500px"}}>
                    {
                        dataProfile.map( data =>
                            <Row className="section-container">
                                <Col lg={6} md={12} sm={12}>
                                    <Row>
                                        <Col span={24}>
                                        <div className="container-profile">
                                            <img
                                                src={data.picture}
                                                alt="Event 1"
                                                style={{maxWidth: '100%', borderRadius: '10px'}}
                                            />
                                        </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={18} md={12} sm={12}>
                                    <Row className="profile-description">
                                        <Col span={24}>
                                        <div className="name-profile">
                                            <span className="text-soft-blue title-small bold">{data.nama_peserta}</span>
                                            <br/>
                                            <p className="text-soft-grey email-user"> <Icon type="mail" style={{marginRight:'10px'}} />{data.email}</p>                                      
                                        </div>
                                        <div>
                                            <ButtonEdit
                                                 text="Edit Profile"
                                                 height={20}
                                                 icon={faInfoCircle}
                                                 borderRadius="5px"
                                                 background="#070E57"
                                                 onClick = { () => onEditPeserta(data.id_users)}
                                            />
                                        </div>
                                        </Col> 
                                        <Col lg={6} md={12} sm={12}>
                                            <div className="container-desc">
                                            <p className="text-soft-blue desc-title">Pekerjaan</p>
                                            <p className="text-black desc-profile">{data.pekerjaan}</p>
                                        </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                        <div className="container-desc">
                                            <p className="text-soft-blue desc-title">Tanggal Lahir</p>
                                            <p className="text-black desc-profile">{moment(data.tanggal_lahir).format("DD MMMM YYYY")}</p>
                                        </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                        <div className="container-desc">
                                            <p className="text-soft-blue desc-title">Jenis Kelamin</p>
                                            <p className="text-black desc-profile">{data.jenis_kelamin}</p>
                                        </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                        <div className="container-desc">
                                            <p className="text-soft-blue desc-title">Nomor Telefon</p>
                                            <p className="text-black desc-profile">{data.no_telefon }</p>
                                        </div>
                                        </Col>
                                    </Row>  
                                </Col>
                            </Row>
                    )}
                    </div>
                    <BackTop />
                    </LoadingContainer>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}
 
export default ProfileComponent;