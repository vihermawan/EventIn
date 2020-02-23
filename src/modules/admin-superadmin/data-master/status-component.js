import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Button,Modal,Form, Col } from 'antd';
/*import css*/
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
/*import component*/
import TableProfile from '../../../common/component/table/table'
import InputForm from '../../../common/component/input/input-form';
import LoadingContainer from '../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;

class StatusComponent extends Component {
    render() { 
        const {initialData, columns, data, handleCancel,handleOk,showModal,handleChange } = this.props
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
                    <Breadcrumb.Item>Dashboard Data Master</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Status Master</span>
                                <br/>
                                <Button type="primary" onClick={showModal}>
                                    Tambah
                                </Button>
                                <Modal
                                    title="Tambah Status"
                                    visible={initialData.visible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    >
                                    <Form>
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Nama Status*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='status_event'
                                                        placeholder="Masukan nama status...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.status_event}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>  
                                    </Form>
                                </Modal>
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
 
export default StatusComponent;