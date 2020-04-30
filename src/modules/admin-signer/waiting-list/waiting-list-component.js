import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col,Modal } from 'antd';
import TableProfile from '../../../common/component/table/table'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import LoadingContainer from '../../../common/component/loading/loading-container'
import ButtonEdit from '../../../common/component/button/button-edit';
import { PDFViewer,Document,Page } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
// constant content
const { Content } = Layout;


class WaitingListComponent extends Component {
    render() { 
      const { initialData, columns, data,handleCancel,handleOk,assignAllSertifikat,data_id,showAllSignedConfirm } = this.props;
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
                    <Breadcrumb.Item><Link to="/signer/total-waiting-list">Dashboard Total Waiting List</Link> </Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Waiting List</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                                <Col lg={19} md={12} sm={12} xs={24}>
                                    <div className="container-title-event">
                                        <span>Waiting List</span>
                                    </div>
                                </Col>
                                <Col lg={5} md={12} sm={12} xs={24}>
                                    <div className="button-add">
                                        <ButtonEdit
                                            text="Tanda Tangan Semua Sertifikat"
                                            height={20}
                                            borderRadius="5px"
                                            background="#00C908"
                                            onClick={() => showAllSignedConfirm(data_id,initialData.id_sertifikat)}
                                        />
                                    </div>
                                </Col>
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
 
export default WaitingListComponent;