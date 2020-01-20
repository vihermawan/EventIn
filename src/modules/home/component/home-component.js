import React, { Component } from 'react';
import { Layout, BackTop, Row, Col } from 'antd';
import { Route, Link } from 'react-router-dom'
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
const whyData = [
    {
        image: require(`../../../assets/images/tracking.png`),
        title: 'Tracking',
        description: 'Organizer can tracks how much participant join their events'
    },
    {
        image: require(`../../../assets/images/certificate.png`),
        title: 'E-Certificate',
        description: 'Participant can get e-certificate when he done join event'
    },
    {
        image: require(`../../../assets/images/paperless.png`),
        title: 'Paperless',
        description: 'Organizer can take signatured with signer just by system'
    },
    {
        image: require(`../../../assets/images/simplifying.png`),
        title: 'Simplifying',
        description: 'Organize your event, and make your events more good'
    },
    {
        image: require(`../../../assets/images/news.png`),
        title: 'Newst Event',
        description: 'Participant can seacrh event nearby his location anything event what he wants'
    },
    {
        image: require(`../../../assets/images/both-time.png`),
        title: 'Both Time',
        description: 'Everypeople can join to be a participant or organizer'
    }
]


class HomeComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/home-image1.png`);
        const image2 = require(`../../../assets/images/home-image2.png`);
        const image3 = require(`../../../assets/images/home-image3.png`);
        const bigLogo = require(`../../../assets/images/big-logo.png`);
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                />
                <Content style={{ overflow: "hidden" }}>
                    {/* Section 1 */}
                    <Row className="section-container">
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24}>
                                    <div className="title-container">
                                        <span className="text-soft-blue title-biggest bold">Finally, </span>
                                        <br/>
                                        <span className="text-soft-blue title-big bold">a way to find best event nearby</span>
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
                                    <div className="description-container desc-big">
                                        You can find an event what do you want, and you can make event here
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="button-section-1-container">
                                    <Link to="/login">
                                        <ButtonRounded
                                            text="I want to participate"
                                            className='button-participate'
                                        />
                                    </Link>
                                    <Link to="/login">
                                        <ButtonRounded
                                            text="I want to organize"
                                            background="white"
                                            textColor="#4D5AF2"
                                            border="1px solid #4D5AF2"
                                            marginLeft={16}
                                            className='button-participate'
                                        />
                                    </Link>
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
                    {/* Section 2 */}
                    <Row className="section-container">
                        <Col lg={24}>
                            <div className="text-soft-blue title-big bold discover-container">
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
                                        <Col lg={7} className="text-align-center">
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
                    {/* Section 3 */}
                    <Row className="section-container">
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-section">
                                <img
                                    src={image2}
                                    alt="event in"
                                    style={{maxWidth: '100%'}}
                                />
                            </div>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Row className="ml-20 ml-40">
                                <Col span={24}>
                                    <div className="title-container-3 mt-20">
                                        <span className="text-soft-blue title-big bold">Event<span className="text-black">In</span></span>
                                        <br/>
                                        <span className="text-soft-blue title-medium semi-bold">We serve - connection Organizer to his event</span>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="image-hidden-3">
                                        <img
                                            src={image2}
                                            alt="eventin"
                                            style={{maxWidth: '100%'}}
                                        />
                                    </div>
                                    <div className="desc-medium description-section-3 mt-10">
                                        Make your event was easier, with EventIn your event just service with one click and service what you want.
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <ButtonRounded
                                        text="Start to Organize"
                                        className='button-organize mt-20 semi-bold'
                                    />
                                </Col>
                            </Row>
                        </Col>                        
                    </Row>

                    {/* Section 4 */}
                    <Row className="section-container">                        
                        <Col lg={12} md={12} sm={12}>
                            <Row className="mr-50 ml-40">
                                <Col span={24}>
                                    <div className="title-container-3 mt-20">
                                        <span className="text-soft-blue title-big bold">Event<span className="text-black">In</span></span>
                                        <br/>
                                        <span className="text-soft-blue title-medium semi-bold">Simplifying Participant to Join Event</span>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="image-hidden-3">
                                        <img
                                            src={image3}
                                            alt="simply participant"
                                            style={{maxWidth: '100%'}}
                                        />
                                    </div>
                                    <div className="desc-medium description-section-3 mt-10">
                                        Participant just search event what he wants to join, with one click participant can register and join event with easyly.
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <ButtonRounded
                                        text="Start to search Event ?"
                                        background="white"
                                        textColor="#4D5AF2"
                                        border="1px solid #4D5AF2"
                                        className='button-participate mt-20 semi-bold'
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <div className="image-section-4 ml-40">
                                <img
                                    src={image3}
                                    alt="simply participant"
                                    style={{maxWidth: '100%'}}
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* Section 5 */}
                    <Row className="section-container">
                        <Col lg={24}>
                            <div className="text-soft-blue title-big bold discover-container">
                                Why Event<span className="text-black">In</span>
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div className="text-black description-discover">
                                Our Missions is to make connection Participant with event and event with Organizer to make great transaction event with both
                            </div>
                        </Col>
                        <Col lg={24}>
                            <hr style={{
                                minHeight: 8,
                                backgroundColor: '#4D5AF2',
                                border: 'none',
                                maxWidth: 150,
                                borderRadius: 26,
                            }}/>
                        </Col>                        
                        <Col lg={24} className="mt-20">
                            <Row
                                type="flex" justify="center"
                                className="card-why-container"
                            >
                                {
                                    whyData.map( data =>
                                        <Col lg={8} md={12} sm={12} className="">
                                            <div className="card-why-content">
                                                <img src={data.image} alt={data.title} className="card-why-image"/>
                                                <div className="text-soft-blue semi-bold mt-10">
                                                    {data.title}
                                                </div>
                                                <div className="mt-10" style={{maxWidth:'260px'}}>
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