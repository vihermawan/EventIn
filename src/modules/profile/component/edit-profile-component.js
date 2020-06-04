import React, { Component } from 'react';
import { Layout, Row, Col, Form, Input,Upload, Button,Select,DatePicker,Modal  } from 'antd';
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import InputForm from '../../../common/component/input/input-form';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faUserEdit, faBackward, faIdCard, faAddressBook, faUserAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ReactCrop from 'react-image-crop';
import moment from 'moment';
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
      const {initialData,handleChange,handleSubmit,
            uploadGambar,handleJenisKelamin,handleButtonEdit,
            handleButtonGambar,onChangeBirthDate,
            onImageLoaded,onCropComplete,onCropChange,handleOk,handleCancel,onStartLoadingHome,onFinishLoadingHome
      } = this.props  
      const dateFormat = 'YYYY-MM-DD';
      return ( 
        <Layout className="landing-container" style={{minHeight: "100vh"}} >
            <Navbar
                navigate={this.props.navigate}
                onStartLoadingHome={onStartLoadingHome}
                onFinishLoadingHome={onFinishLoadingHome}
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
                                        icon={faUserAlt}
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
                                        icon={faEnvelope}
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
                                            value = { String(initialData.jenis_kelamin) }
                                            style={{ width: '100%' }}
                                            className="select-kategori "
                                            onChange={handleJenisKelamin}
                                        >   
                                            <Option value = 'Laki-Laki'>Laki-Laki</Option>
                                            <Option value = 'Perempuan'>Perempuan</Option>
                                        </Select>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <Row>
                                    <Col lg={12} md={24} sm={24}>
                                    <div className="form-section-3">
                                        <div>   
                                            <span className="auth-input-label text-black">Tanggal lahir*</span>
                                        </div>
                                        <div className="date-picker-profile">
                                            <Row>
                                                <Col lg={24} md={24} sm={24}>
                                                    <DatePicker 
                                                        style={{ width: '100%' }}
                                                        placeholder="Pilih tanggal" 
                                                        onChange={onChangeBirthDate} 
                                                        value={moment(String(initialData.tanggal_lahir), dateFormat)}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    </Col>
                                    <Col lg={12} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Umur*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='umur'
                                                disabled={true}
                                                placeholder="Masukan umur...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={moment(initialData.tanggal_lahir).month(0).from(moment().month(0),'years',true)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                               
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Pekerjaan*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='pekerjaan'
                                        placeholder="Masukan pekerjaan...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.pekerjaan}
                                        icon={faIdCard}
                                    />
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Organisasi*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='organisasi'
                                        placeholder="Masukan nama organisasi...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.organisasi}
                                        icon={faIdCard}
                                    />
                                </div>
                            </Col>
                            <Col lg={24} md={24} sm={24}>
                                <div>   
                                    <span className="auth-input-label text-black">Nomor Telepon*</span>
                                </div>
                                <div>
                                    <InputForm
                                        name='telepon'
                                        placeholder="Masukan nomor telepon...."
                                        className="input-event mt-5 mb-20"
                                        onChange={handleChange}
                                        value={initialData.telepon}
                                        icon={faAddressBook}
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
                                    <Modal
                                        title="Atur Ukuran Gambar"
                                        visible={initialData.visible}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        >
                                            {initialData.picture && (
                                            <ReactCrop
                                                src={initialData.picture}
                                                crop={initialData.crop}
                                                ruleOfThirds
                                                onImageLoaded={onImageLoaded}
                                                onComplete={onCropComplete}
                                                onChange={onCropChange}
                                                style={{width:"100%"}}
                                            />
                                        )} 
                                    </Modal>
                                    <Upload
                                        name="picture"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        disabled = {true}
                                        // previewFile={initialData.picture}
                                    >
                                        {initialData.croppedImageUrl ? <img src={initialData.croppedImageUrl} alt="avatar" style={{ width: '50%' }} /> : uploadButton}
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
                            Selesai
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