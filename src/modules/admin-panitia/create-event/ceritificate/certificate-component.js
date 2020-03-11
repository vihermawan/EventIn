import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Form,Icon, Button} from 'antd';
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;
const { Dragger } = Upload;

class CertificateComponent extends Component{
    render(){
        const { initialData, handleChange, handleUpload,onNext, onPrev,beforeUpload,handleChangePdf } = this.props;
        const uploadButton = (
            <div>
              {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <div className="ant-upload-text">Upload Foto Eventmu</div>
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
                                            {/* <Dragger {...handleUpload}>
                                                <p className="ant-upload-drag-icon">
                                                    <Icon type="inbox" />
                                                </p>
                                                <p className="ant-upload-text">Upload Sertifikat Eventmu !</p>
                                                <p className="ant-upload-hint">Tambahkan Sertifikat untuk acaramu   </p>
                                            </Dragger>, */}
                                               <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChangePdf}
                                            >
                                                {initialData.sertifikat ? <img src={initialData.sertifikat} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                            </Upload>
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