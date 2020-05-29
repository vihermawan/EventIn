import React, { Component } from 'react';
import { Layout, Row, Col, Modal, Form } from 'antd';
import '../../assets/css/admin-signer/set-password.css'
import { Link } from 'react-router-dom';
// component
import InputPassword from '../../common/component/input/input-password'
import ButtonAuth from '../../common/component/button/button-auth'
import LoadingNotifContainer from '../../common/component/loading/loading-notif';

const { Content } = Layout;
const logo = require(`../../assets/images/logo.png`);
const login = require(`../../assets/images/set-password.svg`);


class SetPasswordComponent extends Component{
    render(){
        const { initialData, handleChange, handleSubmit } = this.props;
        return (
            
            <Layout className="login-container">
                <Content style={{ overflow: "hidden"}}>
                    <Row>
                        <Col lg={24} md={24} sm={24} className="background-white container-full">
                            <Row>
                                <div className="login-section-container">
                                    <Link to="/">
                                        <img src={logo} alt="EventIn logo" width="100"/>
                                    </Link>
                                    
                                    <div className="auth-image-container float-ease text-align-center mt-30">
                                    <img
                                        src={login}
                                        alt="EventIn login"
                                        style={{maxWidth: '100%'}}
                                    />
                                    </div>
                                    <div className="form-set-password text-align-center">
                                        <Form onSubmit={handleSubmit}>
                                            <div className="set-password-form-container">
                                                <span className="auth-input-label text-set-password">Masukkan kata sandi baru</span>
                                                <InputPassword
                                                    name='password'
                                                    placeholder="Masukkan Password Anda"
                                                    onChange={handleChange}
                                                    value={initialData.password}
                                                    className="input-auth mt-5"
                                                    iconType="lock"
                                                    type="password"
                                                />
                                                <div>
                                                    <ButtonAuth
                                                        text="Submit"
                                                        className="auth-button-red mt-35 auth-button-login"
                                                        style={{borderRadius: '10px',backgroundColor:'#FA607E',border:'none',color:'#ffff',width:"50%"}}
                                                        block={true}
                                                    />
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Row>
                            <Modal
                                title="Proses Mengubah Password"
                                visible={initialData.show}
                                className = "modal-notif"
                                >
                                <p className="text-notif">Silahkan tunggu perubahan password sedang di proses</p>
                                <div >
                                    <LoadingNotifContainer loading={initialData.loading_notif} style={{ minHeight:'20px', marginTop:'50px',}}/>
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}


export default SetPasswordComponent;