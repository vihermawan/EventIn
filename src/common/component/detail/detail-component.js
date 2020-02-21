import React, { Component } from 'react';
import { Layout, Row, Col, Button, Card, Tag, Modal, Icon,  Statistic } from 'antd';
import './style.css';

const { Content } = Layout;
class DetailComponent extends Component {
   

    render(){

    const benefitData = [
        {
            image: require(`../../../assets/images/day.png`),
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
    const image4 = require(`../../../assets/images/event1.jpg`);
        return (
            <Layout className="landing-container">
                <Content style={{ overflow: "hidden" }}>
                    <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%'}}>
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24} >
                                    <div className="title-container-detail-event">
                                        <span className="text-soft-blue title-big-detail">HAGE 2020 </span>
                                        <br/>
                                        <span className="text-soft-blue title-small-detail">hobbies, adventure, and gears exhibition</span>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="category-event">
                                        <Row>
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
                    <Row style = {{minHeight: '100%',marginBottom: '2%', marginRight:'5%'}}>
                        <Col lg={12} md={24} sm={24}>
                            <div className="desc-event">
                                <p className="text-soft-grey title-quote-detail teks-detail">
                                    Lagi seneng banget traveling sambil nyari spot ootd di kota-kota tertentu, atau eksperimen masak terus di bungkus kreatif eh dijual dan laku! 
                                    Iya emang hobby orang kadang ngga cukup satu. Nah! HAGE mengerti itu, makanya hadir untuk mengerti kamu yang punya banyak hobby dan mau mengekspresikan semuanya. Bukan cuma sekedar pameran, tapi kamu bisa dapet ilmu baru tentang hobby-hobby yang kamu geluti ditambah pengalaman baru dari beragam hobby lainnya.
                                    Udah kebayang serunya kaya apa? Jangan cuma dibayangin, dateng dan rasain sendiri 31 Januari – 2 Februari 2020 di ICE BSD yaaa
                                </p>
                            </div>
                        </Col>
                        <Col lg={12} md={24} sm={24}>
                            <Card className="card-content-detail-event">
                                <Row gutter={24} type="flex" justify="center">
                                    {
                                        benefitData.map( data =>
                                            <Col lg={12} className="text-align">
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
                </Content>
            </Layout>
        )
    }
}

export default DetailComponent;