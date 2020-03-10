import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Form,Icon,Button,message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// component
const { Content } = Layout;
const { Dragger } = Upload;

class BasicInfoComponent extends Component{
    render(){
        const { initialData, onChangePhoto, onNext, onPrev,beforeUpload,handleChangeFoto } = this.props;
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
                                            {/* <Dragger
                                                name='file'
                                                multiple={true}
                                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                                onChange={onChangePhoto}
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <Icon type="inbox" />
                                                </p>
                                                <p className="ant-upload-text">Upload Poster Eventmu !</p>
                                                <p className="ant-upload-hint">Tambahkan file untuk acaramu agar terlihat menarik :)</p>
                                            </Dragger>, */}
                                       
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChangeFoto}
                                            >
                                                {initialData.imageUrl ? <img src={initialData.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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