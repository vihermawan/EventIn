import React, { Component } from 'react';
import { Layout, BackTop, Row, Col } from 'antd';
import { Route, Link } from 'react-router-dom'
import '../../../assets/css/pilihan.css'
// component
import ButtonAuth from '../../../common/component/button/button-auth'
const { Content } = Layout;
const cardData = [
    {
        image: require(`../../../assets/images/organizer.png`),
        title: 'Organizer',
        link :<a href="/login">Register Now !</a>
    },
    {
        image: require(`../../../assets/images/organizer.png`),
        title: 'Participant',
        link :<a href="/login">Register Now !</a>
    }
]

class PilihanComponent extends Component {
    render() { 
        const image2 = require(`../../../assets/images/logo-white.png`);
        return ( 
            <Layout className="landing-pilih">
                <Content style={{ overflow: "hidden" }}>
                    
                    <Row className="section-pilihan">
                        <Col lg={24}>
                            <div className="text-white title-big bold pilihan-container">
                                Choose Your Account
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div className="text-white description-pilihan">
                               <p className="text-description-pilihan">You can choose your account as what you want, every one people just have 1 account. So Les't register!</p>
                            </div>
                        </Col>
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
                                                    <ButtonAuth
                                                        text="Register Now"
                                                        className="auth-button-red mt-0 auth-button-login"
                                                        style={{borderRadius: '10px',backgroundColor:'#FA607E',border:'none',color:'#ffff'}}
                                                        block={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                           
                        </Col>
                        <Col lg={24}>
                            <div className="bottom-container">
                                <p className="text-description-pilihan"><Link to='/login' className="text-white">Back</Link></p>
                            </div>
                        </Col>
                    </Row>
                </Content>  
            </Layout>
        );
    }
}
 
export default PilihanComponent;