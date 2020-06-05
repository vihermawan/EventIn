import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Modal, Col, Select } from 'antd';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
import ButtonEdit from '../../../../common/component/button/button-edit';
// constant content
const { Content } = Layout;


class PesertaAdminComponent extends Component {
    render() {
        
      const {initialData, data, columns, handleOk,handleCancel} = this.props;
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
                    <Breadcrumb.Item>Daftar Pengiriman Sertifikat </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Daftar Pengiriman Sertifikat</span>
                            </div>
                            </Row>
                            <LoadingContainer loading={initialData.loading}>
                                <Row gutter={24} type="flex">
                                    <TableProfile 
                                        columns={columns} 
                                        dataSource={data} 
                                        scroll={{ x: 1300 }}
                                        className="table-active-event"
                                    />
                                </Row>
                                <Modal
                                    title='Detail Sertifikat '
                                    visible={initialData.visible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    >
                                    <p>Mulai Event : {initialData.start_event}</p>
                                    <p>Selesai Event : {initialData.end_event}</p>
                                    <div>
                                        <a href={`${initialData.link_sertif}`} download>
                                        <ButtonEdit
                                            text = "Detail Sertifikat"
                                            height={20}
                                            icon={faInfoCircle}
                                            borderRadius="5px"
                                            background="#FFA903"
                                            marginRight="4px"
                                        />
                                        </a>
                                    </div>
                                </Modal>
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default PesertaAdminComponent;