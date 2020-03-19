import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form, Select } from 'antd';
import '../../../../assets/css/admin-panitia/create-event.css'
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;
const { Option } = Select;

class BasicInfoComponent extends Component{
    render(){
        const { menu,initialData, handleChange, onNext, handleKategori } = this.props;
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
                                                name='nama'
                                                placeholder="Masukan nama event...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.nama}
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
                                            <div className="select-kategori">
                                                 <Select
                                                    labelInValue
                                                    defaultValue={{ key: 'Pilih Kategori' }}
                                                    style={{ width: '100%' }}
                                                    className="select-kategori"
                                                    onChange={handleKategori}
                                                >
                                                    <Option value="Olahraga">Olahraga</Option>
                                                    <Option value="Musik">Musik</Option>
                                                    <Option value="Budaya">Budaya</Option>
                                                    <Option value="Game">Game</Option>
                                                    <Option value="Seni">Seni</Option>
                                                    <Option value="Teknologi">Teknologi</Option>
                                                    <Option value="Pendidikan">Pendidikan</Option>
                                                    <Option value="Agama">Agama</Option>
                                                </Select>,
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="steps-action">
                                <Button
                                    type="primary"
                                    onClick={() => onNext()}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                 </Content>
            </Layout>
        );
    }
}


export default BasicInfoComponent;