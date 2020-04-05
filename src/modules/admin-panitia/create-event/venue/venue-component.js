import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Select} from 'antd';
// component
import InputForm from '../../../../common/component/input/input-form';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';


const { Content } = Layout;
const { Option } = Select;
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Balloon = () => <img width="25" src='http://speedwaymiracletournament.com/Images/cmnh-logo-no-text.png'/>;
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
                                                    defaultValue={{ key: String(initialData.venue) }}
                                                    style={{ width: '103%' }}
                                                    className="select-kategori"
                                                    onChange={handleTempat}
                                                >
                                                    <Option value="">Pilih Tempat</Option>
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
                                            <span className="auth-input-label text-black">Tempat Event*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='lokasi'
                                                placeholder="Masukan lokasi event...."
                                                className="input-location-event mt-5 mb-20"
                                                iconType="lock"
                                                onChange={handleChange}
                                                value={initialData.lokasi}
                                                icon={faMapMarker}
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