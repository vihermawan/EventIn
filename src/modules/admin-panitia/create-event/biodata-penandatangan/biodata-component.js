import React, { Component } from 'react';
import { Layout, Row, Col, Form,Button } from 'antd';
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;

class BiodataComponent extends Component{
    render(){
        const { initialData, handleChange,  onDone, onPrev} = this.props;
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">
                                <Row>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Nama Penandatangan*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='penandatangan'
                                                placeholder="Masukan nama penandatangan...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.penandatangan}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Instansi*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='instansi'
                                                placeholder="Masukan instansi...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.instansi}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Jabatan*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='jabatan'
                                                placeholder="Masukan jabatan...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.jabatan}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Nip*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='nip'
                                                placeholder="Masukan Nip...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.nip}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                    <Button
                        type="primary"
                        onClick={() => onDone()}
                    >
                        Done
                    </Button>
                    <Button
                        style={{ marginLeft: 8, marginTop:0 }}
                        onClick={() => onPrev()}
                    >
                        Previous
                    </Button>
                 </Content>
            </Layout>
        );
    }
}


export default BiodataComponent;