import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, BackTop, Row, Col, Button, Input, Dropdown, Menu, Icon, Tabs, Card } from 'antd';
import '../../../assets/css/about.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'


const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });
const cardData = [
    {
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },{
        image: require(`../../../assets/images/card-event.png`),
        date: 'Sun, Jan 5, 8:00 Am',
        price: 'free',
        title: 'Try Out Ganesha Mulih Jogja 2020',
        lokasi: 'SMA Negeri 1 Teladan Yogyakarta'
    },

]


const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

class AboutComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/event-image1.png`);
        const image2 = require(`../../../assets/images/event-image1.png`);
        const image3 = require(`../../../assets/images/event-image1.png`);
        
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                />
                <Content style={{ overflow: "hidden" }}>
                    {/* Section 1 */}
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
            </Layout>
        );
    }
}
export default AboutComponent;