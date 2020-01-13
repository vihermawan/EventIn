import React, { Component } from 'react';
import { Layout, Form, Row, Col, Input, Button } from 'antd';
import '../../../assets/css/auth.css'
// component
import InputAuth from '../../../common/component/input-auth/input-auth'
import ButtonAuth from '../../../common/component/button/button-auth'
// constant content
const { Content } = Layout;
const logo = require(`../../../assets/images/logo.png`);
const login = require(`../../../assets/images/login.png`);

class LoginComponent extends Component {
    render() { 
        const { initialData, handleChange, handleSubmit } = this.props;
        return ( 
            <Layout>
                <Content style={{ overflow: "hidden"}}>
                    <Row>
                        <Col lg={14} md={12} sm={0} xs={0} className="background-white container-full">
                            <div className="auth-image-section-container">
					            <img src={logo} alt="EventIn logo" width="100"/>
                                <div className="auth-image-container">
					                <img
                                        src={login}
                                        alt="EventIn login"
                                        style={{maxWidth: '100%'}}
                                    />
                                </div>
                                <div className="text-soft-blue title-medium text-align-center">
                                    Find a newst event nearby you
                                </div>
                            </div>
                        </Col>
                        <Col lg={10} md={12} className="background-soft-blue container-full">
                            <Form onSubmit={handleSubmit}>
                                <div className="auth-form-container">
                                    <div className="text-white text-align-center title-small mb-50">
                                        <p className="semi-bold m-0">Welcome!</p>
                                        <p>Sign in to your account</p>
                                    </div>
                                    <span className="auth-input-label text-white">Username</span>
                                    <InputAuth
                                        name='username'
                                        placeholder="username"
                                        onChange={handleChange}
                                        value={initialData.username}
                                        className="input-auth mt-5 mb-20"
                                    />
                                    <span className="auth-input-label text-white">Password</span>
                                    <InputAuth
                                        name='password'
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={initialData.password}
                                        className="input-auth mt-5"
                                        iconType="lock"
                                        type="password"
                                    />
                                    <div>
                                        <ButtonAuth
                                            text="Login"
                                            className="auth-button-red mt-50 auth-button-login"
                                            style={{borderRadius: '26px'}}
                                            block={true}
                                        />
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}
 
export default LoginComponent;