import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;

class BasicInfoComponent extends Component{
    render(){
        const { menu,initialData, handleChange, handleSubmit } = this.props;
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">
                                <Row>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Nama Event*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='name'
                                                placeholder="Masukan nama event...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.name}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Deskripsi Event*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='description'
                                                placeholder="Masukan deskripsi event...."
                                                className="input-description-event mt-5"
                                                onChange={handleChange}
                                                value={initialData.description}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'20px'}}>
                                    <Col lg={8} md={24} sm={24}>
                                        <div className="form-section-3">
                                            <div>   
                                                <span className="auth-input-label text-black">Organisasi*</span>
                                            </div>
                                            <div>
                                                <InputForm
                                                    name='organisasi'
                                                    placeholder="Masukkan nama organisasi...."
                                                    className="input-event mt-5 mb-20"
                                                    onChange={handleChange}
                                                    value={initialData.organisasi}
                                                />
                                            </div>
                                        </div>   
                                    </Col>
                                    <Col lg={8} md={24} sm={24}>
                                        <div className="form-section-3">
                                            <div>   
                                                <span className="auth-input-label text-black">Batas Peserta*</span>
                                            </div>
                                            <div>
                                                <InputForm
                                                    name='batas_peserta'
                                                    placeholder="Masukkan batas peserta...."
                                                    className="input-event mt-5 mb-20"
                                                    onChange={handleChange}
                                                    value={initialData.batas_peserta}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8} md={24} sm={24}>
                                        <div className="form-section-4">
                                            <div>   
                                                <span className="auth-input-label text-black">Kategori*</span>
                                            </div>
                                            <div>
                                                <Dropdown overlay={menu}>
                                                    <div className="dropdown-category">
                                                        <Button>
                                                            <Row>
                                                                <Col lg={22} md={24} sm={24}>
                                                                    <span className="auth-dropdown-label text-black">Pilih Kategori*</span>
                                                                </Col>
                                                                <Col lg={2} md={24} sm={24}>
                                                                    <Icon type="down" style={{color:"#4D5AF2"}}/>
                                                                </Col>
                                                            </Row>
                                                        </Button>
                                                    </div>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                 </Content>
            </Layout>
        );
    }
}


export default BasicInfoComponent;