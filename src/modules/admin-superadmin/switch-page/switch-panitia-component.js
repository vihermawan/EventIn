import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col,Tabs } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faHourglass } from '@fortawesome/free-solid-svg-icons'
//import page
import ListPanitiaAdminPage from '../../../app/admin-superadmin/dashboard/listpanitia-page'
import ListBannedPanitiaPage from '../../../app/admin-superadmin/banned-page/banned-panitia-page'
// constant content
const { Content } = Layout;
const { TabPane } = Tabs;

class SwitchPanitiaComponent extends Component {
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
                    <Breadcrumb.Item><Link to='/admin/list-panitia'>Dashboard List Panitia</Link></Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event-absent">
                            <Row className="nav-absent">
                                <div className="container-title-event">
                                    <span>List Panitia</span>
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
                                            Panitia Aktif
                                        </span>}
                                        key="1"
                                        onChange={{componentDidMount}}
                                    >
                                       <ListPanitiaAdminPage/>
                                    </TabPane>
                                    <TabPane
                                    tab={ 
                                    <span> 
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            style={{marginRight: 10}}
                                        />     
                                        Panitia Banned 
                                    </span>}
                                    key="2"
                                    onChange={{componentDidMount}}
                                    > 
                                       <ListBannedPanitiaPage/>
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
 
export default SwitchPanitiaComponent;