import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Modal, Col, Select } from 'antd';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'

import TableProfile from '../../../../common/component/table/table'
import LoadingContainer from '../../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;


class PesertaAdminComponent extends Component {
    render() {
        
      const {initialData, data, columns} = this.props;
    //    console.log(`selected`, initialData.id_penandatangan);
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
                    <Breadcrumb.Item>Dashboard Waiting List</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>Waiting List</span>
                            </div>
                            </Row>
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