import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Divider, Col,Icon,Avatar } from 'antd';
import { faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import LoadingContainer from '../../../common/component/loading/loading-container'
import ButtonEdit from '../../../common/component/button/button-edit';

// constant content
const { Content } = Layout;

class ListParticipantComponent extends Component {
    render() { 
        const {initialData, onEditSigner, dataProfile,onEditPassword} = this.props;
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
                    <Breadcrumb.Item>Dashboard Profil Penandatangan</Breadcrumb.Item>
                </Breadcrumb>
                <LoadingContainer loading={initialData.loading}>
                    <div style={{minHeight:"70vh"}}>
                        {
                        dataProfile.map( data =>
                            <Row className="section-container-admin">
                            
                                    <Col lg={6} md={12} sm={12}>
                                        <Row gutter={40}>
                                            <Col span={24}>
                                                <div className="container-profile-admin">
                                                    <Avatar shape="square" size={300} src={data.picture} classname="profile-picture" icon="user"/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={18} md={12} sm={12}>
                                        <Row className="profile-description-admin" >
                                            <Col span={24} >
                                            <div className="name-profile">
                                                <span className="text-soft-blue title-small bold">{data.nama_penandatangan}</span>
                                                <br/>
                                                <p className="text-soft-grey email-user"> <Icon type="mail" style={{marginRight:'10px'}}/>{data.email}</p>                                      
                                            </div>
                                            <div>
                                                <ButtonEdit
                                                    text="Edit Profile"
                                                    height={20}
                                                    icon={faInfoCircle}
                                                    borderRadius="5px"
                                                    background="#070E57"
                                                    onClick={ () => onEditSigner(data.id_users)}
                                                />
                                                <Divider type="vertical" />
                                                <ButtonEdit
                                                    text="Edit Password"
                                                    height={20}
                                                    icon={faInfoCircle}
                                                    borderRadius="5px"
                                                    background="#00a8ba"
                                                    onClick={ () => onEditPassword(data.id_users)}
                                                />
                                            </div>
                                            </Col> 
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="container-desc">
                                                    <p className="text-soft-blue desc-title">Instansi</p>
                                                    <p className="text-black desc-profile">{data.instansi}</p>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="container-desc">
                                                    <p className="text-soft-blue desc-title">Nomor Induk Pegawai</p>
                                                    <p className="text-black desc-profile">{data.nip}</p>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="container-desc">
                                                    <p className="text-soft-blue desc-title">Jabatan</p>
                                                    <p className="text-black desc-profile">{data.jabatan}</p>
                                                </div>
                                            </Col>
                                        </Row>  
                                    </Col>
                                
                            </Row>
                        )}
                    </div>
                </LoadingContainer>
            </Content>
        );
    }
}
 
export default ListParticipantComponent;