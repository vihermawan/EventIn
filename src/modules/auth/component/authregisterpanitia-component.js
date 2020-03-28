import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Icon, Input, } from 'antd';
import '../../../assets/css/auth-login.css'
// component
import InputAuth from '../../../common/component/input/input-auth'
import ButtonAuth from '../../../common/component/button/button-auth'
import { Link } from 'react-router-dom';
import LoadingContainer from '../../../common/component/loading/loading-container'
const { Content } = Layout;
const logo = require(`../../../assets/images/logo.png`);
const login = require(`../../../assets/images/panitia.png`);

class RegisterComponent extends Component{
    render(){
        const { initialData, handleChange, handleSubmit } = this.props;
        return (
            <Layout className="login-container">
                 <LoadingContainer loading={initialData.loading}>
                    <Content style={{ overflow: "hidden",maxHeight:"100vh" }}>
                        <div style={{backgroundColor:"red"}}>
                            <Row>
                                <Col lg={15} md={12} sm={12} className="background-white container-full">                             
                                    <div className="login-section-container">
                                        <img src={logo} alt="EventIn logo" width="100"/>
                                        <div className="auth-image-container mt-50 text-align-center float-ease" >
                                            <img
                                                src={login}
                                                alt="EventIn login"
                                                style={{maxWidth: '65%'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-soft-blue title-medium text-align-center">
                                        Find a newst event nearby you
                                    </div>
                                    <div className="text-soft-black title-more-small text-align-center thin">
                                        Get ready to fell new sense
                                    </div>                                
                                </Col>
                                <Col lg={9} md={12} sm={12} className="background-soft-blue container-full">
                                    <Row > 
                                        <Form onSubmit={handleSubmit}>
                                            <div className="auth-form-container">
                                                <div className="text-white text-align-center title-more-small mb-20">
                                                    <p className="title-medium semi-bold m-0">Welcome!</p>
                                                    <p className="form-description">Resiter in to your account</p>
                                                </div>
                                                <span className="auth-input-label text-white">Nama Panitia</span>
                                                <InputAuth
                                                    name='nama_panitia'
                                                    placeholder="nama panitia"
                                                    onChange={handleChange}
                                                    value={initialData.nama_panitia}
                                                    className="input-auth mt-5 mb-20"
                                                />
                                                <span className="auth-input-label text-white">Email</span>
                                                <InputAuth
                                                    name='email'
                                                    placeholder="email"
                                                    onChange={handleChange}
                                                    value={initialData.email}
                                                    className="input-auth mt-5 mb-20"
                                                    iconType="mail"
                                                />
                                                <span className="auth-input-label text-white">Password</span>
                                                <InputAuth
                                                    name='password'
                                                    placeholder="Password"
                                                    onChange={handleChange}
                                                    value={initialData.password}
                                                    className="input-auth mt-5 mb-20"
                                                    iconType="lock"
                                                    type="password"
                                                />
                                                <span className="auth-input-label text-white">Confirm Password</span>
                                                <InputAuth
                                                    name='password_confirmation'
                                                    placeholder="Confirm Password"
                                                    onChange={handleChange}
                                                    value={initialData.password_confirmation}
                                                    className="input-auth mt-5"
                                                    iconType="lock"
                                                    type="password"
                                                />
                                                <div>
                                                    <ButtonAuth
                                                        text="Register"
                                                        className="auth-button-red mt-40 auth-button-login"
                                                        style={{borderRadius: '26px',backgroundColor:'#FA607E',border:'none',color:'#ffff'}}
                                                        block={true}
                                                    />
                                                    <p className="auth-login-label mt-10 text-align-center text-white">Already have account? <Link to='/login' className="text-white"> Login Now </Link></p>
                                                </div>
                                            </div>
                                        </Form>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                 </LoadingContainer>
            </Layout>
        );
    }
}


export default RegisterComponent;