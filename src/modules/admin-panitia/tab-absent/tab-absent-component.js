import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col,Tabs } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faHourglass } from '@fortawesome/free-solid-svg-icons'
//import page
import AbsentParticipantDone from '../../../app/admin-panitia/detail-page/partcipant-absent-done-page'
import AbsentParticipant from '../../../app/admin-panitia/detail-page/partcipant-absent-page'

// constant content
const { Content } = Layout;
const { TabPane } = Tabs;

class TabAbsentComponent extends Component {
    render() { 
        const {componentDidMount} = this.props;
        return ( 
            <Content
                style={{
                    margin : "5px 10px 0px 10px",
                    padding: 15,
                    minHeight: 280,
                    borderRadius: "8px",
                }}
            >
                 <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to='/dashboard/active-event'>Dashboard Active Event</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Participant Event</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event-absent">
                            <Row className="nav-absent">
                                <div className="container-title-event">
                                    <span>Absent Participant</span>
                                </div>
                            </Row>
                            <Row className="table-absent">
                            <Col lg={24} md={24} sm={24}> 
                                <Tabs defaultActiveKey="1">
                                    <TabPane
                                        tab={ 
                                        <span> 
                                           <FontAwesomeIcon
                                                icon={faHourglass}
                                                style={{marginRight: 10}}
                                            /> 
                                            Before Absent 
                                        </span>}
                                        key="1"
                                        style={{backgroundColor:'yellow'}}
                                        onChange={{componentDidMount}}
                                    >
                                        <AbsentParticipant/> 
                                    </TabPane>
                                    <TabPane
                                    tab={ 
                                    <span> 
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            style={{marginRight: 10}}
                                        />     
                                        Done Absent 
                                    </span>}
                                    key="2"
                                    onChange={{componentDidMount}}
                                    > 
                                        <AbsentParticipantDone/> 
                                    </TabPane>
                                </Tabs>,
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    
                </Row>
            </Content>
        );
    }
}
 
export default TabAbsentComponent;