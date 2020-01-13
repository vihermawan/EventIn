import React, { Component } from 'react';
import { Layout, BackTop, Row, Col, Button, Card, Tag, Input, Dropdown, Menu, Icon, Tabs, Statistic } from 'antd';
import '../../../assets/css/detail.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'


const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;
const { Countdown } = Statistic;
const deadline = Date.now() + 5000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
  console.log('finished!');
}

const cardData = [
    {
        image: require(`../../../assets/images/ava.png`),
        title: 'Organizer',
        description: 'Organizer make an event with funtastic, so wanna be organizer ?'
    }
]

const benefitData = [
    {
        image: require(`../../../assets/images/Day.png`),
        title: 'The Day',
        description: '31 Januari- 2 Februari 2020'
    },
    {
        image: require(`../../../assets/images/Location.png`),
        title: 'Vanue',
        description: 'ICE BSD City Tangerang'
    },
    {
        image: require(`../../../assets/images/Regis.png`),
        title: 'Registrasi',
        description: '1-20 Januari 2020'
    },
    {
        image: require(`../../../assets/images/Quota.png`),
        title: 'Quota',
        description: '100 Orang'
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

class DetailComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/home-image1.png`);
        const image2 = require(`../../../assets/images/home-image2.png`);
        const image3 = require(`../../../assets/images/home-image3.png`);
        const image4 = require(`../../../assets/images/event1.jpg`);
        
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                />
                <Content style={{ overflow: "hidden" }}>
                    <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%'}}>
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24} >
                                    <div className="title-container-detail">
                                        <span className="text-soft-blue title-big">HAGE 2020 </span>
                                        <br/>
                                        <span className="text-soft-blue title-small">hobbies, adventure, and gears exhibition</span>
                                    </div>
                                </Col>
                                <Col span={24} style={{ marginTop: 2 }}>
                                    <Countdown className="text-soft-blue title-small title-container-detail" title="Will be held on" value={deadline} format="D day,  H-m-s hour" />
                                </Col>
                                <Col span={24}>
                                    <div className="button-section-1-container">
                                        <ButtonRounded
                                            text="Register Now!"
                                            className='button-participate'
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-big-container">
                                <img
                                    src={image4}
                                    alt="Home 1"
                                    style={{maxWidth: '100%'}}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style = {{minHeight: '100%',marginBottom: '2%', marginLeft: '5%', marginRight:'5%'}}>
                        <Col lg={24} className="card-container">
                            <Card className="card-content2">
                                <Row gutter={24} type="flex" justify="center">
                                    {
                                        benefitData.map( data =>
                                            <Col lg={6} className="text-align">
                                                    <div className="benefit-content" style={{marginLeft:'5%'}}>
                                                        <img src={data.image} alt="organizer" className="benefit-image-detail"/>
                                                        <div className="text-soft-blue bold benefit-title">
                                                            {data.title}
                                                        </div>
                                                        <div className="benefit-description">
                                                            {data.description}
                                                        </div>
                                                    </div>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%'}}> 
                        <Col lg={12} md={12} sm={12}>
                            <Row style={{marginLeft:'12%', marginTop:'4%'}}>
                                <div className="title-container-2">
                                    <p className="text-soft-grey title-quote teks-detail">Lagi seneng banget traveling sambil nyari spot ootd di kota-kota tertentu, atau eksperimen masak terus di bungkus kreatif eh dijual dan laku!</p>
                                    <p className="text-soft-grey title-quote teks-detail">Iya emang hobby orang kadang ngga cukup satu. Nah! HAGE mengerti itu, makanya hadir untuk mengerti kamu yang punya banyak hobby dan mau mengekspresikan semuanya. Bukan cuma sekedar pameran, tapi kamu bisa dapet ilmu baru tentang hobby-hobby yang kamu geluti ditambah pengalaman baru dari beragam hobby lainnya.</p>
                                    <p className="text-soft-grey title-quote teks-detail">Udah kebayang serunya kaya apa? Jangan cuma dibayangin, dateng dan rasain sendiri 31 Januari – 2 Februari 2020 di ICE BSD yaaa.</p>
                                </div>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24} >
                                    <div className="title-container-nama">
                                        <span className="text-soft-blue title-big">HAGE 2020 </span>
                                        <br/>
                                        <span className="text-soft-blue title-small">hobbies, adventure, and gears exhibition</span>
                                    </div>
                                </Col>
                                <Col span={24} style={{ marginTop:'1%' }}>
                                    <div>
                                        <Tag color="blue">Free</Tag>
                                        <Tag color="blue">Adventure</Tag>
                                        <Tag color="blue">Exhibition</Tag>
                                        <Tag color="blue">Hobby</Tag>
                                    </div>
                                </Col>
                                <Col span={24} style={{ marginTop:'4%' }}>
                                    <div>
                                        <p>More Info : </p>
                                        <p className="text-soft-blue">
                                            <Icon type="instagram" /> @ice_indonesia 
                                        </p>
                                        <p className="text-soft-blue">
                                            <Icon type="ie" /> ice-indonesia.com 
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <BackTop />
                </Content>
                <Footer/>
            </Layout>
        );
    }
}
export default DetailComponent;