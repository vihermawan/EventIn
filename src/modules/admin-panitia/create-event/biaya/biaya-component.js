import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form, Select } from 'antd';
import '../../../../assets/css/admin-panitia/create-event.css'
// component
import InputForm from '../../../../common/component/input/input-form';
import { faWallet, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
const { Content } = Layout;
const { Option } = Select;

class BiayaComponent extends Component{
    render(){
        const { initialData, handleChange, onNext,onPrev,handleStatus,handleBank } = this.props;
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">
                                <Row>
                                    <Col lg={24} md={24} sm={24}>
                                        <div className="kategori-bayar mb-20">
                                            <div>   
                                                <span className="auth-input-label text-black">Kategori Bayar*</span>
                                            </div>
                                            <div>
                                                <Select
                                                    labelInValue
                                                    defaultValue={{ key: String(initialData.status_biaya) }}
                                                    style={{ width: '100%' }}
                                                    className="select-kategori "
                                                    onChange={handleStatus}
                                                    style={initialData.status_biaya === null ? {display:"none"}:{display:"block"}}
                                                >
                                                    <Option value ="">Pilih Kategori</Option>
                                                    <Option value="10">Berbayar</Option>
                                                    <Option value="9">Tidak Berbayar</Option>
                                                </Select>
                                                
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div style={initialData.status_biaya === '10' || null ? {display:"block"}:{display:"none"}} className="kategori-bayar mb-20">
                                            <div>   
                                                <span className="auth-input-label text-black">Biaya*</span>
                                            </div>
                                            <div>
                                                <InputForm
                                                    name='biaya'
                                                    placeholder="Masukkan biaya...."
                                                    className="input-event mt-5 mb-20"
                                                    onChange={handleChange}
                                                    value= {initialData.biaya}
                                                    icon={faWallet}
                                                />
                                            </div>
                                            <div>   
                                                <span className="auth-input-label text-black">Bank*</span>
                                            </div>
                                            <div>
                                                <Select
                                                    labelInValue
                                                    defaultValue={{ key: String(initialData.bank) }}
                                                    style={{ width: '100%' }}
                                                    className="select-kategori"
                                                    onChange={handleBank}
                                                >
                                                    <Option value ="-">Pilih Bank</Option>
                                                    <Option value="Mandiri">Mandiri</Option>
                                                    <Option value="BNI">BNI</Option>
                                                    <Option value="BCA">BCA</Option>
                                                    <Option value="BRI">BRI</Option>
                                                </Select>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div style={initialData.status_biaya === '10' || null ? {display:"block"}:{display:"none"}} className="kategori-bayar mb-20">
                                            <div>   
                                                <span className="auth-input-label text-black">Nomor Rekening*</span>
                                            </div>
                                            <div>
                                                <InputForm
                                                    name='no_rekening'
                                                    placeholder="Masukkan nomor rekening...."
                                                    className="input-event mt-5 mb-20"
                                                    onChange={handleChange}
                                                    value={initialData.no_rekening}
                                                    icon={faMoneyCheck}
                                                />
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
                                <Button
                                    style={{ marginLeft: 8, marginTop:0 }}
                                    onClick={() => onPrev()}
                                >
                                    Previous
                                </Button>
                            </div>
                        </Form>
                    </div>
                 </Content>
            </Layout>
        );
    }
}


export default BiayaComponent;