import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col,Tabs } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons'
//import page
import ListPenandatanganAdminPage from '../../../app/admin-superadmin/dashboard/penandatangan-page'
import ListBannedPenandatanganPage from '../../../app/admin-superadmin/banned-page/banned-penandatangan-page'
// constant content
const { Content } = Layout;
const { TabPane } = Tabs;

class SwitchPenandatanganComponent extends Component {
    render() { 
        const {initialData,changeKey} = this.props;
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
                    <Breadcrumb.Item><Link to='/admin/admin-peserta'>Daftar Penandatangan</Link></Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event-absent">
                            <Row className="nav-absent">
                                <div className="container-title-event">
                                    <span>Daftar Penandatangan</span>
                                </div>
                            </Row>
                            <Row className="table-absent">
                            <Col lg={24} md={24} sm={24}> 
                                <Tabs defaultActiveKey="1" onTabClick={(key) => changeKey(key)}>
                                    <TabPane
                                        tab={ 
                                        <span> 
                                           <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                style={{marginRight: 10}}
                                            /> 
                                            Penandatangan Aktif
                                        </span>}
                                        key="1"
                                    >
                                       <ListPenandatanganAdminPage  activeKey={initialData.activeKey}/>
                                    </TabPane>
                                    <TabPane
                                    tab={ 
                                    <span> 
                                        <FontAwesomeIcon
                                            icon={faBan}
                                            style={{marginRight: 10}}
                                        />     
                                        Penandatangan Diblokir 
                                    </span>}
                                    key="2"
                                    > 
                                       <ListBannedPenandatanganPage  activeKey={initialData.activeKey}/>
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
 
export default SwitchPenandatanganComponent;