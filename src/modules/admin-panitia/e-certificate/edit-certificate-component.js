import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Button,Select,Input,Modal  } from 'antd';
import { Link } from 'react-router-dom';
import { faFile} from '@fortawesome/free-solid-svg-icons';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import LoadingNotifContainer from '../../../common/component/loading/loading-notif';
import InputForm from '../../../common/component/input/input-form';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faUserEdit, faBackward , faEnvelope, faUserAlt } from '@fortawesome/free-solid-svg-icons';

// constant content
const { Content } = Layout;
const { Option } = Select;
class EditCertificateComponent extends Component {
    render() { 
      const {initialData,handleChange,handleButtonEdit,handleButtonGambar,handleEvent,handlePenandatangan,handleSubmit,uploadFile} = this.props  
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
                    <Breadcrumb.Item><Link to='/dashboard/waiting-certificate-event/'>Dashboard Sertifikat Menunggu</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Edit Sertifikat</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                                <div className="container-title-event">
                                    <span>Edit Sertifikat</span>
                                </div>
                            </Row>
                     
                            <Form onSubmit={handleSubmit}>
                                <div style={{minHeight:'100vh'}}>
                                <LoadingContainer loading={initialData.loading}>
                                    <div className="container-form">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Nama Sertifikat*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='nama'
                                                        placeholder="Masukan nama sertifikat...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.nama}
                                                        icon={faUserAlt}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Nomor Sertifikat*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='no_sertifikat'
                                                        placeholder="Masukan nomor sertifikat...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.no_sertifikat}
                                                        icon={faFile}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Pilih Event*</span>
                                                </div>
                                                <div>
                                                <Select
                                                    showSearch
                                                    placeholder="Pilih Event"
                                                    optionFilterProp="children"
                                                    style={{ width: '100%' }}
                                                    value={initialData.id_event}
                                                    className="select-sertifikat"
                                                    onChange={(input, option)=>handleEvent(input,option)}
                                                >
                                                    {
                                                        initialData.activeEvent.map( data =>     
                                                            <Option
                                                            key={data.nama_event.toString()}
                                                            value={data.id_event}
                                                            >{data.nama_event}</Option>
                                                        )
                                                    }
                                                </Select>,
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Pilih Penandatangan*</span>
                                                </div>
                                                <div>
                                                <Select
                                                    mode="multiple"
                                                    optionFilterProp="children"
                                                    style={{ width: '100%' }}
                                                    className="select-sertifikat"
                                                    placeholder="Pilih Penandatangan"
                                                    value={initialData.id_penandatangan}
                                                    onChange={(input, option)=>handlePenandatangan(input,option)}
                                                >
                                                        {
                                                        initialData.penandatangan.map( data =>     
                                                            <Option
                                                            key={data.penandatangan.nama_penandatangan.toString()}
                                                            value={data.penandatangan.id_penandatangan}
                                                            >{data.penandatangan.nama_penandatangan}</Option>
                                                        )
                                                    }
                                                </Select>,
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={{marginBottom:'10px'}}> 
                                                    <Row>
                                                        <Col lg={21} md={24} sm={24}>
                                                            <span className="auth-input-label text-black">Sertifikat*</span>
                                                        </Col>
                                                        <Col lg={3} md={24} sm={24}>
                                                            <div style={initialData.button_edit === 'Edit Foto Profil' ? {display:"block"}:{display:"none"}}>
                                                                <ButtonDashboard
                                                                    text="Edit Sertifikat"
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
                                                <div>
                                                    <InputForm
                                                        name='sertifikat'
                                                        placeholder="Masukan nama sertifikat...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.nama_display}
                                                        icon={faEnvelope}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div style={initialData.button_edit === 'Upload Gambar' || null ? {display:"block"}:{display:"none"}}>
                                                    <Input
                                                        type="file"
                                                        onChange={uploadFile}
                                                        className="input-picture"
                                                        style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                                    />       
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
                                    title="Proses Ubah Data Sertifikat"
                                    visible={initialData.show}
                                    className = "modal-notif"
                                    >
                                    <p className="text-notif">Silahkan tunggu proses perubahan data sertifikat sedang dilakukan</p>
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
 
export default EditCertificateComponent;