import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form } from 'antd';
import '../../../assets/css/auth-login.css'
import { Link } from 'react-router-dom';
// component
import InputAuth from '../../../common/component/input/input-auth'
import InputPassword from '../../../common/component/input/input-password'
import ButtonAuth from '../../../common/component/button/button-auth'
import LoadingContainer from '../../../common/component/loading/loading-container'
const { Content } = Layout;
const logo = require(`../../../assets/images/logo.png`);
const login = require(`../../../assets/images/login-image.png`);


class LoginComponent extends Component{
    render(){
        const { initialData, handleChange, handleSubmit } = this.props;
        return (
            
            <Layout className="login-container">
                <LoadingContainer loading={initialData.loading}>
                    <Content style={{ overflow: "hidden", minHeight:"100vh" }}>
                    <Row>
                        <Col lg={15} md={12} sm={12} className="background-white container-full">
                            <Row>
                                <div className="login-section-container">
                                    <Link to="/">
                                        <img src={logo} alt="EventIn logo" width="100"/>
                                    </Link>
                                    <div className="auth-image-container float-ease text-align-center">
					                <img
                                        src={login}
                                        alt="EventIn login"
                                        style={{maxWidth: '100%'}}
                                    />
                                    </div>
                                </div>
                                <div className="text-soft-blue title-medium text-align-center mt-30">
                                    Temukan Berbagai Event Keren
                                </div>
                            </Row>
                        </Col>
                        <Col lg={9} md={12} sm={12} className="background-soft-blue container-full">
                            <Row > 
                                <Form onSubmit={handleSubmit}>
                                    <div className="auth-form-container">
                                        <div className="text-white text-align-center title-more-small mb-50 mt-60">
                                            <p className="title-medium semi-bold m-0">Selamat Datang!</p>
                                            <p className="form-description">Bagi kamu yang telah terdaftar, silahkan masuk.</p>
                                        </div>
                                        <span className="auth-input-label text-white">Email</span>
                                        <InputAuth
                                            name='email'
                                            placeholder="Masukkan email anda"
                                            onChange={handleChange}
                                            value={initialData.email}
                                            className="input-auth mt-5 mb-20"
                                        />
                                        <span className="auth-input-label text-white">Kata Sandi</span>
                                        <InputPassword
                                            name='password'
                                            placeholder="Masukkan kata sandi anda"
                                            onChange={handleChange}
                                            value={initialData.password}
                                            className="input-auth mt-5"
                                            iconType="lock"
                                            type="password"
                                           />
                                       <Link to="/forgot-password"> <p className="auth-reminder-label mt-10 text-white">Lupa Kata Sandi?</p></Link>
                                        <div>
                                            <ButtonAuth
                                                text="Masuk"
                                                className="auth-button-red mt-35 auth-button-login"
                                                style={{borderRadius: '26px',backgroundColor:'#FA607E',border:'none',color:'#ffff'}}
                                                block={true}
                                            />
                                            <p className="auth-login-label mt-10 text-align-center text-white">Belum punya akun?<Button className="text-pink" type="link" ><Link to='/choose' className="text-white">Daftar Sekarang !</Link></Button></p>
                                            
                                        </div>
                                    </div>
                                </Form>
                            </Row>
                        </Col>
                    </Row>
                    
                 </Content>
                </LoadingContainer>
            </Layout>
        );
    }
}


export default LoginComponent;