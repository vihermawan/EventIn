import React, { Component } from 'react';
import { Layout, BackTop, Row, Col, Button } from 'antd';
import '../../../assets/css/home.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'

const { Content } = Layout;
const cardData = [
    {
        image: require(`../../../assets/images/organizer.png`),
        title: 'Organizer',
        description: 'Organizer make an event with funtastic, so wanna be organizer ?'
    },
    {
        image: require(`../../../assets/images/participant.png`),
        title: 'Participant',
        description: 'How many time you join event, at one or more ? Join now!'
    },
    {
        image: require(`../../../assets/images/event.png`),
        title: 'Event',
        description: 'Find Event anything event what you want to join'
    }
]

const benefitData = [
    {
        image: require(`../../../assets/images/benefit-1.png`),
        title: 'Tracking',
        description: 'Organizer can tracks how much participant join their events'
    },
    {
        image: require(`../../../assets/images/benefit-2.png`),
        title: 'E-Certificate',
        description: 'Participant can get e-certificate when he done join event'
    },
    {
        image: require(`../../../assets/images/benefit-3.png`),
        title: 'Paperless',
        description: 'Organizer can take signatured with signer just by system'
    },
    {
        image: require(`../../../assets/images/benefit-4.png`),
        title: 'Simplifying',
        description: 'Organize your event, and make your events more good'
    },
    {
        image: require(`../../../assets/images/benefit-5.png`),
        title: 'Newst Event',
        description: 'Participant can seacrh event nearby his location anything event what he wants'
    },
    {
        image: require(`../../../assets/images/benefit-6.png`),
        title: 'Both Time',
        description: 'Everypeople can join to be a participant or organizer'
    },
]


class HomeComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/home-image1.png`);
        const image2 = require(`../../../assets/images/home-image2.png`);
        const image3 = require(`../../../assets/images/home-image3.png`);
        
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                />
                <Content style={{ overflow: "hidden" }}>
                    <Row style={{minHeight: '100%',marginBottom: '9%',marginTop:'5%'}}>
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24}>
                                    <div className="title-container">
                                        <span className="text-soft-blue title-big">Finally, </span>
                                        <br/>
                                        <span className="text-soft-blue title-small">a way to find best event nearby</span>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="image-hidden">
                                        <img
                                            src={image1}
                                            alt="Home 1"
                                            style={{maxWidth: '100%'}}
                                        />
                                    </div>
                                    <div className="description-container">
                                        You can find an event what do you want, and you can make event here
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="button-section-1-container">
                                        <ButtonRounded
                                            text="I want to participate"
                                            className='button-participate'
                                        />
                                        <ButtonRounded
                                            text="I want to organize"
                                            background="white"
                                            textColor="#4D5AF2"
                                            border="1px solid #4D5AF2"
                                            marginLeft={16}
                                            className='button-participate'
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-big-container">
                                <img
                                    src={image1}
                                    alt="Home 1"
                                    style={{maxWidth: '100%'}}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{minHeight: '100%',marginBottom: '9%'}}>
                        <Col lg={24}>
                            <div className="text-soft-blue title-discover bold">
                                Discovering event with a purpose
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div className="text-black description-discover">
                                We connect your event with participant who wants to join in your event, you can manage your event and track how your event or you can join anything event what do you want
                            </div>
                        </Col>
                        <Col lg={24} className="card-container">
                            <Row gutter={24} type="flex" justify="center">
                                {
                                    cardData.map( data =>
                                        <Col lg={6} className="text-align-center">
                                            <div className="card-content">
                                                <img src={data.image} alt="organizer" className="card-image"/>
                                                <div className="text-black semi-bold card-title">
                                                    {data.title}
                                                </div>
                                                <div className="card-description">
                                                    {data.description}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row style = {{minHeight: '100%',marginBottom: '9%'}}>
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-big-container-2">
                                <img
                                    src={image2}
                                    alt="Home 2"
                                    style={{maxWidth: '80%',minHeight:'80%'}}
                                />
                            </div>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Col span={24}>
                                <div className="title-container-2">
                                    <span className="text-soft-blue title-medium">Event<span className="text-black">In</span> </span>
                                    <br/>
                                    <span className="text-soft-blue title-description">We serve - connection Organizer to his event</span>
                                    <br/>
                                    <p className="text-soft-grey title-quote">Make your event was easier, with EventIn your event just service with one click and service what you want.</p>
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="button-section-1-quote">
                                    <ButtonRounded
                                        text="Start to Organize"
                                        className='button-serve'
                                    />
                                </div>
                            </Col>
                        </Col>
                    </Row>
                    <Row style = {{minHeight: '100%',marginBottom: '9%'}}>
                        <Col lg={12} md={12} sm={12}>
                            <Col span={24}>
                                <div className="title-container-3">
                                    <span className="text-soft-blue title-medium">Event<span className="text-black">In</span> </span>
                                    <br/>
                                    <span className="text-soft-blue title-description-2">Simplifying Participant</span>
                                    <br/>
                                    <span className="text-soft-blue title-description-2"> to Join Event</span>
                                    <br/>
                                    <p className="text-soft-grey title-quote-2">Participant just search event what he wants to join, with one click participant can register and join event with easyly.</p>
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="button-section-2-quote">
                                    <ButtonRounded
                                        text="Start to Search Event ?"
                                        className='button-serve'
                                        background="white"
                                        textColor="#4D5AF2"
                                        border="1px solid #4D5AF2"
                                    />
                                </div>
                            </Col>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-big-container-1">
                                <img
                                    src={image3}
                                    alt="Home 3"
                                    style={{maxWidth: '80%',minHeight:'80%'}}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style = {{minHeight: '100%',marginBottom: '9%'}}>
                        <Col lg={24}>
                            <div className="text-soft-blue title-benefit bold">
                                Why Event<span className="text-black">In</span>
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div className="text-black description-benefit">
                            Our Missions is to make connection Participant with event and event with Organizer to make great transaction event with both
                            </div>
                        </Col>
                        <Col lg={24} className="card-container">
                            <Row gutter={24} type="flex" justify="center">
                                {
                                    benefitData.map( data =>
                                        <Col lg={8} className="text-align">
                                            <div className="benefit-content">
                                                <img src={data.image} alt="organizer" className="benefit-image"/>
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
                        </Col>
                    </Row>
                    <BackTop />
                </Content>
                <Footer/>
            </Layout>
        );
    }
}
 
export default HomeComponent;