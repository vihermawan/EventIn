import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Select, Upload,Button, Input, Modal  } from 'antd';
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
import ButtonAuth from '../../../common/component/button/button-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import LoadingNotifContainer from '../../../common/component/loading/loading-notif';
// constant content
const { Content } = Layout;
const { Option } = Select;
const { Dragger } = Upload;
const uploadButton = (
    <div>
      {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">Display Foto Profil</div>
    </div>
);
class CreatePenandatanganComponent extends Component {
    render() { 
      const {initialData,handleChange,beforeUpload,handleChangeFoto,handleSubmit, onChange,uploadGambar} = this.props  
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
                <Breadcrumb.Item><Link to='/dashboard/list-penandatangan/'>Dashboard List Penandatangan</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard Create Biodata Penandatangan</Breadcrumb.Item>
            </Breadcrumb>

            <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                <Col lg={24} md={24} sm={24}> 
                    <div className="container-active-event">
                        <Row>
                            <div className="container-title-event">
                                <span>Create Signer</span>
                            </div>
                        </Row>       
                     
                            <div style={{minHeight:'100vh'}}>
                                <div className="container-form">
                                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="container-form">
                                            <Row>
                                                <Col lg={24} md={24} sm={24}>
                                                    <div>   
                                                        <span className="auth-input-label text-black">Nama Penandatangan*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='nama'
                                                            placeholder="Masukan nama penandatangan...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.nama}
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
                                                        <span className="auth-input-label text-black">Nama Intansi*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='instansi'
                                                            placeholder="Masukan nama organisasi...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.instansi}
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
                                                            icon={
                                                                <FontAwesomeIcon
                                                                    icon={faUser}
                                                                /> 
                                                            }
                                                            previewFile={initialData.picture}
                                                        >
                                                            {initialData.picture ? <img src={initialData.picture} alt="avatar" style={{ width: '50%' }} /> : uploadButton}
                                                        </Upload>  
                                                       
                                                        {/* <Avatar
                                                            size={64}
                                                            src={initialData.picture}
                                                            icon={
                                                                <FontAwesomeIcon
                                                                    icon={faUser}
                                                                /> 
                                                            }
                                                        /> */}

                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="steps-action">
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                // onClick={() => handleSubmit()}
                                            >
                                                Done
                                            </Button>
                                        </div>
                                    </Form>
                                    <Modal
                                        title="Proses Penerimaan Peserta"
                                        visible={initialData.visible}
                                        className = "modal-notif"
                                        >
                                        <p className="text-notif">Mohon tunggu sebentar, sistem akan mengirimkan email untuk peserta...</p>
                                        <div >
                                            <LoadingNotifContainer loading={initialData.loading_notif} style={{ minHeight:'20px', marginTop:'50px',}}/>
                                        </div>
                                    </Modal>
                                
                                </div>
                            </div>
                       
                    
                    </div>
                </Col>
            </Row>
        </Content>
        );
    }
}
 
export default CreatePenandatanganComponent;