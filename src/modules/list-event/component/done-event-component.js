import React, { Component } from 'react';
import { Layout, Row,  } from 'antd';
import TableProfile from '../../../common/component/table/table'
import LoadingContainer from '../../../common/component/loading/loading-container'
import '../../../assets/css/event.css'
// component

const { Content } = Layout;

class DoneEventComponent extends Component {
    render() { 
        const {initialData,columns,data} = this.props
        return ( 
            <Layout className="landing-container">
                <LoadingContainer loading={initialData.loadingHome}>
                    <Content style={{ overflow: "hidden" }}>
                        <Row gutter={24} type="flex">
                            <TableProfile 
                                columns={columns} 
                                dataSource={data} 
                                className="table-list-event"
                            />
                        </Row>
                    </Content>
                </LoadingContainer>
            </Layout>
        );
    }
}
export default DoneEventComponent;