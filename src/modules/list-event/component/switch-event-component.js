import React, { Component } from 'react';
import { Layout, BackTop, Row, Col, Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faHourglass } from '@fortawesome/free-solid-svg-icons'
import '../../../assets/css/list-event.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import RegisteredEventPage from '../../../app/list-event/registered-event-page'
import RegisterEventPage from '../../../app/list-event/register-event-page'
import DoneEventPage from '../../../app/list-event/done-event-page'
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
const { TabPane } = Tabs;

const { Content } = Layout;

class SwitchEventComponent extends Component {
    render() { 
        const {initialData,onStartLoadingHome ,onFinishLoadingHome,componentDidMount,} = this.props
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                    onStartLoadingHome={onStartLoadingHome}
                    onFinishLoadingHome={onFinishLoadingHome}
                />
                <LoadingContainer loading={initialData.loadingHome}>
                    <Content style={{ overflow: "hidden" }}>
                        <Row className="section-container" style={{marginBottom: 50, marginTop:20}}>
                            <Col lg={24} md={24} sm={24}> 
                                <div className="container-list-event">
                                    <Row className="nav-absent">
                                        <div className="container-title-event">
                                            <span>List Event</span>
                                        </div>
                                    </Row>
                                    <Row className="table-list-event">
                                    <Col lg={24} md={24} sm={24}> 
                                        <div className="card-container-list">
                                            <Tabs defaultActiveKey="3" type="card">
                                                <TabPane
                                                    tab={ 
                                                    <span> 
                                                    <FontAwesomeIcon
                                                            icon={faHourglass}
                                                            style={{marginRight: 10}}
                                                        /> 
                                                        Event didaftar
                                                    </span>}
                                                    key="1"
                                                    style={{backgroundColor:'yellow'}}
                                                    onChange={{componentDidMount}}
                                                >
                                                    <RegisterEventPage/>
                                                </TabPane>
                                                <TabPane
                                                tab={ 
                                                <span> 
                                                    <FontAwesomeIcon
                                                        icon={faCheckCircle}
                                                        style={{marginRight: 10}}
                                                    />     
                                                    Event Terdaftar 
                                                </span>}
                                                key="2"
                                                onChange={{componentDidMount}}
                                                > 
                                                <RegisteredEventPage/>
                                                </TabPane>
                                                <TabPane
                                                tab={ 
                                                <span> 
                                                    <FontAwesomeIcon
                                                        icon={faCheckCircle}
                                                        style={{marginRight: 10}}
                                                    />     
                                                    Event Selesai 
                                                </span>}
                                                key="3"
                                                onChange={{componentDidMount}}
                                                > 
                                                <DoneEventPage/>
                                                </TabPane>
                                            </Tabs>,
                                        </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <BackTop />
                    </Content>
                    <Footer/>
                </LoadingContainer>
            </Layout>
        );
    }
}
export default SwitchEventComponent;