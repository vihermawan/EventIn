import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form, DatePicker, TimePicker, } from 'antd';
import '../../../../assets/css/admin-panitia/component-create-event.css'
import moment from 'moment';
const { Content } = Layout;

class DateTimeComponent extends Component{
    render(){
        const {onNext,initialData, onPrev, onChangeTimeStart,onChangeTimeEnd,onChangeDateStart,onChangeDateEnd,onChangeDateRegisStart,onChangeDateRegistEnd, disabledDate} = this.props;
        const format = 'HH:mm';
        const dateFormat = 'YYYY-MM-DD';
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
                                                            <DatePicker 
                                                                placeholder="Pilih tanggal" 
                                                                onChange={onChangeDateStart} 
                                                                defaultValue={moment(String(initialData.start_event), dateFormat)}
                                                                disabledDate={disabledDate}
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
                                                                onChange={onChangeTimeStart}
                                                                defaultValue={moment(String(initialData.time_start), format)}
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
                                                            <DatePicker 
                                                                placeholder="Pilih tanggal" 
                                                                onChange={onChangeDateEnd} 
                                                                defaultValue={moment(String(initialData.end_event), dateFormat)}
                                                                disabledDate={disabledDate}
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
                                                                onChange={onChangeTimeEnd}
                                                                defaultValue={moment(String(initialData.time_end), format)}
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
                                                            <DatePicker 
                                                                placeholder="Pilih tanggal" 
                                                                onChange={onChangeDateRegisStart} 
                                                                defaultValue={moment(String(initialData.open_registration), dateFormat)}
                                                                disabledDate={disabledDate}
                                                            />
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
                                                            <DatePicker 
                                                                placeholder="Pilih tanggal" 
                                                                onChange={onChangeDateRegistEnd} 
                                                                defaultValue={moment(String(initialData.end_registration), dateFormat)}
                                                                disabledDate={disabledDate}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Button
                                type="primary"
                                onClick={() => onNext()}
                            >
                                Next
                            </Button>
                            <Button
                                style={{ marginLeft: 8, marginTop:0 }}
                                onClick={() => onPrev()}
                            >
                                Previous
                            </Button>
                        </Form>
                    </div>
                 </Content>
            </Layout>
        );
    }
}


export default DateTimeComponent;