import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Icon, Dropdown, DatePicker, TimePicker, } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../../../../assets/css/admin-panitia/component-create-event.css'
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;

class DateTimeComponent extends Component{
    render(){
        const { menu, onChange, handleOpenChange, handleClose, initialData,handleOpen2Change } = this.props;
        const format = 'HH:mm';
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">
                                <Row>
                                    <Col lg={6} md={12} sm={24}>
                                        <div className="form-section-6">
                                            <div>   
                                                <span className="auth-input-label text-black">Tanggal Mulai*</span>
                                            </div>
                                            <div>
                                                <div className="date-picker">
                                                    <Row>
                                                        <Col lg={24} md={24} sm={24}>
                                                            <DatePicker placeholder="Pilih tanggal" onChange={onChange}/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12} sm={24}>
                                        <div className="form-section-6">
                                            <div>   
                                                <span className="auth-input-label text-black">Waktu Mulai*</span>
                                            </div>
                                            <div>
                                                <div className="time-picker">
                                                    <Row>
                                                        <Col lg={24} md={24} sm={24}>
                                                            <TimePicker 
                                                                format={format} 
                                                                size="medium"
                                                                placeholder="Pilih waktu"
                                                                />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12} sm={24}>
                                        <div className="form-section-6">
                                            <div>   
                                                <span className="auth-input-label text-black">Tanggal Berakhir*</span>
                                            </div>
                                            <div>
                                                <div className="date-picker">
                                                    <Row>
                                                        <Col lg={24} md={24} sm={24}>
                                                            <DatePicker placeholder="Pilih tanggal" onChange={onChange}/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12} sm={24}>
                                        <div className="form-section-6">
                                            <div>   
                                                <span className="auth-input-label text-black">Waktu Berakhir*</span>
                                            </div>
                                            <div>
                                                <div className="time-picker">
                                                    <Row>
                                                        <Col lg={24} md={24} sm={24}>
                                                            <TimePicker 
                                                                format={format} 
                                                                size="medium"
                                                                placeholder="Pilih waktu"
                                                                />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>  
                                    </Col>
                                </Row>  
                                <Row style={{marginTop:'20px', marginBottom:'30px'}}>
                                    <Col lg={12} md={24} sm={24}>
                                        <div className="form-section-5">
                                            <div>   
                                                <span className="auth-input-label text-black">Buka Pendaftaran*</span>
                                            </div>
                                            <div>
                                                <div className="date-picker-panjang">
                                                    <Row>
                                                        <Col lg={24} md={24} sm={24}>
                                                            <DatePicker placeholder="Pilih tanggal" onChange={onChange}/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={12} md={24} sm={24}>
                                        <div className="form-section-5">
                                            <div>   
                                                <span className="auth-input-label text-black">Tutup Pendaftaran*</span>
                                            </div>
                                            <div>
                                                <div className="date-picker-panjang">
                                                    <Row>
                                                        <Col lg={24} md={24} sm={24}>
                                                            <DatePicker placeholder="Pilih tanggal" onChange={onChange}/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
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


export default DateTimeComponent;