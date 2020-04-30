import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Button,Modal,Form, Col } from 'antd';

/*import css*/
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
/*import component*/
import TableProfile from '../../../common/component/table/table'
import InputForm from '../../../common/component/input/input-form';
import LoadingContainer from '../../../common/component/loading/loading-container'
import ButtonEdit from '../../../common/component/button/button-edit';

// constant content
const { Content } = Layout;

class KategoriComponent extends Component {
    render() { 
        const {initialData, columns, data, handleCancel,handleOk,showModal,handleChange,handleEdit } = this.props
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
                    <Breadcrumb.Item>Daftar Kategori</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                                <Col lg={19} md={12} sm={12} xs={24}>
                                    <div className="container-title-event">
                                        <span>Daftar Kategori</span>
                                    </div>
                                </Col>
                                <Col lg={5} md={12} sm={12} xs={24}>
                                    <div className="button-add">
                                        <ButtonEdit
                                            text="Tambah Kategori"
                                            height={20}
                                            borderRadius="5px"
                                            background="#00C908"
                                            onClick={ showModal}
                                        />
                                        <Modal
                                            title="Tambah Kategori"
                                            visible={initialData.visible}
                                            onOk={handleOk}
                                            onCancel={handleCancel}
                                        >
                                            <Form>
                                                <Row>
                                                    <Col lg={24} md={24} sm={24}>
                                                        <div>   
                                                            <span className="auth-input-label text-black">Nama Kategori*</span>
                                                        </div>
                                                        <div>
                                                            <InputForm
                                                                name='nama_kategori'
                                                                placeholder="Masukan nama kategori...."
                                                                className="input-event mt-5 mb-20"
                                                                onChange={handleChange}
                                                                value={initialData.nama_kategori}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>  
                                            </Form>
                                        </Modal>
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
                                <Row>
                                    <Modal
                                        title="Edit Kategori"
                                        visible={initialData.show}
                                        onOk={handleEdit}
                                        onCancel={handleCancel}
                                    >
                                        <Form>
                                            <Row>
                                                <Col lg={24} md={24} sm={24}>
                                                    <div>   
                                                        <span className="auth-input-label text-black">Nama Kategori*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='edit_kategori'
                                                            placeholder="Masukan nama kategori...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.edit_kategori}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>  
                                        </Form>
                                    </Modal>
                                </Row>
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default KategoriComponent;