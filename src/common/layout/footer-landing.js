import React from 'react';
import { Row, Col } from 'antd';
// style
import './style/footer-style.css';

function Footer({
    
}) {
    const logo = require(`../../assets/images/logo-white.png`);
    return (
        <Row className="background-soft-blue footer-container text-white pb-30" type="flex" justify="center">
            <Col lg={7} md={24} sm={24} xs={24} className="text-align-center mt-30">
                <img src={logo} alt="EventIn logo" width="100"/>
            </Col>
            <Col lg={10} md={10} sm={12} xs={13} className="mt-30">
                <Row>
                <Col lg={12} md={12} sm={12}>
                    <p className="footer-title semi-bold">Service</p>
                    <p>Event</p>
                    <p>E-Certificate</p>
                    <p>Organizer</p>
                </Col>
                <Col lg={12} md={12} sm={12}>
                    <p className="footer-title semi-bold">Media Sosial</p>
                    <p> <a href="https://www.facebook.com/eventin.eventin.357" className="text-white">Facebook </a></p>
                    <p> <a href="https://twitter.com/EventIn4" className="text-white">Twitter </a></p>
                    <p> <a href="https://instagram.com/service.eventin" className="text-white">Instagram </a></p>
                </Col>
                </Row>
            </Col>
            <Col lg={7} md={6} sm={6} xs={13} className="mt-30">
                <p className="footer-title semi-bold">Kontak</p>
                <p>Place : Yogyakarta Indonesia</p>
                <p>Phone : 083849971010</p>
                <p>Email : eventin@mail.com</p>
            </Col>
        </Row>
    );
}

export default Footer;