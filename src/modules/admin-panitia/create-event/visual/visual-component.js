import React, { Component } from 'react';
import { Layout, Row, Col, Upload,Form,Button,Input } from 'antd';
import ButtonDashboard from '../../../../common/component/button/button-dashboard';
import { faBackward, faUserEdit } from '@fortawesome/free-solid-svg-icons';
// component
const { Content } = Layout;

class BasicInfoComponent extends Component{
    render(){
        const { initialData,  onNext, onPrev,uploadGambar,handleButtonEdit,handleButtonGambar} = this.props;
        const uploadButton = (
            <div>
              <div className="ant-upload-text">Display Foto Event</div>
            </div>
          );
        console.log('state',initialData.picture_event)
        return (
            <Layout className="login-container">
                 <Content style={{ overflow: "hidden", backgroundColor :"white" }}>
                    <div>
                        <Form>
                            <div className="container-form">
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
                                        <div style={initialData.picture ===  null || initialData.button_edit === 'Edit Foto Profil' ? {display:"none"}:{display:"block"}}>
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
                                    </Col>
                                </Row>
                            </div>
                            <div className="steps-action">
                                <Button
                                    type="primary"
                                    onClick={() => onNext()}
                                >
                                    Next
                                </Button>
                                <Button
                                    style={{ marginLeft: 8, marginTop:0 }}
                                    onClick={() => onPrev()}
                                >
                                    Previous
                                </Button>
                            </div>
                        </Form>
                    </div>
                 </Content>
            </Layout>
        );
    }
}


export default BasicInfoComponent;