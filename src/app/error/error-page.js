import React , { Component } from 'react'
import { Layout, Row, Col } from 'antd';
import '../../assets/css/error.css'
const { Content } = Layout;
class ErrorPage extends Component {
    state = {  }

    render() {
        const error = require(`../../assets/images/error.png`);
        return (
            <Layout className="error-container">
                 <Content style={{ overflow: "hidden", minHeight:"100vh" }}>
                    <Row>
                        <Col lg={24} md={24} sm={24} className="background-white container-full">
                            <Row>
                                <div className="error-section-container">
                                    <div className="error-image-container">
                                        <img
                                            src={error}
                                            alt="EventIn login"
                                            style={{maxWidth: '100%'}}
                                        />
                                    </div>
                                </div>
                                <div className="text-soft-blue title-medium bold text-align-center">
                                    Page Not Found 404
                                </div>
                                <div className="text-soft-black title-small text-align-center thin">
                                    Back To Site
                                </div>
                            </Row>
                        </Col>
                    </Row>
                 </Content>
            </Layout>
        );
    }
}
 
export default ErrorPage