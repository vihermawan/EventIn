import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col,Modal,Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { PDFViewer,Document,Page } from '@react-pdf/renderer';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import '../../../../assets/css/admin-superadmin/detail-user.css'
import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;


class DetailPenandatanganAdminComponent extends Component {
    render() { 
      const { initialData, columns, dataPenandatangan,data,handleOk,handleCancel } = this.props
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
                                <div className="container-desc-panitia">
                                    <Row>
                                        <Col lg={8} md={12} sm={12}>
                                            <div classname="detail">
                                                <div style={{margin:"16p auto", textAlign:"center"}}>
                                                    <Avatar shape="square" size={300} src={initialData.picture} icon="user"/>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={8} md={12} sm={12}>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Nama Penandatangan</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.nama_penandatangan}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Nomor Induk Pegawai</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.nip}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Jabatan</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.jabatan}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Instansi</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.instansi}</span>
                                            </div>
                                            <br/>
                                        </Col>
                                        <Col lg={8} md={12} sm={12}>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Email</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.email}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">No. Telepon</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.telepon}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Kabupaten/Kota</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.kabupaten}</span>
                                            </div>
                                            <br/>
                                            <div className="desc-panitia">
                                                <span className="text-blue nama-panitia">Provinsi</span>
                                                <br/>
                                                <span className="text-black desc-nama">{initialData.provinsi}</span>
                                            </div>
                                            <br/>
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
                            <Modal
                                title="Sertifikat"
                                visible={initialData.visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                >
                                <PDFViewer src={initialData.url}  style={{minWidth: '100%', minHeight: '500px',border:"none"}}>
                                    <Document>
                                        <Page>
                                        </Page>
                                    </Document> 
                                </PDFViewer>
                            </Modal>
                        </div>
                        </LoadingContainer>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default DetailPenandatanganAdminComponent;