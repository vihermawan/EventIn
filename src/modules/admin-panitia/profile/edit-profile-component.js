import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Modal, Input,Upload, Button,Avatar  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import ReactCrop from 'react-image-crop';
import LoadingContainer from '../../../common/component/loading/loading-container'
import LoadingNotifContainer from '../../../common/component/loading/loading-notif';
import InputForm from '../../../common/component/input/input-form';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faUserEdit, faBackward, faIdCard, faAddressBook, faUserAlt, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import 'moment-timezone';
import 'moment/locale/id';
import 'react-image-crop/dist/ReactCrop.css';

// constant content
const { Content } = Layout;
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
                    <Breadcrumb.Item><Link to='/dashboard/profile/'>Dashboard Profil Panitia</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Edit Profil</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                                <div className="container-title-event">
                                    <span>Edit Profil</span>
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
                                                        icon={faEnvelopeOpenText}
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
                                                        icon={faInstagram}
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
                                                        {initialData.croppedImageUrl ?  <Avatar shape="square" size={300} src={initialData.croppedImageUrl} classname="profile-picture" icon="user" style={{ width: '50%' }}/> : uploadButton}
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
                                <Modal
                                    title="Proses Perubahan Data Profil"
                                    visible={initialData.show}
                                    className = "modal-notif"
                                    >
                                    <p className="text-notif">Proses perubahan data profil sedang dilakukan, silahkan tunggu</p>
                                    <div >
                                        <LoadingNotifContainer loading={initialData.loading_notif} style={{ minHeight:'20px', marginTop:'50px',}}/>
                                    </div>
                                </Modal>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default EditProfileComponent;