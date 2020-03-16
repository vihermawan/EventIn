import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Form,Icon, Button, Input} from 'antd';
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;
const { Dragger } = Upload;

class CertificateComponent extends Component{
    render(){
        const { initialData, handleChange,onNext, onPrev,uploadFile } = this.props;
        const uploadButton = (
            <div>
              {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <div className="ant-upload-text">Preview file</div>
            </div>
          );
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">
                                <Row>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Nama Sertifikat*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='sertifikat'
                                                placeholder="Masukan nama sertifikat...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.sertifikat}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Deskripsi*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='deskripsi'
                                                placeholder="Masukan deskripsi sertifikat...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.deskripsi}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Upload Sertifikat*</span>
                                        </div>
                                        <div>
                                        <Input
                                            type="file"
                                            onChange={uploadFile}
                                            className="input-picture"
                                            style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                        />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
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
                 </Content>
            </Layout>
        );
    }
}


export default CertificateComponent;