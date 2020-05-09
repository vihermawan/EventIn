import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Upload,Button, Input, Modal,Select  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
// component
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import InputForm from '../../../common/component/input/input-form';
import { faUserTie, faAddressCard, faAddressBook, faStickyNote, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import LoadingNotifContainer from '../../../common/component/loading/loading-notif';
// constant content
const { Content } = Layout;
const { Option } = Select;

const uploadButton = (
    <div>
      {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">Display Foto Profil</div>
    </div>
);
class CreatePenandatanganComponent extends Component {
    render() { 
      const {initialData,handleChange,handleSubmit,uploadGambar,onImageLoaded,onCropComplete,onCropChange,handleOk,handleCancel,handleProvinsi,handleKabupaten} = this.props  
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
                <Breadcrumb.Item><Link to='/dashboard/list-penandatangan/'>Dashboard Daftar Penandatangan Sertifikat</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard Buat Biodata Penandatangan</Breadcrumb.Item>
            </Breadcrumb>

            <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                <Col lg={24} md={24} sm={24}> 
                    <div className="container-active-event">
                        <Row>
                            <div className="container-title-event">
                                <span>Buat Biodata Penandatangan</span>
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
                                                            icon={faUserTie}
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
                                                        <span className="auth-input-label text-black">Nama Intansi*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='instansi'
                                                            placeholder="Masukan nama organisasi...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.instansi}
                                                            icon={faAddressCard}
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
                                                            icon={faStickyNote}
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
                                                            icon={faStickyNote}
                                                        />
                                                    </div>
                                                </Col> 
                                                <Col lg={24} md={24} sm={24}>
                                                    <div>   
                                                        <span className="auth-input-label text-black">Provinsi*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            showSearch
                                                            placeholder="Pilih Provinsi"
                                                            optionFilterProp="children"
                                                            style={{ width: '100%' }}
                                                            className="select-sertifikat mb-20"
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
                                                </Col>
                                                <Col lg={24} md={24} sm={24}>
                                                    <div>   
                                                        <span className="auth-input-label text-black">Kabupaten*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            showSearch
                                                            placeholder="Pilih Kabupaten"
                                                            optionFilterProp="children"
                                                            style={{ width: '100%' }}
                                                            className="select-sertifikat mb-20"
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
                                                    </div>
                                                </Col>
                                                <Col lg={24} md={24} sm={24}>
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
                                                            {initialData.croppedImageUrl ? <img src={initialData.croppedImageUrl} alt="Crop" style={{ width: '100%' }} /> : uploadButton}
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
                                    </Form>
                                    <Modal
                                        title="Proses Pendaftaran Penandatangan"
                                        visible={initialData.show}
                                        className = "modal-notif"
                                        >
                                        <p className="text-notif">Silahkan tunggu 1x24 jam di email anda apakah penandatangan telah disetujui atau tidak</p>
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