import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Form,Icon, Dropdown, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;
const { Dragger } = Upload;

class BasicInfoComponent extends Component{
    render(){
        const { menu,initialData, handleChange, handleSubmit,handleUpload, onNext, onPrev } = this.props;
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
                                            <Dragger {...handleUpload}>
                                                <p className="ant-upload-drag-icon">
                                                    <Icon type="inbox" />
                                                </p>
                                                <p className="ant-upload-text">Upload Poster Eventmu !</p>
                                                <p className="ant-upload-hint">Tambahkan file untuk acaramu agar terlihat menarik :)</p>
                                            </Dragger>,
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