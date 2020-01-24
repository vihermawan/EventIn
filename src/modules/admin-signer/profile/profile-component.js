import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col,Icon } from 'antd';
import ButtonIcon from '../../../common/component/button/button-icon'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'

// constant content
const { Content } = Layout;

class ListParticipantComponent extends Component {
    render() { 
        const imageprofile = require(`../../../assets/images/ava.jpg`);
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
                    <Breadcrumb.Item>Dashboard CreateEvent</Breadcrumb.Item>
                </Breadcrumb>
                <Row className="section-container">
                        <Col lg={6} md={12} sm={12}>
                            <Row>
                                <Col span={24}>
                                   <div className="container-profile">
                                   <img
                                        src={imageprofile}
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
                                      <span className="text-soft-blue title-small bold">Jhon Lorem </span>
                                      <br/>
                                      <p className="text-soft-grey email-user"> <Icon type="mail" style={{marginRight:'10px'}} />john@mail.ugm.ac.id</p>                                      
                                   </div>
                                   <div>
                                    <ButtonIcon
                                          text="Edit Profile"
                                          height={20}
                                          icon={faUser}
                                          borderRadius="5px"
                                          background="#070E57"
                                          marginLeft= "0px"
                                          paddingLeft= "0px"
                                      />
                                   </div>
                                </Col> 
                                <Col lg={6} md={12} sm={12}>
                                    <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Pekerjaan</p>
                                      <p className="text-black desc-profile">Mahasiswa</p>
                                   </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Tanggal Lahir</p>
                                      <p className="text-black desc-profile">01-01-1999</p>
                                   </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Jenis Kelamin</p>
                                      <p className="text-black desc-profile">Laki-laki</p>
                                   </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Nomor Telefon</p>
                                      <p className="text-black desc-profile">+6285868586656</p>
                                   </div>
                                </Col>
                            </Row>  
                        </Col>
                    </Row>
            </Content>
        );
    }
}
 
export default ListParticipantComponent;