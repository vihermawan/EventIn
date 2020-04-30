import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import '../../../../assets/css/admin-superadmin/detail-user.css'
import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;


class DetailPenandatanganAdminComponent extends Component {
    render() { 
      const { initialData, columns, dataPenandatangan,data } = this.props
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
                    <Breadcrumb.Item><Link to='/admin/admin-penandatangan'>Daftar Penandatangan</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Detail Penandatangan</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <LoadingContainer loading={initialData.loading}>
                            <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Detail Penandatangan</span>
                            </div>
                            </Row>
                            <Row>
                                {dataPenandatangan.map(data =>
                                    <div className="container-desc-panitia">
                                        <Row>
                                            <Col lg={8} md={12} sm={12}>
                                                <img
                                                    src={data.picture}
                                                    alt="avatar 1"
                                                    className = "avatar-panitia"
                                                    style={{Width: '10%'}}
                                                />
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="desc-panitia">
                                                    <span className="text-black nama-panitia">Nama</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{data.nama_penandatangan}</span>
                                                </div>
                                                <br/>
                                                <div className="desc-panitia">
                                                    <span className="text-black nama-panitia">Instansi</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{data.instansi}</span>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={12} sm={12}>
                                                <div className="desc-panitia">
                                                    <span className="text-black nama-panitia">Jabatan</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{data.jabatan}</span>
                                                </div>
                                                <br/>
                                                <div className="desc-panitia">
                                                    <span className="text-black nama-panitia">NIP</span>
                                                    <br/>
                                                    <span className="text-black desc-nama">{data.nip}</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Row>
                           
                                <Row gutter={24} type="flex">
                            
                                    <TableProfile 
                                        columns={columns} 
                                        dataSource={data} 
                                        className="table-panitia"
                                    />
                                </Row>
                           
                        </div>
                        </LoadingContainer>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default DetailPenandatanganAdminComponent;