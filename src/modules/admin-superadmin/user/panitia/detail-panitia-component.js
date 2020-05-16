import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import '../../../../assets/css/admin-superadmin/detail-user.css'
import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;


class DetailPanitiaAdminComponent extends Component {
    render() { 
      const { initialData, columns, data } = this.props
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
                    <Breadcrumb.Item><Link to='/admin/list-panitia'>Daftar Panitia</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Detail Panitia</Breadcrumb.Item>
                </Breadcrumb>
                <LoadingContainer loading={initialData.loading}>
                    <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                        <Col lg={24} md={24} sm={24}> 
                            <div className="container-active-event">
                                <Row>
                                    <div className="container-title-event">
                                        <span>Detail Panitia</span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="container-desc-panitia">
                                        <Row>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="avatar-panitia">
                                                    <div style={{margin:"16p auto", textAlign:"center"}}>
                                                        <Avatar shape="square" size={300} src={initialData.detail_panitia.image_URL} icon="user"/>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="desc-panitia">
                                                    <span className="text-blue nama-panitia">Nama Panitia</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{initialData.detail_panitia.nama_panitia}</span>
                                                </div>
                                                <br/>
                                                <div className="desc-panitia">
                                                    <span className="text-blue nama-panitia">Organisasi</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{initialData.detail_panitia.organisasi}</span>
                                                </div>
                                                <br/>
                                                <div className="desc-panitia">
                                                    <span className="text-blue nama-panitia">Instagram</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{initialData.detail_panitia.instagram}</span>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="desc-panitia">
                                                    <span className="text-blue nama-panitia">Email</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{initialData.panitia.email}</span>
                                                </div>
                                                <br/>
                                                <div className="desc-panitia">
                                                    <span className="text-blue nama-panitia">No Telepon</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{initialData.detail_panitia.telepon}</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                                <Row gutter={24} type="flex">
                                    <TableProfile 
                                        columns={columns} 
                                        dataSource={data} 
                                        className="table-panitia"
                                    />
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </LoadingContainer>
            </Content>
        );
    }
}
 
export default DetailPanitiaAdminComponent;