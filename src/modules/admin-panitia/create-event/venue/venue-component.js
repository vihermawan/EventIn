import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Select} from 'antd';
// component
import GoogleMapReact from 'google-map-react';
import InputForm from '../../../../common/component/input/input-form';
import Marker from '../../../../common/component/marker/marker'
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
                                                icon={faMapMarker}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'20px', marginBottom:'30px'}}>
                                <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Temukan Lokasi*</span>
                                        </div>
                                       
                                            {/* <InputForm
                                                name='map'
                                                placeholder="Ini Buat Gmaps Langitute longituted...."
                                                className="input-location-event mt-5"
                                                iconType="lock"
                                                disabled={true}
                                                onChange={handleChange}
                                                value={initialData.map}
                                            /> */}
                                             <div style={{ height: '100vh', width: '100%' }}>
                                                <GoogleMapReact
                                                // bootstrapURLKeys={{ key: 'AIzaSyBAXxSKTSgQnJl2DxPNybd3r_9Pm6EG_RY' }}
                                                defaultCenter={initialData.center}
                                                defaultZoom={initialData.zoom}
                                                >
                                                <Balloon 
                                                    lat={-7.7713847}
                                                    lng={110.3753111,17}
                                                    text="My Marker"
                                                    color="blue"
                                                />
                                                </GoogleMapReact>
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