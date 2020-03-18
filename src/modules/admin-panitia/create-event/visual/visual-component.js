import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Form,Icon,Button,Input } from 'antd';
// component
const { Content } = Layout;
const { Dragger } = Upload;

class BasicInfoComponent extends Component{
    render(){
        const { initialData,  onNext, onPrev,uploadGambar } = this.props;
        const uploadButton = (
            <div>
              {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
              <div className="ant-upload-text">Upload Foto Eventmu</div>
            </div>
          );
        console.log('state',initialData.picture_event)
        return (
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">
                                <Row>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Upload Poster*</span>
                                        </div>
                                        <div>
                                        <Input
                                            type="file"
                                            onChange={uploadGambar}
                                            className="input-picture"
                                            style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                        />
                                        <Upload
                                            name="picture"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            disabled = {true}
                                            previewFile={initialData.picture}
                                        >
                                            {initialData.picture ? <img src={initialData.picture} alt="avatar" style={{ width: '30%' }} /> : uploadButton}
                                        </Upload>
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


export default BasicInfoComponent;