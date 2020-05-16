import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col,Avatar } from 'antd';
import { Link } from 'react-router-dom';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import '../../../../assets/css/admin-superadmin/detail-user.css'
import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
import moment from 'moment'
// constant content
const { Content } = Layout;


class DetailPesertaAdminComponent extends Component {
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
                    <Breadcrumb.Item><Link to='/admin/list-peserta'>Daftar Peserta</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Detail Peserta</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                    <LoadingContainer loading={initialData.loading}>
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Detail Peserta</span>
                            </div>
                            </Row>
                            <Row>
                                <div className="container-desc-panitia">
                                    <Row>
                                        <Col lg={8} md={12} sm={12}>
                                            <div classname="detail">
                                                <div style={{margin:"16p auto", textAlign:"center"}}>
                                                    <Avatar shape="square" size={300} src={initialData.detailPeserta.image_URL} icon="user"/>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={8} md={12} sm={12}>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Nama Peserta</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.detailPeserta.nama_peserta}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Jenis Kelamin</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.detailPeserta.jenis_kelamin}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Organisasi</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.detailPeserta.organisasi}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Tanggal Lahir</span>
                                                <br/>
                                                <span className="text-black desc-nama">{moment(initialData.detailPeserta.tanggal_lahir).format("DD MMMM YYYY")}</span>
                                            </div>
                                        </Col>
                                        <Col lg={8} md={12} sm={12}>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Email</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.peserta.email}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">No. Telepon</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.detailPeserta.telepon}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Pekerjaan</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.detailPeserta.pekerjaan}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Umur</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.detailPeserta.umur} tahun</span>
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
                        </LoadingContainer>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default DetailPesertaAdminComponent;