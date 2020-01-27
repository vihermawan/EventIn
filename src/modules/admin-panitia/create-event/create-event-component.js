import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Steps,message,Col,Button, Form, Menu, Icon,Dropdown } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-panitia/create-event.css'

import InputAuth from '../../../common/component/input/input-auth'
// constant content
const { Content } = Layout;
const { Step } = Steps;

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="user" />
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="user" />
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="user" />
        3rd item
      </Menu.Item>
    </Menu>
  );

const steps = [
    {
        title: 'Basic Info',
        content: 
        <div>
            <Form>
                <Row>
                    <div className="basic-info-form">  
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Nama Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukan nama event...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </Col>
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Deskripsi Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='description'
                                    placeholder="Masukan deskripsi event...."
                                    className="input-description-event mt-5"
                                    iconType="lock"
                                    type="password"
                                />
                            </div>
                        </Col>
                    </div>
                </Row>
                <Row style={{marginTop:'20px'}}>
                    <Col lg={8} md={24} sm={24}>
                        <div className="form-section-3">
                            <div>   
                                <span className="auth-input-label text-black">Organisasi*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukkan nama organisasi...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </div>
                        
                    </Col>
                    <Col lg={8} md={24} sm={24}>
                        <div className="form-section-3">
                            <div>   
                                <span className="auth-input-label text-black">Batas Peserta*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukkan batas peserta...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={24} sm={24}>
                        <div className="form-section-4">
                            <div>   
                                <span className="auth-input-label text-black">Kategori*</span>
                            </div>
                            <div>
                                <Dropdown overlay={menu}>
                                    <div className="dropdown-category">
                                        <Button>
                                            <Row>
                                                <Col lg={22} md={24} sm={24}>
                                                    <span className="auth-dropdown-label text-black">Pilih Kategori*</span>
                                                </Col>
                                                <Col lg={2} md={24} sm={24}>
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
            </Form>
        </div>
        ,
    },
    {
        title: 'Venue',
        content: 
        <div>
            <Form>
                <Row>
                    <div className="basic-info-form">  
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Nama Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukan nama event...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </Col>
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Nama Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukan nama event...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </Col>
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Nama Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukan nama event...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </Col>
                    </div>
                </Row>
            </Form>
        </div>
        ,
    },
    {
        title: 'Date Time',
        content:
          <div>
            <Form>
                <Row>
                    <div className="basic-info-form">  
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Nama Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukan nama event...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </Col>
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Nama Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukan nama event...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </Col>
                        <Col lg={24} md={24} sm={24}>
                            <div>   
                                <span className="auth-input-label text-black">Nama Event*</span>
                            </div>
                            <div>
                                <InputAuth
                                    name='name'
                                    placeholder="Masukan nama event...."
                                    className="input-event mt-5 mb-20"
                                />
                            </div>
                        </Col>
                    </div>
                </Row>
            </Form>
        </div>
        ,
    },
    {
        title: 'Visual',
        content: 'Last-content',
    },
];

class CreateEventComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
      }
    
      next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }


    render() { 
        const { current } = this.state;
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
                    <Breadcrumb.Item>Dashboard Create Event</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Create Event</span>
                            </div>
                            </Row>
                            
                            <Row gutter={24} type="flex">
                                <div className="content-form">
                                    <Steps current={current}>
                                    {steps.map(item => (
                                        <Step key={item.title} title={item.title} />
                                    ))}
                                    </Steps>
                                    <div className="steps-content">
                                        {steps[current].content}
                                    </div>
                                        <div className="steps-action">
                                        {current < steps.length - 1 && (
                                            <Button type="primary" onClick={() => this.next()}>
                                            Next
                                            </Button>
                                        )}
                                        {current === steps.length - 1 && (
                                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                            Done
                                            </Button>
                                        )}
                                        {current > 0 && (
                                            <Button style={{ marginLeft: 8, marginTop:0 }} onClick={() => this.prev()}>
                                            Previous
                                            </Button>
                                        )}
                                     </div>
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default CreateEventComponent;