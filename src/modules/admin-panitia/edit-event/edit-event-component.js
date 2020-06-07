import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Select, DatePicker, TimePicker,Upload, Icon, Button,Input, Modal  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
import '../../../assets/css/admin-panitia/edit-event.css'
// component
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import LoadingContainer from '../../../common/component/loading/loading-container'
import LoadingNotifContainer from '../../../common/component/loading/loading-notif';
import InputForm from '../../../common/component/input/input-form';
import moment from 'moment';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faBackward, faUserEdit, faStickyNote, faIdCard, faUserFriends, faAddressBook,  faWallet, faMapMarker, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
// constant content
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

class EditEventComponent extends Component {
    render() { 
      const {initialData,handleChange,
             handleKategori,handleStatus,
             handleBank,onChangeTimeStart,
             onChangeTimeEnd,onChangeDateStart,onChangeDateEnd,
             onChangeDateRegisStart,onChangeDateRegistEnd,onImageLoaded,onCropComplete,onCropChange,handleOk,handleCancel,
             handleTempat,uploadGambar,handleButtonEdit,handleButtonGambar,handleSubmit,uploadButton,handleKabupaten,handleProvinsi,disabledDate} 
     = this.props  
     const format = 'HH:mm';
     const dateFormat = 'YYYY-MM-DD';
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
                    <Breadcrumb.Item><Link to='/dashboard/active-event'>Dashboard Event Berjalan</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Edit Event</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                                <div className="container-title-event">
                                    <span>Edit Event</span>
                                </div>
                            </Row>
                            <LoadingContainer loading={initialData.loading}>
                                <Form onSubmit={handleSubmit}>
                                    <div className="container-form">
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Nama Event*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='nama'
                                                        placeholder="Masukan nama event...."
                                                        className="input-event mt-5 mb-20"
                                                        onChange={handleChange}
                                                        value={initialData.nama}
                                                        icon={faStickyNote}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Deskripsi Event*</span>
                                                </div>
                                                <div>
                                                    <TextArea 
                                                        name='description'
                                                        placeholder="Masukan deskripsi event...."
                                                        className="input-description-event mt-5"
                                                        rows={5}
                                                        onChange={handleChange}
                                                        value={initialData.description}
                                                        style={{borderColor: "#4D5AF2"}}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:'20px'}}>
                                            <Col lg={8} md={24} sm={24}>
                                                <div className="form-section-3">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Organisasi*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='organisasi'
                                                            placeholder="Masukkan nama organisasi...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.organisasi}
                                                            icon={faIdCard}
                                                        />
                                                    </div>
                                                </div>   
                                            </Col>
                                            <Col lg={8} md={24} sm={24}>
                                                <div className="form-section-3">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Batas Peserta*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='batas_peserta'
                                                            placeholder="Masukkan batas peserta...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.batas_peserta}
                                                            icon={faUserFriends}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={24} sm={24}>
                                                <div className="form-section-4">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Kategori*</span>
                                                    </div>
                                                    <div className="select-kategori">
                                                        <Select
                                                            value={String(initialData.kategori_input)}
                                                            style={{ width: '100%' }}
                                                            className="select-kategori"
                                                            onChange={handleKategori}
                                                        >
                                                            <Option value="">Pilih Kategori</Option>
                                                            <Option value="1">Olahraga</Option>
                                                            <Option value="2">Musik</Option>
                                                            <Option value="3">Budaya</Option>
                                                            <Option value="4">Game</Option>
                                                            <Option value="5">Seni</Option>
                                                            <Option value="6">Teknologi</Option>
                                                            <Option value="7">Pendidikan</Option>
                                                            <Option value="8">Agama</Option>
                                                        </Select>,
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:'10px'}}>
                                            <Col lg={8} md={24} sm={24}>
                                                <div className="form-section-3">
                                                    <div>   
                                                        <span className="auth-input-label text-black">No Telepon*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='no_telepon'
                                                            placeholder="Masukkan nomor telepon...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.no_telepon}
                                                            icon={faAddressBook}
                                                        />
                                                    </div>
                                                </div>   
                                            </Col>
                                            <Col lg={8} md={24} sm={24}>
                                                <div className="form-section-3">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Email Event*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='email_event'
                                                            placeholder="Masukkan email event...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.email_event}
                                                            icon={faEnvelopeOpenText}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={24} sm={24}>
                                                    <div>   
                                                        <span className="auth-input-label text-black">Instagram*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='instagram'
                                                            placeholder="Masukkan akun instagram...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.instagram}
                                                            icon={faInstagram}
                                                        />
                                                    </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="kategori-bayar mb-20">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Kategori Bayar*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            value={String(initialData.status_biaya)}
                                                            style={{ width: '100%' }}
                                                            className="select-kategori "
                                                            onChange={handleStatus}
                                                        >
                                                            <Option value ="">Pilih Kategori</Option>
                                                            <Option value ='10'>Berbayar</Option>
                                                            <Option value='9'>Tidak Berbayar</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={initialData.status_biaya === '10' || null ? {display:"block"}:{display:"none"}} className="kategori-bayar mb-20">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Biaya*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='biaya'
                                                            placeholder="Masukkan biaya...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value= {initialData.biaya}
                                                            icon={faWallet}
                                                        />
                                                    </div>
                                                    <div>   
                                                        <span className="auth-input-label text-black">Bank*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            value={String(initialData.bank)}
                                                            style={{ width: '100%' }}
                                                            className="select-kategori"
                                                            onChange={handleBank}
                                                        >
                                                            <Option value ="-">Pilih Bank</Option>
                                                            <Option value="Mandiri">Mandiri</Option>
                                                            <Option value="BNI">BNI</Option>
                                                            <Option value="BCA">BCA</Option>
                                                            <Option value="BRI">BRI</Option>
                                                        </Select>,
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={initialData.status_biaya === '10' || null ? {display:"block"}:{display:"none"}} className="kategori-bayar mb-20">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Nomor Rekening*</span>
                                                    </div>
                                                    <div>
                                                        <InputForm
                                                            name='rekening'
                                                            placeholder="Masukkan nama rekening...."
                                                            className="input-event mt-5 mb-20"
                                                            onChange={handleChange}
                                                            value={initialData.rekening}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
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
                                                        value={initialData.id_provinsi}
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
                                                <div style={initialData.id_provinsi === '' ? {display:"none"}:{display:"block"}}>
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
                                                        value={initialData.id_kabupaten}
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
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="kategori-bayar">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Tempat*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            value={String(initialData.venue)}
                                                            style={{ width: '100%' }}
                                                            className="select-kategori"
                                                            onChange={handleTempat}
                                                        >
                                                            <Option value="">Pilih Tempat</Option>
                                                            <Option value="Terbuka">Terbuka</Option>
                                                            <Option value="Indoor">Tertutup</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:'20px', marginBottom:'30px'}}>
                                            <Col lg={24} md={24} sm={24}>
                                                <div>   
                                                    <span className="auth-input-label text-black">Lokasi Event*</span>
                                                </div>
                                                <div>
                                                    <InputForm
                                                        name='lokasi'
                                                        placeholder="Masukan lokasi event...."
                                                        className="input-event mt-5"
                                                        iconType="lock"
                                                        onChange={handleChange}
                                                        value={initialData.lokasi}
                                                        icon={faMapMarker}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col lg={6} md={12} sm={24}>
                                                <div className="form-edit-section-6">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Tanggal Mulai*</span>
                                                    </div>
                                                    <div>
                                                        <div className="date-picker-edit">
                                                            <Row>
                                                                <Col lg={24} md={24} sm={24}>
                                                                    <DatePicker 
                                                                        placeholder="Pilih tanggal" 
                                                                        onChange={onChangeDateStart} 
                                                                        value={moment(String(initialData.start_event), dateFormat)}
                                                                        disabledDate={disabledDate}
                                                                        style={{width:"100%"}}/>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={6} md={12} sm={24}>
                                                <div className="form-edit-section-6">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Waktu Mulai*</span>
                                                    </div>
                                                    <div>
                                                        <div className="time-picker-edit">
                                                            <Row>
                                                                <Col lg={24} md={24} sm={24}>
                                                                    <TimePicker 
                                                                        format={format} 
                                                                        size="medium"
                                                                        placeholder="Pilih waktu"
                                                                        onChange={onChangeTimeStart}
                                                                        style={{width:"100%"}}
                                                                        value={moment(String(initialData.time_start), format)}
                                                                        />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={6} md={12} sm={24}>
                                                <div className="form-edit-section-6">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Tanggal Berakhir*</span>
                                                    </div>
                                                    <div>
                                                        <div className="date-picker-edit">
                                                            <Row>
                                                                <Col lg={24} md={24} sm={24}>
                                                                    <DatePicker 
                                                                        placeholder="Pilih tanggal"
                                                                        value={moment(String(initialData.end_event), dateFormat)}
                                                                        onChange={onChangeDateEnd}
                                                                        disabledDate={disabledDate}
                                                                        style={{width:"100%"}}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={6} md={12} sm={24}>
                                                <div className="form-edit">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Waktu Berakhir*</span>
                                                    </div>
                                                    <div>
                                                        <div className="time-picker-edit">
                                                            <Row>
                                                                <Col lg={24} md={24} sm={24}>
                                                                    <TimePicker 
                                                                        value={moment(String(initialData.time_end), format)}
                                                                        format={format} 
                                                                        size="medium"
                                                                        placeholder="Pilih waktu"
                                                                        onChange={onChangeTimeEnd}
                                                                        style={{width:"100%"}}
                                                                        />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </Col>
                                        </Row>  
                                        <Row style={{marginTop:'20px', marginBottom:'30px'}}>
                                            <Col lg={12} md={24} sm={24}>
                                                <div className="form-section-5">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Buka Pendaftaran*</span>
                                                    </div>
                                                    <div>
                                                        <div className="date-picker-edit">
                                                            <Row>
                                                                <Col lg={24} md={24} sm={24}>
                                                                    <DatePicker 
                                                                        placeholder="Pilih tanggal" 
                                                                        onChange={onChangeDateRegisStart} 
                                                                        disabledDate={disabledDate}
                                                                        style={{width:"100%"}}
                                                                        value={moment(String(initialData.open_registration), dateFormat)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={12} md={24} sm={24}>
                                                <div className="form-section-5-edit">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Tutup Pendaftaran*</span>
                                                    </div>
                                                    <div>
                                                        <div className="date-picker-edit">
                                                            <Row>
                                                                <Col lg={24} md={24} sm={24}>
                                                                    <DatePicker 
                                                                        placeholder="Pilih tanggal" 
                                                                        disabledDate={disabledDate}
                                                                        onChange={onChangeDateRegistEnd}
                                                                        style={{width:"100%"}}
                                                                        value={moment(String(initialData.end_registration), dateFormat)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={{marginBottom:'10px'}}> 
                                                    <Row>
                                                        <Col lg={21} md={24} sm={24}>
                                                            <span className="auth-input-label text-black">Upload Poster*</span>
                                                        </Col>
                                                        <Col lg={3} md={24} sm={24} style={initialData.picture === null ? {display:"none"}:{display:"block"}}>
                                                            <div style={initialData.button_edit === 'Edit Foto Profil' ? {display:"block"}:{display:"none"}}>
                                                                <ButtonDashboard
                                                                    text="Upload Foto Event"
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
                            </LoadingContainer>
                            <Modal
                                title="Proses Perubahan Data Event"
                                visible={initialData.show}
                                className = "modal-notif"
                                >
                                <p className="text-notif">Proses perubahan event sedang dilakukan, silahkan tunggu</p>
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
 
export default EditEventComponent;