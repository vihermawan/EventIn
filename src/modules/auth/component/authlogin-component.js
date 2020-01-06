import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Icon, Input, } from 'antd';
import '../../../assets/css/auth-login.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'

const { Content } = Layout;

class LoginComponent extends Component{
    render(){
        const image1 = require(`../../../assets/images/login-image.png`);
        return (
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden" }}>
                    <Row style={{minHeight: '100vh'}}>
                        <Col lg={15} md={12} sm={12}>
                            <Row>
                                <Col span={24}>
                                    <div className="image-main-login">
                                        <img
                                            src={image1}
                                            alt="Home 1"
                                            style={{maxWidth: '100%'}}
                                        />
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="container-login">
                                        <span className="text-soft-blue title-login">Find a newst event nearby you </span>
                                        <br/>
                                        <span className="text-black description-login">Get ready to feel new sense</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={9} md={12} sm={12}>
                            <Row style={{backgroundColor:'#4D5AF2', paddingBottom:'100px'}}> 
                                <Col span={24}>
                                    <div className="container-form background-soft-blue">
                                        <div className="inner-form">
                                            <span className="text-white form-title">Welcome !</span>
                                            <br/>
                                            <span className="text-white form-description">Sign in to your account</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="container-form background-soft-blue">
                                            <Form layout="inline" >
                                                <Input className="inputUser" 
                                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Username"
                                                />
                                                 <Input className="inputPassword" 
                                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Password"
                                                />
                                            </Form>                                       
                                    </div>
                                    <div className="button-section-1-login">
                                        <ButtonRounded
                                            text="Login"
                                            background="#FA607E"
                                            textColor="#ffff"
                                            border="1px solid #4D5AF2"
                                            marginLeft={16}
                                            className='button-login'
                                            borderRadius={30}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                 </Content>
            </Layout>
        );
    }
}


export default LoginComponent;