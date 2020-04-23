import React, { Component } from 'react';
import { Layout, BackTop, Row, Col } from 'antd';
import '../../../assets/css/about.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'

const { Content } = Layout;

class AboutComponent extends Component {
    render() {     
      const image1 = require(`../../../assets/images/kenapaevent.jpg`);  
      const {initialData,onStartLoadingHome ,onFinishLoadingHome} = this.props  
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                    onStartLoadingHome={onStartLoadingHome}
                    onFinishLoadingHome={onFinishLoadingHome}
                />
                <LoadingContainer loading={initialData.loadingHome}>
                  <Content style={{ overflow: "hidden", minHeight: "100vh" }}>
                      <Row className="section-container">
                        <Col lg={24} md={24} sm={24}>
                          <div className="section-picture">
                            <div className="text-description">
                              <div className="detail-text">
                                <span>Cerita di balik mengapa EventIn hadir</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row className="section-container">
                        <Col lg={8} md={12} sm={12}>
                            <div className="text-section-2 text-soft-blue">
                              <span>Semua berawal dari keresahan</span>
                            </div>
                        </Col>
                        <Col lg={16} md={12} sm={12}>
                        <div className="text-description-section-2">
                          <span>
                            Ya, semua berawal dari sebuah keresahan. 
                            Pertanyaan yang pada akhirnya menjadi awal bagi sekelompok sahabat ambisius
                            (dan juga optimis) untuk memulai perusahaan ini dari t gudang 
                            kecil sewaan di suatu tempat di Yogyakarta pada masa pandemi Corona ini.
                          </span> 
                          <br/> <br/>
                          <span>
                            Hari ini, perusahaan itu telah bertransformasi menjadi Warung Rakyat, 
                            sebuah perusahaan teknologi mobile di Yogyakarta yang menghubungkan jutaan
                            pelanggan dengan ratusan mitra toko dan juga konsumen.
                          </span> 
                          <br/> <br/>
                          <span>
                            EventIn ingin mengatasi masalah terbesar yang ada seperti ketimpangan akses, 
                            ketertinggalan infrastruktur, juga kesenjangan pendapatan.
                          </span> 
                          <br/> <br/>
                          <span>
                            Sama seperti semua orang di Indonesia, kami semua masih sangat ambisius. Kami masih bertanya tentang 
                            batasan-batasan yang ada setiap harinya, dan kami juga masih sangat optimis
                          </span> 
                        </div>
                     

                      
                        </Col>
                      </Row>
                      <Row className="section-container">
                        <Col lg={14} md={24} sm={24}>
                          <div className="picture-section-3">
                              <img
                                  src={image1}
                                  alt="Home 1"
                                  style={{maxWidth: '100%'}}
                              />
                          </div>
                        </Col>
                        <Col lg={10} md={24} sm={24}>
                          <div className="text-section-4 background-soft-blue">
                            <div className="title-section-4">
                              <span>Kenapa harus Event ?</span>
                            </div>
                            <div className="title-description-4">
                              <span> Faktanya, warung adalah sektor ekonomi pertumbuhan tercepat di Indonesia. Meskipun banyak hambatan infrastruktur yang menghadang Indonesia, lebih dari 73% penduduknya tetap yakin bahwa mereka dapat mencapai mimpi terbesar mereka. Dengan semangat ini, dan juga ambisi seperti kami, kami percaya, tak ada yang bisa menghalangi kita</span>
                              <br/><br/>
                              <span> Faktanya, warung adalah sektor ekonomi pertumbuhan tercepat di Indonesia. Meskipun banyak hambatan infrastruktur yang menghadang Indonesia, lebih dari 73% penduduknya tetap yakin bahwa mereka dapat mencapai mimpi terbesar mereka. Dengan semangat ini, dan juga ambisi seperti kami, kami percaya, tak ada yang bisa menghalangi kita</span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row className="section-container">
                        <Col lg={24} md={24} sm={24}>
                            <Row>
                              <Col lg={24} md={24} sm={24}>
                                <div className="title-section-5 text-soft-blue">
                                    <span>Bagaimana kami mendukung kemajuan ekonomi Indonesia</span>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={8} md={24} sm={24}>
                                <div className="box-section-5">
                                  <div className="title-box-section-5">
                                      <span>Kota-Kota</span>
                                  </div>
                                  <div className="description-box-section-5">
                                      <span>Menyediakan solusi teknologi guna meningkatkan dan membangun kota-kota cerdas yang lebih aman.</span>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={8} md={24} sm={24}>
                                <div className="box-section-5">
                                  <div className="title-box-section-5">
                                      <span>Kota-Kota</span>
                                  </div>
                                  <div className="description-box-section-5">
                                      <span>Menyediakan solusi teknologi guna meningkatkan dan membangun kota-kota cerdas yang lebih aman.</span>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={8} md={24} sm={24}>
                                <div className="box-section-5">
                                  <div className="title-box-section-5">
                                      <span>Kota-Kota</span>
                                  </div>
                                  <div className="description-box-section-5">
                                      <span>Menyediakan solusi teknologi guna meningkatkan dan membangun kota-kota cerdas yang lebih aman.</span>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                        </Col>
                      </Row>
                      <BackTop />
                  </Content>
                  <Footer/>
                </LoadingContainer>
            </Layout>
        );
    }
}
export default AboutComponent;