import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Select} from 'antd';
// component
import InputForm from '../../../../common/component/input/input-form';
const { Content } = Layout;
const { Option } = Select;
class VenueComponent extends Component{
    render(){
        const {initialData, handleChange,handleTempat, onNext, onPrev } = this.props;
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">  
                                <Row>
                                    <Col lg={24} md={24} sm={24}>
                                        <div className="form-section-5">
                                            <div>   
                                                <span className="auth-input-label text-black">Tempat*</span>
                                            </div>
                                            <div>
                                                <Select
                                                    labelInValue
                                                    defaultValue={{ key: 'Pilih Tempat' }}
                                                    style={{ width: '103%' }}
                                                    className="select-kategori"
                                                    onChange={handleTempat}
                                                >
                                                    <Option value="Terbuka">Terbuka</Option>
                                                    <Option value="Tertutup">Tertutup</Option>
                                                </Select>,
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'20px'}}>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Lokasi Event*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='lokasi'
                                                placeholder="Masukan lokasi event...."
                                                className="input-location-event mt-5"
                                                iconType="lock"
                                                onChange={handleChange}
                                                value={initialData.lokasi}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'20px', marginBottom:'30px'}}>
                                <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Temukan Lokasi*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='map'
                                                placeholder="Ini Buat Gmaps Langitute longituted...."
                                                className="input-location-event mt-5"
                                                iconType="lock"
                                                disabled={true}
                                                onChange={handleChange}
                                                value={initialData.map}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="steps-action">
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
                            </div>
                        </Form>
                    </div>
                 </Content>
            </Layout>
        );
    }
}


export default VenueComponent;