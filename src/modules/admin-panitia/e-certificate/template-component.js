import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Icon, Col,Tag } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// constant content
const { Content } = Layout;



class TemplateCertificateComponent extends Component {
    render() { 
      const { initialData } = this.props;
      const image1 = require(`../../../assets/images/home-image1.png`);
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
                    <Breadcrumb.Item>Template E-Certificate</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Template Certificate</span>
                            </div>
                            </Row>
                            <LoadingContainer loading={false}>
                                <Row gutter={24} type="flex">
                                    <Layout className="landing-container">
                                        <Content style={{ overflow: "hidden" }}>
                                        <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%'}}>
                                                <Col lg={12} md={12} sm={12}>
                                                    <Row>
                                                        <Col span={24} >
                                                            <div className="title-container-detail-event">
                                                                <span className="detail-description">
                                                                    Pada EventIn kami menyediakan template untuk sertifikat, template ini nantinya
                                                                    dapat diunduh oleh panitia, template ini nantinya akan digunakan untuk melakukan tanda tangan digital
                                                                    serta memberikan nama secara otomatis kepada sertif sesuai dengan nama peserta serta event yang sesuai.
                                                                </span>
                                                                <br/>
                                                                <br/>
                                                                <span className="detail-description">
                                                                   Panitia yang sudah mengunduh template sertifikat, dapat mengubah desain yang ada di dalamnya. Namun tidak bisa
                                                                   melakukan perubahan pada tata letak yang sudah ditentukan dari pihak EventIn. Sertifikat yang sudah selesai
                                                                   di edit dapat diupload kembali yang nantinya akan dilakukan tanda tangan secara digital serta membuat nama secara
                                                                   otomatis. Template Sertifikat dapat di unduh dengan menekan tombol unduh pada tombol di bawah ini !
                                                                </span>
                                                            </div>
                                                        </Col>
                                                        <Col span={24}>
                                                            <div className="category-event">
                                                                <Row>
                                                                    <Col span={24} style={{ marginTop:'1%' }}>
                                                                        <div>
                                                                            <ButtonDashboard
                                                                                text="Download"
                                                                                height={20}
                                                                                icon={faInfoCircle}
                                                                                borderRadius="5px"
                                                                                background="#4D5AF2"
                                                                                // onClick={ }
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col span={24} style={{ marginTop:'4%' }}>
                                                                        <div>
                                                                            <p>More Info : </p>
                                                                            <p className="text-soft-blue">
                                                                                <Icon type="instagram" /> @EventIn
                                                                            </p>
                                                                            <p className="text-soft-blue">
                                                                                <Icon type="ie" /> eventin@gmail.com
                                                                            </p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={12} md={12} sm={12}>
                                                    <div className="image-big-container-detail">
                                                        <img
                                                            src={image1}
                                                            alt="Home 1"
                                                            style={{maxWidth: '100%'}}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Content>
                                    </Layout>
                                </Row>
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default TemplateCertificateComponent;