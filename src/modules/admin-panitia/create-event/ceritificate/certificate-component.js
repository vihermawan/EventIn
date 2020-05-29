import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Form, Modal, Button, Input} from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// component
import LoadingContainer from '../../../../common/component/loading/loading-container';
import LoadingNotifContainer from '../../../../common/component/loading/loading-notif';
const { Content } = Layout;

class CertificateComponent extends Component{
    render(){
        const { initialData, 
                onPrev,
                handleSubmit,uploadGambar,
                onImageLoaded,onCropComplete,onCropChange,handleOk,handleCancel
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
                                        <div style={{marginBottom:'10px'}}> 
                                            <Row>
                                                <Col lg={21} md={24} sm={24}>
                                                    <span className="auth-input-label text-black">Upload Poster*</span>
                                                </Col>
                                            </Row>  
                                        </div>
                                    </Col>
                                    <Col lg={24} md={24} sm={24}>
                                        <div >
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
                        </Form>
                        </LoadingContainer>
                        <Modal
                            title="Proses Pembuatan Event"
                            visible={initialData.show}
                            className = "modal-notif"
                            >
                            <p className="text-notif">Silahkan tunggu 1x24 jam di email anda apakah event anda disetujui atau tidak</p>
                            <div >
                                <LoadingNotifContainer loading={initialData.loading_notif} style={{ minHeight:'20px', marginTop:'50px',}}/>
                            </div>
                        </Modal>
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