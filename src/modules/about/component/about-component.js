import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, BackTop, Row } from 'antd';
import '../../../assets/css/about.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'

const { Content } = Layout;

class AboutComponent extends Component {
    render() {       
      const {initialData,onStartLoadingHome ,onFinishLoadingHome} = this.props  
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                    onStartLoadingHome={onStartLoadingHome}
                    onFinishLoadingHome={onFinishLoadingHome}
                />
                <LoadingContainer loading={initialData.loadingHome}>
                  <Content style={{ overflow: "hidden" }}>
                      <Row>
                          <p className="text-soft-grey title-quote-judul teks-judul">Get in touch</p>
                          <p className="text-soft-grey title-quote-about teks-about">HeroSoftMedia – Digital Marketing Agency adalah konsultan pemasaran digital yang membantu Anda sukses di media online dan mengoptimalisasi website dengan menggunakan strategi yang tepat sasaran dan hasil terukur.</p>
                          <p className="text-soft-grey title-quote-about teks-about">Sebagai Google Partner Pertama di Jawa Tengah, kami menggabungkan strategi pemasaran, ide kreatif, teknik analisa, perkembangan teknologi, keahlian dan pengalaman, menjadi satu layanan menyeluruh berfokus pada hasil yang terukur .</p>
                          <p className="text-soft-grey title-quote-about teks-about">HeroSoftMedia – Digital Marketing Agency adalah konsultan pemasaran digital yang membantu Anda sukses di media online dan mengoptimalisasi website dengan menggunakan strategi yang tepat sasaran dan hasil terukur.</p>
                          <p className="text-soft-grey title-quote-about teks-about">Sebagai Google Partner Pertama di Jawa Tengah, kami menggabungkan strategi pemasaran, ide kreatif, teknik analisa, perkembangan teknologi, keahlian dan pengalaman, menjadi satu layanan menyeluruh berfokus pada hasil yang terukur .</p>
                          <p style={{marginBottom:'5%'}} className="text-soft-grey title-quote-about teks-about">Kami melayani berbagai skala usaha, baik dari perorangan hingga multinasional. Strategi yang kami usulkan mengacu pada berbagai tujuan pemasaran yang Anda inginkan, mulai dari branding (memperkenalkan usaha dimuka umum) hingga penjualan langsung.</p>
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