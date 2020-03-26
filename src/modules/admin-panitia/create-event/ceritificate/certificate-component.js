import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Form,Icon, Button, Input} from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// component
import InputForm from '../../../../common/component/input/input-form';
import ButtonDashboard from '../../../../common/component/button/button-dashboard';
import { faBackward, faUserEdit, faFile, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import LoadingContainer from '../../../../common/component/loading/loading-container';
const { Content } = Layout;

class CertificateComponent extends Component{
    render(){
        const { initialData, 
                handleChange, 
                onPrev,uploadFile,
                handleSubmit,uploadGambar,
                handleButtonEdit,handleButtonGambar,
                onImageLoaded,onCropComplete,onCropChange,onSelectFile
            } = this.props;
        const uploadButton = (
            <div>
              <div className="ant-upload-text">Display Foto Event</div>
            </div>
          );
        return (
            
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                    <LoadingContainer loading={initialData.loading}>
                        <Form>
                            <div className="container-form">
                                <Row>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Nama Sertifikat*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='nama_sertifikat'
                                                placeholder="Masukan nama sertifikat...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.nama_sertifikat}
                                                icon={faFile}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Deskripsi*</span>
                                        </div>
                                        <div>
                                            <InputForm
                                                name='deskripsi'
                                                placeholder="Masukan deskripsi sertifikat...."
                                                className="input-event mt-5 mb-20"
                                                onChange={handleChange}
                                                value={initialData.deskripsi}
                                                icon={faFileAlt}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>   
                                            <span className="auth-input-label text-black">Upload Sertifikat*</span>
                                        </div>
                                        <div>
                                            <Input
                                                type="file"
                                                onChange={uploadFile}
                                                className="input-picture"
                                                style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                            />
                                        </div>
                                    </Col>
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
                                        <div style={initialData.picture_event ===  null || initialData.button_edit === 'Edit Foto Profil' ? {display:"none"}:{display:"block"}}>
                                            <Input
                                                type="file"
                                                onChange={uploadGambar}
                                                className="input-picture"
                                                style={{marginBottom : '30px',padding: '4px 11px 11px 11px', minHeight:'40px',borderColor:'#2C37BA'}}
                                            />
                                            {initialData.picture && (
                                            <ReactCrop
                                                src={initialData.picture}
                                                crop={initialData.crop}
                                                ruleOfThirds
                                                onImageLoaded={onImageLoaded}
                                                onComplete={onCropComplete}
                                                onChange={onCropChange}
                                                style={{width:"30%"}}
                                            />
                                            )} 
                                             {/* {initialData.picture && (
                                                <img alt="Crop" style={{ maxWidth: '100%' }} src={initialData.picture} />
                                             )}       */}
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div>
                                            <Upload
                                                name="picture"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                disabled = {true}
                                                previewFile={initialData.picture_event}
                                            >
                                                {initialData.croppedImageUrl ? <img src={initialData.croppedImageUrl} alt="Crop" style={{ width: '10%' }} /> : uploadButton}
                                            </Upload>  
                                        </div>  
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                        </LoadingContainer>
                    </div>
                    <Button
                        type="primary"
                        onClick={() => handleSubmit()}
                    >
                        Done
                    </Button>
                    <Button
                        style={{ marginLeft: 8, marginTop:0 }}
                        onClick={() => onPrev()}
                    >
                        Previous
                    </Button>
                 </Content>
            </Layout>
        );
    }
}


export default CertificateComponent;