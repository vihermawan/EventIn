import React, { Component } from 'react';
import { Layout, Row, Col, Form,Modal} from 'antd';
import '../../assets/css/admin-signer/set-password.css'
import { Link } from 'react-router-dom';
// component
import InputAuth from '../../common/component/input/input-auth'
import ButtonAuth from '../../common/component/button/button-auth'
import LoadingNotifContainer from '../../common/component/loading/loading-notif';

const { Content } = Layout;
const logo = require(`../../assets/images/logo.png`);
const login = require(`../../assets/images/forgot.svg`);


class ForgotPasswordComponent extends Component{
    render(){
        const { initialData, handleChange, handleSubmit } = this.props;
        return (
            
            <Layout className="login-container">
                {/* <LoadingContainer loading={initialData.loading}> */}
                    <Content style={{ overflow: "hidden"}}>
                        <Row>
                            <Col lg={24} md={24} sm={24} className="background-white container-full">
                                <Row>
                                    <div className="login-section-container">
                                        <Link to="/">
                                            <img src={logo} alt="EventIn logo" width="100"/>
                                        </Link>
                                       
                                        <div className="auth-image-container float-ease text-align-center">
                                        <img
                                            src={login}
                                            alt="EventIn login"
                                            style={{maxWidth: '40%'}}
                                        />
                                        </div>
                                        <div className="form-set-password text-align-center">
                                            <Form onSubmit={handleSubmit}>
                                                <div className="set-password-form-container">
                                                    <span className="auth-input-label text-set-password">Masukkan Email Anda</span>
                                                    <InputAuth
                                                        name='email'
                                                        placeholder="Masukkan Email Anda"
                                                        onChange={handleChange}
                                                        value={initialData.email}
                                                        className="input-auth mt-5"
                                                    />
                                                    <div>
                                                        <ButtonAuth
                                                            text="Send"
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
                                    title="Proses Mengirim Email"
                                    visible={initialData.show}
                                    className = "modal-notif"
                                    >
                                    <p className="text-notif">Silahkan tunggu pesan sedang dikirim ke email anda</p>
                                    <div >
                                        <LoadingNotifContainer loading={initialData.loading_notif} style={{ minHeight:'20px', marginTop:'50px',}}/>
                                    </div>
                                </Modal>
                            </Col>
                        </Row>
                    </Content>
                {/* </LoadingContainer> */}
            </Layout>
        );
    }
}


export default ForgotPasswordComponent;