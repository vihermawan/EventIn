import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col,Tag } from 'antd';
import TableProfile from '../../../common/component/table/table'
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import LoadingContainer from '../../../common/component/loading/loading-container'

// constant content
const { Content } = Layout;

class WaitingCertificateComponent extends Component {
    render() { 
    const { initialData, columns, data } = this.props
        return ( 
            <Content>
                <Row style={{minHeight: '100%'}} >
                    <Col lg={24} md={24} sm={24}> 
                        <div className="container-absent">
                            <LoadingContainer loading={initialData.loading}>
                                <Row gutter={24} type="flex">
                                    <TableProfile 
                                        columns={columns} 
                                        dataSource={data} 
                                        className="table-active-event"
                                    />
                                </Row>
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default WaitingCertificateComponent;