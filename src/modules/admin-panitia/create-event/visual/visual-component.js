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
                                            <span className="auth-input-label text-black">Upload Poster*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='name'
                                                placeholder="Masukan nama event...."
                                                className="input-event mt-5 mb-20"
                                            />
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