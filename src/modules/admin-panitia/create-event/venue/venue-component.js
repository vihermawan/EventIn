import React, { Component } from 'react';
import { Layout, Row, Col, Button, Form,Select} from 'antd';
// component
import InputForm from '../../../../common/component/input/input-form';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';


const { Content } = Layout;
const { Option } = Select;

class VenueComponent extends Component{
    render(){
        const {initialData, handleChange,handleTempat, onNext, onPrev, handleProvinsi, handleKabupaten } = this.props;
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
                                                <span className="auth-input-label text-black">Ruangan*</span>
                                            </div>
                                            <div>
                                                <Select
                                                    labelInValue
                                                    defaultValue={{ key: String(initialData.venue) }}
                                                    style={{ width: '103%' }}
                                                    className="select-kategori mb-20"
                                                    onChange={handleTempat}
                                                >
                                                    <Option value="">Pilih Ruangan</Option>
                                                    <Option value="Terbuka">Terbuka</Option>
                                                    <Option value="Tertutup">Tertutup</Option>
                                                </Select>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div className="form-section-5">
                                            <div>   
                                                <span className="auth-input-label text-black">Provinsi*</span>
                                            </div>
                                            <div>
                                            <Select
                                                showSearch
                                                placeholder="Pilih Provinsi"
                                                optionFilterProp="children"
                                                style={{ width: '103%' }}
                                                className="select-sertifikat mb-20"
                                                value={initialData.id_provinsi}
                                                onChange={(input, option)=>handleProvinsi(input,option)}
                                            >
                                                <Option value="">Pilih Provinsi</Option>
                                                {
                                                    initialData.provinsi.map( data =>     
                                                        <Option
                                                        key={data.provinsi.toString()}
                                                        value={data.id_provinsi}
                                                        >{data.provinsi}</Option>
                                                    )
                                                }
                                            </Select>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div className="form-section-5">
                                            <div>   
                                                <span className="auth-input-label text-black">Kabupaten*</span>
                                            </div>
                                            <div>
                                            <Select
                                                showSearch
                                                placeholder="Pilih Kabupaten"
                                                optionFilterProp="children"
                                                style={{ width: '103%' }}
                                                className="select-sertifikat mb-20"
                                                value={initialData.id_kabupaten}
                                                onChange={(input, option)=>handleKabupaten(input,option)}
                                            >
                                                <Option value="">Pilih Kabupaten</Option>
                                                {
                                                    initialData.kabupaten.map( data =>     
                                                        <Option
                                                        key={data.kabupaten_kota.toString()}
                                                        value={data.id_kabupaten}
                                                        >{data.kabupaten_kota}</Option>
                                                    )
                                                }
                                            </Select>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Tempat Event*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='lokasi'
                                                placeholder="Masukan lokasi event...."
                                                className="input-location-event mb-20"
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