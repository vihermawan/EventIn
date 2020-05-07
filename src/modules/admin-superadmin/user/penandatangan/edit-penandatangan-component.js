import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Select, Input,Upload, Button  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import '../../../../assets/css/admin-superadmin/detail-event.css'
// component
import LoadingContainer from '../../../../common/component/loading/loading-container'
import InputForm from '../../../../common/component/input/input-form';
import ButtonDashboard from '../../../../common/component/button/button-dashboard';
import { faUserEdit, faBackward, faMapMarker, faUserAlt, faEnvelope, faIdCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';

// constant content
const { Content } = Layout;

const uploadButton = (
    <div>
      {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">Upload Foto Eventmu</div>
    </div>
);
class EditProfileSignerAdminComponent extends Component {
    render() { 
      const {initialData,handleChange,uploadGambar,uploadP12,handleSubmit,handleButtonEdit,handleButtonGambar,handleButtonP12,handleBackP12} = this.props  
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
                    <Breadcrumb.Item><Link to='/admin/admin-penandatangan/'>Daftar Penandatangan</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Edit File p12</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                                <div className="container-title-event">
                                    <span>Edit File p12</span>
                                </div>
                            </Row>
                            <LoadingContainer loading={initialData.loading}>
                                <Form onSubmit={handleSubmit}>
                                    <div className="container-form">
                                        <Row>
                                            {/* <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Nama Penandatangan*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='nama_penandatangan'
                                                        placeholder="Masukan nama panitia...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.nama_penandatangan}
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
                                                    <span className="auth-input-label text-black">Nama Intansi*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='instansi'
                                                        placeholder="Masukan nama organisasi...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.instansi}
                                                        icon={faIdCard}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Nomor Induk Pegawai*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='nip'
                                                        placeholder="Masukan nomor nip...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.nip}
                                                        icon={faAddressBook}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Jabatan*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='jabatan'
                                                        placeholder="Masukan jabatan...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.jabatan}
                                                        icon={faIdCard}
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
                                            </Col> */}
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={{marginBottom:'5px'}}>
                                                    <Row>
                                                        <Col lg={21} md={24} sm={24}>
                                                            <div>   
                                                                <span className="auth-input-label text-black">File p12*</span>
                                                            </div>
                                                        </Col>
                                                        <Col lg={3} md={24} sm={24}>
                                                            <div style={initialData.button_p12 === 'Edit File P_12' ? {display:"block"}:{display:"none"}}>
                                                                <ButtonDashboard
                                                                    text="Edit File p12"
                                                                    height={20}
                                                                    icon={faUserEdit}
                                                                    borderRadius="5px"
                                                                    float = 'Right'
                                                                    background="#00C908"
                                                                    onClick={handleButtonP12}
                                                                />
                                                            </div>
                                                            <div style={initialData.button_p12 === 'Upload File' ? {display:"block"}:{display:"none"}}>
                                                                <ButtonDashboard
                                                                    text="Kembali Lagi"
                                                                    height={20}
                                                                    icon={faBackward}
                                                                    borderRadius="5px"
                                                                    float = 'Right'
                                                                    background="#00C908"
                                                                    onClick={handleBackP12}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={initialData.button_p12 === 'Upload File' ? {display:"none"}:{display:"block"}}>
                                                    <InputForm
                                                        name='file_p12'
                                                        placeholder="Masukan jabatan...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.file_p12}
                                                        disabled = {true}
                                                    />
                                                </div>
                                                <div style={initialData.button_p12 === 'Upload File' ? {display:"block"}:{display:"none"}}>
                                                    <Input
                                                        type="file"
                                                        name="file"
                                                        onChange={uploadP12}
                                                        // value={initialData.name_photo}
                                                        className="input-picture"
                                                        style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Kabupaten / Kota</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='kabupaten'
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.kabupaten}
                                                        icon={faMapMarker}
                                                        disabled
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Provinsi</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='provinsi'
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.provinsi}
                                                        icon={faMapMarker}
                                                        disabled
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="steps-action">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            // onClick={() => onNext()}
                                        >
                                            Done
                                        </Button>
                                    </div>
                                </Form>
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default EditProfileSignerAdminComponent;