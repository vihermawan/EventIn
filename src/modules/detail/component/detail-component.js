import React, { Component } from 'react';
import { Layout, BackTop, Row, Col, Button, Card, Tag, Modal, Input, Form, Dropdown, Menu, Icon, Tabs, Statistic } from 'antd';
import '../../../assets/css/detail.css'
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import InputAuth from '../../../common/component/input/input-auth'


const { Content } = Layout;
const { Countdown } = Statistic;
const deadline = Date.now() + 5000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK


function onFinish() {
  console.log('finished!');
}


const benefitData = [
    {
        image: require(`../../../assets/images/Day.png`),
        title: 'The Day',
        description: '31 Januari- 2 Februari 2020'
    },
    {
        image: require(`../../../assets/images/location.png`),
        title: 'Venue',
        description: 'ICE BSD City Tangerang'
    },
    {
        image: require(`../../../assets/images/regis.png`),
        title: 'Registrasi',
        description: '1-20 Januari 2020'
    },
    {
        image: require(`../../../assets/images/quota.png`),
        title: 'Quota',
        description: '100 Orang'
    },
    
]

class DetailComponent extends Component {
    state = {
        visible: false,
        confirmLoading: false,
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };

    render() { 
        const image4 = require(`../../../assets/images/event1.jpg`);
        const { visible, confirmLoading, ModalText } = this.state;
        
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
                                        <span className="text-soft-blue title-big-detail">HAGE 2020 </span>
                                        <br/>
                                        <span className="text-soft-blue title-small-detail">hobbies, adventure, and gears exhibition</span>
                                    </div>
                                </Col>
                                <Col span={24} style={{ marginTop: 2 }}>
                                    <Countdown className="text-soft-blue title-small title-container-detail" title="Will be held on" value={deadline} format="D day,  H-m-s hour" />
                                </Col>
                                <Col span={24}>
                                    {/* <div className="button-detail-1-container">
                                        <ButtonRounded
                                            text="Register Now!"
                                            className='button-participate'
                                        />
                                    </div> */}
                                    <div className="button-detail-1-container">
                                        <Button className="button-participate button-regis" style={{marginTop:'2%'}} type="primary" onClick={this.showModal}>
                                            Register Now!
                                        </Button>
                                        <Modal
                                            title="HAGE 2020 (hobbies, adventure, and gears exhibition)"
                                            visible={visible}
                                            onOk={this.handleOk}
                                            confirmLoading={confirmLoading}
                                            onCancel={this.handleCancel}
                                        >
                                        <p className="bold">Apakah anda yakin akan mendaftar pada acara HAGE 2020 (hobbies, adventure, and gears exhibition) yang akan dilaksanakan pada 31 Januair-2 Februari 2020 ?</p>
                                        <p className="text-soft-blue mb-50">Total yang harus dibayar: Rp. 0,-</p>
                                        <p className="text-merah">*Setelah melakukan registrasi, jangan lupa untuk melakukan pembayaaran sesuai nominal yang tertera diatas.</p>
                                        </Modal>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-big-container-detail">
                                <img
                                    src={image4}
                                    alt="Home 1"
                                    style={{maxWidth: '100%'}}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style = {{minHeight: '100%',marginBottom: '2%', marginLeft: '5%', marginRight:'5%'}}>
                        <Col lg={24} className="card-container-detail">
                            <Card className="card-content-detail">
                                <Row gutter={24} type="flex" justify="center">
                                    {
                                        benefitData.map( data =>
                                            <Col lg={6} className="text-align">
                                                    <div className="detail-content" style={{marginLeft:'5%'}}>
                                                        <img src={data.image} alt="organizer" className="detail-image"/>
                                                        <div className="text-soft-blue bold detail-title">

                                                            {data.title}
                                                        </div>
                                                        <div className="detail-description">
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
                                <div className="title-container-detail-2">
                                    <p className="text-soft-grey title-quote-detail teks-detail">Lagi seneng banget traveling sambil nyari spot ootd di kota-kota tertentu, atau eksperimen masak terus di bungkus kreatif eh dijual dan laku!</p>
                                    <p className="text-soft-grey title-quote-detail teks-detail">Iya emang hobby orang kadang ngga cukup satu. Nah! HAGE mengerti itu, makanya hadir untuk mengerti kamu yang punya banyak hobby dan mau mengekspresikan semuanya. Bukan cuma sekedar pameran, tapi kamu bisa dapet ilmu baru tentang hobby-hobby yang kamu geluti ditambah pengalaman baru dari beragam hobby lainnya.</p>
                                    <p className="text-soft-grey title-quote-detail teks-detail">Udah kebayang serunya kaya apa? Jangan cuma dibayangin, dateng dan rasain sendiri 31 Januari – 2 Februari 2020 di ICE BSD yaaa.</p>
                                </div>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24} >
                                    <div className="title-container-nama">
                                        <span className="text-soft-blue title-big-detail">HAGE 2020 </span>
                                        <br/>
                                        <span className="text-soft-blue title-small-detail">hobbies, adventure, and gears exhibition</span>
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