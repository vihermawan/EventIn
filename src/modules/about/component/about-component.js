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
                            <div className="text-section-2-bout text-soft-blue">
                              <span>Semua bermula dari berbagai keresahan</span>
                            </div>
                        </Col>
                        <Col lg={16} md={12} sm={12}>
                        <div className="text-description-section-2-about">
                          <span>
                            "Bisa tidak ya pengelolaan sebuah event secara keseluruhan mulai dari pembuatan 
                            event hingga pembagian sertifikat keikutsertaan peserta dilakukan pada satu platform ?"
                          </span>
                          <br/> <br/>
                          <span>
                           "Bisa tidak ya suatu orgaanisasi yang mempunyai banyak event mengelolah semua event mereka 
                            cukup pada satu sistem ?"
                          </span>
                          <br/> <br/>
                          <span>
                            "Bisa tidak ya kita mendaftarkan diri pada berbagai event melalui satu sistem saja ?"
                          </span>
                          <br/> <br/>
                          <span>
                            Ya, semua bermula dari berbagai keresahan. Keresahan yang pada akhirnya 
                            menjadi awal bagi sekelompok mahasiswa penggiat organisasi untuk menciptakan
                            sebuah sistem sebagai wadah untuk merealisasikan ide-ide mereka.
                          </span> 
                          <br/> <br/>
                          <span>
                            Sistem ini diberi nama EventIn. Sebuah sistem pengelolaan event, yang mana 
                            dapat mempermudah para organisasi dalam mengelolah event mereka. Tidak hanya 
                            itu, EventIn juga mempermudah para peserta untuk mendaftarkan diri pada berbagai 
                            event cukup melalui satu sistem.
                          </span> 
                          <br/> <br/>
                        </div>
                        </Col>
                      </Row>
                      <Row className="section-container">
                        <Col lg={14} md={24} sm={24}>
                          <div className="picture-section-3">
                              <img
                                  src={image1}
                                  alt="Home 1"
                                  height="470px"
                                  style={{minWidth: '100%'}}
                              />
                          </div>
                        </Col>
                        <Col lg={10} md={24} sm={24}>
                          <div className="text-section-4 background-soft-blue">
                            <div className="title-section-4-about">
                              <span>Kenapa harus Event ?</span>
                            </div>
                            <div className="title-description-4-about">
                              <span> 
                                Faktanya, saat mengadakan suatu event, sebuah organisasi seringkali kewalahan dalam
                                mengelolah event-nya. Pekerjaan-pekerjaan seperti perekapan data peserta, pengecekan 
                                kehadiran, permohonan penandatanganan sertifikat oleh yang berwenang, hingga pembagian
                                sertifikat keikutsertaan kepada para peserta seringkali menghabiskan banyak waktu. Dengan 
                                adanya EventIn, panitia dapat menghemat lebih banyak waktu dan tenaga. Karena semua 
                                kegiatan pengelolaan event dapat dilakukan diEventIn.
                              </span>
                              <br/><br/>
                              <span> 
                                Faktanya lagi, para maniak event seringkali ketinggalan informasi tentang suatu event
                                dikarenakan tidak adanya platform yang mengumpulkan informasi dari berbagai event dalam 
                                satu wadah. Oleh karena itu, EventIn hadir menjadi wadah bagi berbagai organisasi untuk 
                                mengiklankan event mereka. Tidak hanya itu, di EventIn peserta juga dapat langsung 
                                mendaftarkan diri atau bahkan mendownload sertifikat keikutsertaan. Sangat membantu bukan? 
                                Tunggu apa lagi? Ayo kelolah event mu bersama EventIn sekarang juga! Atau kamu daftarkan 
                                dirimu sebagai peserta agar kamu tidak ketinggalan informasi mengenai event-event keren!
                              </span>
                            </div>
                          </div>
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