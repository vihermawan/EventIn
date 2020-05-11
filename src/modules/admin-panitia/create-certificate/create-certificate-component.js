import React, { Component } from 'react';
import { Layout, Row, Col, Form, Breadcrumb, Input, Button,Select, Modal} from 'antd';
import '../../../assets/css/admin-panitia/create-certificate.css'
// component
import InputForm from '../../../common/component/input/input-form';
import { faFile, faClipboard} from '@fortawesome/free-solid-svg-icons';
import LoadingNotifContainer from '../../../common/component/loading/loading-notif';
import LoadingContainer from '../../../common/component/loading/loading-container'
const { Content } = Layout;
const { Option } = Select;
class CreateCertificateComponent extends Component{
    render(){
        const { initialData, handleChange, handlePenandatangan,uploadFile, handleSubmit, handleEvent} = this.props;
        return (
            
            <Layout className="login-container">
                <Content
                style={{
                    margin : "5px 10px 0px 10px",
                    padding: 15,
                    minHeight: 280,
                    borderRadius: "8px",
                }}
            >
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Dashboard Pengajuan Sertifikat</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Pengajuan Sertifikat</span>
                            </div>
                            </Row>
                            <div>
                                <div className="container-form">
                                <LoadingContainer loading={initialData.loading}>
                                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                                            icon={faClipboard}
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
                                        title="Proses Upload Sertifikat"
                                        visible={initialData.show}
                                        className = "modal-notif"
                                        >
                                        <p className="text-notif">Silahkan tunggu sertifikat anda sedang di upload</p>
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
            </Layout>
        );
    }
}


export default CreateCertificateComponent;