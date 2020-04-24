import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Modal, Input,Upload, Button  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import ReactCrop from 'react-image-crop';
import LoadingContainer from '../../../common/component/loading/loading-container'
import InputForm from '../../../common/component/input/input-form';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faUserEdit, faBackward, faIdCard, faInfoCircle, faEnvelope, faAddressBook, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import 'moment-timezone';
import 'moment/locale/id';
import 'react-image-crop/dist/ReactCrop.css';

// constant content
const { Content } = Layout;
const uploadButton = (
    <div>
      {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">Upload Foto Eventmu</div>
    </div>
);
class EditProfileComponent extends Component {
    render() { 
      const {initialData,handleChange,uploadButton,handleButtonEdit,handleButtonGambar,uploadGambar,handleSubmit, onImageLoaded,onCropComplete,onCropChange,handleOk,handleCancel} = this.props  
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
                    <Breadcrumb.Item><Link to='/dashboard/profile/'>Dashboard Profile Panitia</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Edit Profile</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                                <div className="container-title-event">
                                    <span>Edit Profile</span>
                                </div>
                            </Row>
                     
                            <Form onSubmit={handleSubmit}>
                                <div style={{minHeight:'100vh'}}>
                                <LoadingContainer loading={initialData.loading}>
                                    <div className="container-form">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Nama Panitia*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='nama_panitia'
                                                        placeholder="Masukan nama panitia...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.nama_panitia}
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
                                                <div>   
                                                    <span className="auth-input-label text-black">Nama Organisasi*</span>
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
                                                    <span className="auth-input-label text-black">Instagram*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='instagram'
                                                        placeholder="Masukan nama instagram...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.instagram}
                                                        icon={faInfoCircle}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">No Telefon*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='telepon'
                                                        placeholder="Masukan nomor telefon...."
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
                                                    >
                                                        {initialData.croppedImageUrl ? <img src={initialData.croppedImageUrl} alt="avatar" style={{ width: '50%' }} /> : uploadButton}
                                                    </Upload>  
                                                 </div>  
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="steps-action">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Done
                                        </Button>
                                    </div>
                                    </LoadingContainer>
                                    </div>
                                </Form>
                           
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default EditProfileComponent;