import React, { Component } from 'react';
import { Layout, Row, Col, Form, Input,Upload, Button,Select  } from 'antd';
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
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faUserEdit, faBackward } from '@fortawesome/free-solid-svg-icons';
// constant content
const { Content } = Layout;
const { Option } = Select;
const uploadButton = (
    <div>
      <div className="ant-upload-text">Upload Foto Eventmu</div>
    </div>
);
class EditProfilePesertaComponent extends Component {
    render() { 
      const {initialData,handleChange,handleSubmit,uploadGambar,handleJenisKelamin,handleButtonEdit,handleButtonGambar} = this.props  
      const format = 'HH:mm';
      return ( 
        <Layout className="landing-container" style={{minHeight: "100vh"}} >
            <Navbar
                navigate={this.props.navigate}
            />
            <Content style={{ overflow: "hidden" }}>
             <LoadingContainer loading={initialData.loading}>
                <Row>
                    <div className="container-title-event" style={{ marginLeft: '40px', marginTop: '30px'}}>
                        <span>Edit Profile</span>
                    </div>
                </Row>
                <Form onSubmit={handleSubmit}>
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
                                <div className="kategori-bayar mb-20">
                                    <div>   
                                        <span className="auth-input-label text-black">Jenis Kelamin*</span>
                                    </div>
                                    <div className="select-value">
                                        <Select
                                            labelInValue 
                                            defaultValue = {{ key: 'state' }}
                                            style={{ width: '100%' }}
                                            className="select-kategori "
                                            onChange={handleJenisKelamin}
                                        >   
                                            <Option value = 'state' style={initialData.jenis_kelamin === 'state' ? {display:"none"}:{display:"block"}}>{initialData.jenis_kelamin}</Option>
                                            <Option value = 'Laki-Laki' style={initialData.jenis_kelamin === 'Laki-Laki' ? {display:"none"}:{display:"block"}}>Laki-Laki</Option>
                                            <Option value = 'Perempuan' style={initialData.jenis_kelamin === 'Perempuan' ? {display:"none"}:{display:"block"}}>Perempuan</Option>
                                        </Select>,
                                    </div>
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
                                <div style={{marginBottom:'10px'}}> 
                                    <Row>
                                        <Col lg={21} md={24} sm={24}>
                                            <span className="auth-input-label text-black">Foto profil*</span>
                                        </Col>
                                        <Col lg={3} md={24} sm={24}>
                                            <div style={initialData.button_edit === 'Edit Foto Profil' ? {display:"block"}:{display:"none"}}>
                                                <ButtonDashboard
                                                    text="Edit Foto Profil"
                                                    height={20}
                                                    icon={faUserEdit}
                                                    borderRadius="5px"
                                                    float = 'Right'
                                                    background="#00C908"
                                                    onClick={handleButtonEdit}
                                                />
                                            </div>
                                            <div style={initialData.button_edit === 'Upload Gambar' ? {display:"block"}:{display:"none"}}>
                                                <ButtonDashboard
                                                    text="Kembali Lagi"
                                                    height={20}
                                                    icon={faBackward}
                                                    borderRadius="5px"
                                                    float = 'Right'
                                                    background="#00C908"
                                                    onClick={handleButtonGambar}
                                                />
                                            </div>
                                        </Col>
                                    </Row>  
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div style={initialData.button_edit === 'Upload Gambar' || null ? {display:"block"}:{display:"none"}}>
                                    <Input
                                        type="file"
                                        onChange={uploadGambar}
                                        className="input-picture"
                                        style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                    />       
                                    </div>
                                    <div>
                                    <Upload
                                        name="picture"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        disabled = {true}
                                        previewFile={initialData.picture}
                                    >
                                        {initialData.picture ? <img src={initialData.picture} alt="avatar" style={{ width: '50%' }} /> : uploadButton}
                                    </Upload>  
                                    </div>  
                            </Col>
                        </Row>
                    </div>
                    <div className="steps-action" style={{margin: "16px auto", textAlign: "center", Width: "200px"}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Done
                        </Button>
                    </div>
                </Form>
                </LoadingContainer>
            </Content>
            <Footer/>
        </Layout>
        );
    }
}
 
export default EditProfilePesertaComponent;