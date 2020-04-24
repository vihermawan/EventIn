import React, { Component } from 'react';
import { Layout,  Row, Col } from 'antd';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;


class PesertaAdminComponent extends Component {
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
 
export default PesertaAdminComponent;