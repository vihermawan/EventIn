import React, { Component } from 'react';
import { Layout, BackTop, Row, Col } from 'antd';
import { Route, Link } from 'react-router-dom'
import '../../../assets/css/pilihan.css'
// component
import Footer from '../../../common/layout/footer-landing'
import ButtonRounded from '../../../common/component/button/button-rounded'

const { Content } = Layout;
const cardData = [
    {
        image: require(`../../../assets/images/organizer.png`),
        title: 'Organizer',
        description: 'I want to organize an event here'
    },
    {
        image: require(`../../../assets/images/participant.png`),
        title: 'Participant',
        description: 'I want to participate in the events'
    }
]

class PilihanComponent extends Component {
    render() { 
        const image1 = require(`../../../assets/images/home-image1.png`);
        const image2 = require(`../../../assets/images/home-image2.png`);
        const image3 = require(`../../../assets/images/home-image3.png`);
        const bigLogo = require(`../../../assets/images/big-logo.png`);
        return ( 
            <Layout className="landing-pilih">
                <Content style={{ overflow: "hidden" }}>
                    <Row className="section-pilihan">
                        <Col lg={24} className="card-container">
                            <Row gutter={24} type="flex" justify="center">
                                {
                                    cardData.map( data =>
                                        <Col lg={12} className="text-align-center">
                                            <div className="card-content-pilihan">
                                                <img src={data.image} alt="organizer" className="card-image-pilihan"/>
                                                <div className="text-black semi-bold card-title-pilihan">
                                                    {data.title}
                                                </div>
                                                <div className="card-description-pilihan">
                                                    {data.description}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}
 
export default PilihanComponent;