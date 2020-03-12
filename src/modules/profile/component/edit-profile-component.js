import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Select, DatePicker, TimePicker,Upload, Icon, Button  } from 'antd';
import { Link } from 'react-router-dom';
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import InputForm from '../../../common/component/input/input-form';
import 'moment-timezone';
import 'moment/locale/id';
// constant content
const { Content } = Layout;
const { Option } = Select;
const { Dragger } = Upload;
const uploadButton = (
    <div>
      {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">Upload Foto Eventmu</div>
    </div>
);
class EditProfilePesertaComponent extends Component {
    render() { 
      const {initialData,handleChange,beforeUpload,handleChangeFoto} = this.props  
      const format = 'HH:mm';
      return ( 
        <Layout className="landing-container" style={{minHeight: "100vh"}} >
            <Navbar
                navigate={this.props.navigate}
            />
            <Content style={{ overflow: "hidden" }}>
             <LoadingContainer loading={initialData.loading}>
                {/* {
                    dataProfile.map( data => */}
                <Row>
                    <div className="container-title-event" style={{ marginLeft: '40px', marginTop: '30px'}}>
                        <span>Edit Profile</span>
                    </div>
                </Row>
                <Form>
                    <div>
                        <Row className="section-container" style={{ marginTop :'10px'}}>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Nama Peserta*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='nama_peserta'
                                        placeholder="Masukan nama nama_peserta...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.nama_peserta}
                                    />
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Email*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='email'
                                        placeholder="Masukan nama email...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.email}
                                    />
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Pekerjaan*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='pekerjaan'
                                        placeholder="Masukan nama email...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.pekerjaan}
                                    />
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Jenis Kelamin*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='jenis_kelamin'
                                        placeholder="Masukan nama organisasi...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.jenis_kelamin}
                                    />
                                </div>
                            </Col>
                            
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">No Telefon*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='no_telepon'
                                        placeholder="Masukan nomor telefon...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.no_telepon}
                                    />
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Foto profil*</span>
                                </div>
                                <div>

                                    <Upload
                                        name="picture"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={true}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChangeFoto}
                                        previewFile={initialData.picture}
                                    >
                                        {initialData.picture ? <img src={initialData.picture} alt="avatar" style={{ width: '10%' }} /> : uploadButton}
                                    </Upload>

                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="steps-action" style={{margin: "16px auto", textAlign: "center", Width: "200px"}}>
                        <Button
                            type="primary"
                            // onClick={() => onNext()}
                        >
                            Done
                        </Button>
                    </div>
                </Form>
                {/* )} */}
                </LoadingContainer>
            </Content>
            <Footer/>
        </Layout>
        );
    }
}
 
export default EditProfilePesertaComponent;