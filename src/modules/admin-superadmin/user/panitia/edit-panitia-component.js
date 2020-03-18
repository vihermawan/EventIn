import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Input,Upload, Button  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import '../../../../assets/css/admin-superadmin/detail-event.css'
// component
import LoadingContainer from '../../../../common/component/loading/loading-container'
import InputForm from '../../../../common/component/input/input-form';
import 'moment-timezone';
import 'moment/locale/id';
// constant content
const { Content } = Layout;
const uploadButton = (
    <div>
      {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">Upload Foto Eventmu</div>
    </div>
);
const { Dragger } = Upload;

class EditProfilePanitiaAdminComponent extends Component {
    render() { 
      const {initialData,handleChange,beforeUpload,handleChangeFoto,uploadGambar} = this.props  
      const format = 'HH:mm';
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
                    <Breadcrumb.Item><Link to='/admin/list-panitia'>Dashboard List Panitia</Link></Breadcrumb.Item>
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
                            <LoadingContainer loading={initialData.loading}>
                                <Form>
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
                                                    <span className="auth-input-label text-black">Nama Organisasi*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='organisasi'
                                                        placeholder="Masukan nama organisasi...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.organisasi}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Media Sosial*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='instagram'
                                                        placeholder="Masukan nama instagram...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.instagram}
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
                                                    <Input
                                                        type="file"
                                                        onChange={uploadGambar}
                                                        className="input-picture"
                                                        style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                                    />
                                                    <Upload
                                                        name="picture"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        disabled = {true}
                                                        previewFile={initialData.picture}
                                                    >
                                                        {initialData.picture ? <img src={initialData.picture} alt="avatar" style={{ width: '30%' }} /> : uploadButton}
                                                    </Upload>  
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="steps-action">
                                        <Button
                                            type="primary"
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
 
export default EditProfilePanitiaAdminComponent;