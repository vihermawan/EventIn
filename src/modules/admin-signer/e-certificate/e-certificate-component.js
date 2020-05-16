import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Modal, Col } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import TableProfile from '../../../common/component/table/table'
import LoadingContainer from '../../../common/component/loading/loading-container'
import { PDFViewer,Document,Page } from '@react-pdf/renderer';
// constant content
const { Content } = Layout;

class ActiveEventComponent extends Component {
    render() { 
        const { initialData, columns, data,handleOk,handleCancel } = this.props
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
                    <Breadcrumb.Item>Dashboard Sertifikat Selesai</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Daftar Sertifikat</span>
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
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default ActiveEventComponent;