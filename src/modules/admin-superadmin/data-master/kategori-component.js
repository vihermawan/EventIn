import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col } from 'antd';

/*import css*/
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
/*import component*/
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import TableProfile from '../../../common/component/table/table'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// constant content
const { Content } = Layout;

class KategoriComponent extends Component {
    render() { 
        const {initialData, columns, data} = this.props;
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
                    <Breadcrumb.Item>Dashboard Panitia</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Received</span>
                            </div>
                            </Row>
                            <Row gutter={24} type="flex">
                                <TableProfile 
                                    columns={columns} 
                                    dataSource={data} 
                                    className="table-active-event"
                                />
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default KategoriComponent;