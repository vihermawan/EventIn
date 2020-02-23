import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col,Icon,Tabs } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'

//import page
import AbsentParticipantDone from '../../../app/admin-panitia/detail-page/partcipant-absent-done-page'
import AbsentParticipant from '../../../app/admin-panitia/detail-page/partcipant-absent-page'

// constant content
const { Content } = Layout;
const { TabPane } = Tabs;

class TabAbsentComponent extends Component {
    render() { 
        const {renderTabBar} = this.props;
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
                    <Breadcrumb.Item>Dashboard Active Event</Breadcrumb.Item>
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
                                        tab={ <span> <Icon type="apple" />Before Absent </span>}
                                        key="1"
                                        style={{backgroundColor:'yellow'}}
                                    >
                                        <AbsentParticipant/> 
                                    </TabPane>
                                    <TabPane
                                    tab={ <span> <Icon type="apple" />Done Absent </span>}
                                    key="2"
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