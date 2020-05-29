import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form,  Button,Modal  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import LoadingNotifContainer from '../../../common/component/loading/loading-notif';
import { faUserLock, faLock } from '@fortawesome/free-solid-svg-icons';
import 'moment-timezone';
import 'moment/locale/id';
import 'react-image-crop/dist/ReactCrop.css';
import InputFormPassword from '../../../common/component/input/input-form-password';

// constant content
const { Content } = Layout;

class EditProfileComponent extends Component {
    render() { 
      const {initialData,handleChange,handleSubmit} = this.props  
      return ( 
            <Content
                style={{
                    margin : "5px 10px 0px 10px",
                    padding: 15,
                    minHeight: 280,
                    borderRadius: "8px",
                }}
            >
                <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to='/signer/profile/'>Dashboard Profile Penandatangan</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Edit Password</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                                <div className="container-title-event">
                                    <span>Edit Password</span>
                                </div>
                            </Row>
                     
                            <Form onSubmit={handleSubmit}>
                                <div style={{maxHeight:'100vh'}}>
                                    <div className="container-form">
                                        <Row>
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
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.password}
                                                        icon={faLock}
                                                        type="password"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="steps-action">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Done
                                        </Button>
                                    </div>
                                    </div>
                                </Form>
                                <Modal
                                    title="Proses Perubahan Password"
                                    visible={initialData.show}
                                    className = "modal-notif"
                                    >
                                    <p className="text-notif">Proses perubahan password sedang dilakukan, silahkan tunggu</p>
                                    <div >
                                        <LoadingNotifContainer loading={initialData.loading_notif} style={{ minHeight:'20px', marginTop:'50px',}}/>
                                    </div>
                                </Modal>
                           
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default EditProfileComponent;