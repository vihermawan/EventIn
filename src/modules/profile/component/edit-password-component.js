import React, { Component } from 'react';
import { Layout, Row, Col, Form, Button,Select  } from 'antd';
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import InputForm from '../../../common/component/input/input-form';
import {  faUserLock, faLock } from '@fortawesome/free-solid-svg-icons';
import InputFormPassword from '../../../common/component/input/input-form-password';
// constant content
const { Content } = Layout;
const { Option } = Select;
const uploadButton = (
    <div>
      <div className="ant-upload-text">Upload Foto Eventmu</div>
    </div>
);
class EditProfilePesertaComponent extends Component {
    render() { 
      const {initialData,handleChange,handleSubmit,onStartLoadingHome,onFinishLoadingHome
      } = this.props  
      const dateFormat = 'YYYY-MM-DD';
      return ( 
        <Layout className="landing-container" style={{minHeight: "100vh"}} >
            <Navbar
                navigate={this.props.navigate}
                onStartLoadingHome={onStartLoadingHome}
                onFinishLoadingHome={onFinishLoadingHome}
            />
            <Content style={{ overflow: "hidden" }}>
             <LoadingContainer loading={initialData.loading}>
                <Row>
                    <div className="container-title-event" style={{ marginLeft: '40px', marginTop: '30px'}}>
                        <span>Edit Profile</span>
                    </div>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Row className="section-container" style={{ marginTop :'10px'}}>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Password Lama*</span>
                                </div>
                                <div>
                                    <InputFormPassword
                                        name='old_password'
                                        placeholder="Masukan password lama...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.old_password}
                                        icon={faUserLock}
                                        type="password"
                                    />
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Password Baru*</span>
                                </div>
                                <div>
                                    <InputFormPassword
                                        name='password'
                                        placeholder="Masukan password lama...."
                                        className="input-event mt-5"
                                        onChange={handleChange}
                                        value={initialData.password}
                                        icon={faLock}
                                        type="password"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="steps-action-password" style={{margin: "16px auto", textAlign: "center", Width: "200px"}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Selesai
                        </Button>
                    </div>
                </Form>
                </LoadingContainer>
            </Content>
            <Footer/>
        </Layout>
        );
    }
}
 
export default EditProfilePesertaComponent;