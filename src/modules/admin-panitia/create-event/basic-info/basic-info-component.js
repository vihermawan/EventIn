import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form, Select, Input } from 'antd';
import '../../../../assets/css/admin-panitia/create-event.css'
// component
import InputForm from '../../../../common/component/input/input-form';
import { faUserTie, faStickyNote, faIdCard, faUserFriends, faAddressBook, faEnvelope, faInfoCircle, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
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
                                                icon={faStickyNote}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Deskripsi Event*</span>
                                        </div>
                                        <div>
                                            <TextArea 
                                                name='description'
                                                placeholder="Masukan deskripsi event...."
                                                className="input-description-event mt-5"
                                                rows={5}
                                                onChange={handleChange}
                                                value={initialData.description}
                                                style={{borderColor: "#4D5AF2"}}
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
                                                    icon={faIdCard}
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
                                                    icon={faUserFriends}
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
                                                    showSearch
                                                    labelInValue
                                                    defaultValue={{ key: String(initialData.kategori_input) }}
                                                    optionFilterProp="children"
                                                    style={{ width: '100%' }}
                                                    className="select-kategori"
                                                    onChange={(input, option)=>handleKategori(input,option)}
                                                >
                                                    <Option value="">Pilih Kategori</Option>
                                                    {
                                                        initialData.kategori.map( data =>     
                                                            <Option
                                                            key={data.nama_kategori.toString()}
                                                            value={data.id_kategori}
                                                            >{data.nama_kategori}</Option>
                                                        )
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'10px'}}>
                                <Col lg={8} md={24} sm={24}>
                                        <div className="form-section-3">
                                            <div>   
                                                <span className="auth-input-label text-black">No Telepon*</span>
                                            </div>
                                            <div>
                                                <InputForm
                                                    name='no_telepon'
                                                    placeholder="Masukkan nomor telepon...."
                                                    className="input-event mt-5 mb-20"
                                                    onChange={handleChange}
                                                    value={initialData.no_telepon}
                                                    icon={faAddressBook}
                                                />
                                            </div>
                                        </div>   
                                    </Col>
                                    <Col lg={8} md={24} sm={24}>
                                        <div className="form-section-3">
                                            <div>   
                                                <span className="auth-input-label text-black">Email Event*</span>
                                            </div>
                                            <div>
                                                <InputForm
                                                    name='email_event'
                                                    placeholder="Masukkan email event...."
                                                    className="input-event mt-5 mb-20"
                                                    onChange={handleChange}
                                                    value={initialData.email_event}
                                                    icon={faEnvelopeOpenText}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8} md={24} sm={24}>
                                            <div>   
                                                <span className="auth-input-label text-black">Instagram*</span>
                                            </div>
                                            <div>
                                                <InputForm
                                                    name='instagram'
                                                    placeholder="Masukkan akun instagram tanpa @...."
                                                    className="input-event mt-5 mb-20"
                                                    onChange={handleChange}
                                                    value={initialData.instagram}
                                                    icon={faInstagram}
                                                />
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