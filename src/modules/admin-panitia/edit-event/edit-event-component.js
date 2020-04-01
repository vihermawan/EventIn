import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Select, DatePicker, TimePicker,Upload, Icon, Button,Input  } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-superadmin/detail-event.css'
import '../../../assets/css/admin-panitia/edit-event.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import InputForm from '../../../common/component/input/input-form';
import 'moment-timezone';
import 'moment/locale/id';
// constant content
const { Content } = Layout;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;
class EditEventComponent extends Component {
    render() { 
      const {initialData,handleChange,handleKategori,handleStatus,handleBank,onChangeTimeStart,onChangeTimeEnd,onChangeDateStart,onChangeDateEnd,onChangeDateRegisStart,onChangeDateRegistEnd,handleUpload,beforeUpload,handleChangePdf,handleTempat} = this.props  
      const format = 'HH:mm';
      const uploadButton = (
        <div>
          {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <div className="ant-upload-text">Upload Foto Eventmu</div>
        </div>
      );
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
                    <Breadcrumb.Item><Link to='/dashboard/active-event'>Dashboard Active Event</Link></Breadcrumb.Item>
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
                                <Form>
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
                                                            labelInValue
                                                            defaultValue={{ key: String(initialData.kategori_input) }}
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
                                        <Row>
                                            <Col lg={24} md={24} sm={24}>
                                                <div className="kategori-bayar mb-20">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Kategori Bayar*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            labelInValue
                                                            defaultValue={{ key: 'Pilih Kategori' }}
                                                            style={{ width: '100%' }}
                                                            className="select-kategori "
                                                            onChange={handleStatus}
                                                        >
                                                            <Option value="paid">Berbayar</Option>
                                                            <Option value="free">Tidak Berbayar</Option>
                                                        </Select>,
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={initialData.status_biaya === 'paid' || null ? {display:"block"}:{display:"none"}} className="kategori-bayar mb-20">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Bank*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            labelInValue
                                                            defaultValue={{ key: 'Pilih Bank' }}
                                                            style={{ width: '100%' }}
                                                            className="select-kategori"
                                                            onChange={handleBank}
                                                        >
                                                            <Option value="Mandiri">Mandiri</Option>
                                                            <Option value="BNI">BNI</Option>
                                                            <Option value="BCA">BCA</Option>
                                                            <Option value="BRI">BRI</Option>
                                                        </Select>,
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={24} md={24} sm={24}>
                                                <div style={initialData.status_biaya === 'paid' || null ? {display:"block"}:{display:"none"}} className="kategori-bayar mb-20">
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
                                                <div className="kategori-bayar">
                                                    <div>   
                                                        <span className="auth-input-label text-black">Tempat*</span>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            labelInValue
                                                            defaultValue={{ key: String(initialData.venue) }}
                                                            style={{ width: '100%' }}
                                                            className="select-kategori"
                                                            onChange={handleTempat}
                                                        >
                                                            <Option value="">Pilih Tempat</Option>
                                                            <Option value="Terbuka">Terbuka</Option>
                                                            <Option value="Tertutup">Tertutup</Option>
                                                        </Select>,
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
                                                        name='location'
                                                        placeholder="Masukan lokasi event...."
                                                        className="input-event mt-5"
                                                        iconType="lock"
                                                        onChange={handleChange}
                                                        value={initialData.location}
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
                                                                    onChange={onChangeDateEnd}
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
                                                                        style={{width:"100%"}}
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
                                                                        onChange={onChangeDateRegistEnd}
                                                                        style={{width:"100%"}}
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
                                                <div>   
                                                    <span className="auth-input-label text-black">Upload Poster*</span>
                                                </div>
                                                <div>
                                                    <Dragger {...handleUpload}>
                                                        <p className="ant-upload-drag-icon">
                                                            <Icon type="inbox" />
                                                        </p>
                                                        <p className="ant-upload-text">Upload Poster Eventmu !</p>
                                                        <p className="ant-upload-hint">Tambahkan file untuk acaramu agar terlihat menarik :)</p>
                                                    </Dragger>,
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
                                        {/* <Button
                                            style={{ marginLeft: 8, marginTop:0 }}
                                            onClick={() => onPrev()}
                                        >
                                            Previous
                                        </Button> */}
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
 
export default EditEventComponent;