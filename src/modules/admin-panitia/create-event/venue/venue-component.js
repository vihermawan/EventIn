import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;

class VenueComponent extends Component{
    render(){
        const { menu,initialData, handleChange, handleSubmit } = this.props;
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">  
                                <Row>
                                    <Col lg={12} md={24} sm={24}>
                                        <div className="form-section-5">
                                            <div>   
                                                <span className="auth-input-label text-black">Tempat*</span>
                                            </div>
                                            <div>
                                                <Dropdown overlay={menu}>
                                                    <div className="dropdown-category">
                                                        <Button>
                                                            <Row>
                                                                <Col lg={23} md={24} sm={24}>
                                                                    <span className="auth-dropdown-label text-black">Pilih Tempat*</span>
                                                                </Col>
                                                                <Col lg={1} md={24} sm={24}>
                                                                    <Icon type="down" style={{color:"#4D5AF2"}}/>
                                                                </Col>
                                                            </Row>
                                                        </Button>
                                                    </div>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={12} md={24} sm={24}>
                                        <div className="form-section-5">
                                            <div>   
                                                <span className="auth-input-label text-black">Akses*</span>
                                            </div>
                                            <div>
                                                <Dropdown overlay={menu}>
                                                    <div className="dropdown-category">
                                                        <Button>
                                                            <Row>
                                                                <Col lg={23} md={24} sm={24}>
                                                                    <span className="auth-dropdown-label text-black">Pilih Akses*</span>
                                                                </Col>
                                                                <Col lg={1} md={24} sm={24}>
                                                                    <Icon type="down" style={{color:"#4D5AF2"}}/>
                                                                </Col>
                                                            </Row>
                                                        </Button>
                                                    </div>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'20px', marginBottom:'30px'}}>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Lokasi Event*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='location'
                                                placeholder="Masukan lokasi event...."
                                                className="input-location-event mt-5"
                                                iconType="lock"
                                                onChange={handleChange}
                                                value={initialData.location}
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


export default VenueComponent;