import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col,Tag } from 'antd';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import '../../../../assets/css/admin-superadmin/detail-user.css'
import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;


class DetailPenandatanganAdminComponent extends Component {
    render() { 
      const { initialData, columns, data } = this.props
      const image1 = require(`../../../../assets/images/avatar.png`);
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
                    <Breadcrumb.Item>Dashboard List Panitia</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Detail Panitia</Breadcrumb.Item>
                </Breadcrumb>

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
                                            <img
                                                src={image1}
                                                alt="avatar 1"
                                                className = "avatar-panitia"
                                                style={{Width: '100%'}}
                                            />
                                        </Col>
                                        <Col lg={8} md={12} sm={12}>
                                            <div className="desc-panitia">
                                                <span className="text-black nama-panitia">Nama Panitia</span>
                                                <br/>
                                                <span className="text-black desc-nama">PPSMB Palapa</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-black nama-panitia">Organisasi</span>
                                                <br/>
                                                <span className="text-black desc-nama">Unviersitas Gadjah Mada</span>
                                            </div>
                                        </Col>
                                        <Col lg={8} md={12} sm={12}>
                                            <div className="desc-panitia">
                                                <span className="text-black nama-panitia">No Telepon</span>
                                                <br/>
                                                <span className="text-black desc-nama">0812092092</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-black nama-panitia">Instagram</span>
                                                <br/>
                                                <span className="text-black desc-nama">@PPSMB_Palapa</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                            <LoadingContainer loading={initialData.loading}>
                                <Row gutter={24} type="flex">
                            
                                    <TableProfile 
                                        columns={columns} 
                                        dataSource={data} 
                                        className="table-active-event"
                                    />
                                </Row>
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default DetailPenandatanganAdminComponent;