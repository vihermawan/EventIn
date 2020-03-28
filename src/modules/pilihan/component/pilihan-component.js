import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import {Link } from 'react-router-dom'
import '../../../assets/css/pilihan.css'
import CONSTANTS from '../../../common/utils/Constants';
// component
import ButtonIcon from '../../../common/component/button/button-icon';
const { Content } = Layout;


class PilihanComponent extends Component {
    render() { 
        const cardData = [
            {
                image: require(`../../../assets/images/pilih-panitia.png`),
                title: 'Panitia',   
                target : CONSTANTS.REGISTER_PANITIA_KEY,
            },
            {
                image: require(`../../../assets/images/pilih-peserta.png`),
                title: 'Peserta',
                target : CONSTANTS.REGISTER_PESERTA_KEY,
            }
        ]

        const image2 = require(`../../../assets/images/logo-white.png`);
        return ( 
            <Layout className="landing-pilih">
                <Content style={{ overflow: "hidden" }}>
                    
                    <Row className="section-pilihan">
                        <Col lg={24}>
                            <div className="text-white title-big bold pilihan-container">
                                Pilih Jadi Apa yang Kamu Mau
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div className="text-white description-pilihan">
                               <p className="text-description-pilihan">Kamu dapat memilih menjadi apa yang kamu mau, setiap orang nantinya hanya akan mempunyai 1 akun, yuk mendaftar!</p>
                            </div>
                        </Col>
                        <Col lg={24} className="card-container">
                            <Row gutter={24} type="flex" justify="center">
                                {
                                    cardData.map( data =>
                                        <Col lg={12} className="text-align-center">
                                            <div className="card-content-pilihan">
                                                <div className="image-card">
                                                <img src={data.image} alt="organizer" className="card-image-pilihan float-ease"/>
                                                </div>
                                                <div className="text-black semi-bold card-title-pilihan">
                                                    {data.title}
                                                </div>
                                                <div className="card-description-pilihan">
                                                    <ButtonIcon
                                                        text="Daftar Sekarang"
                                                        className="auth-button-red mt-0 auth-button-login"
                                                        style={{borderRadius: '10px',backgroundColor:'#FA607E',border:'none',color:'#ffff'}}
                                                        block={true}
                                                        navigate={this.props.navigate}
                                                        target={data.target}
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