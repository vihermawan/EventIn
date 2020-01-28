import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col,Tag } from 'antd';
import '../../../../assets/css/dashboard-all/dashboard.css'
import '../../../../assets/css/dashboard-all/table-style.css'
import { faUsers, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../../common/component/button/button-icon'
import TableProfile from '../../../../common/component/table/table'
// constant content
const { Content } = Layout;
const columns = [
    {
        title: 'No',
        dataIndex: 'Nomor',
        key: 'Nomor',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Nama Panitia',
        dataIndex: 'Nama_Event',
        key: 'Nama_Event',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Organisasi',
        dataIndex: 'tanggal_event',
        key: 'tanggal_event',
    },
    {
        title: 'Email',
        dataIndex: 'tanggal_event',
        key: 'tanggal_event',
    },
    {
        title: 'No Telepon',
        dataIndex: 'tanggal_event',
        key: 'tanggal_event',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            [<ButtonIcon
                text="Edit"
                height={20}
                icon={faPen}
                borderRadius="5px"
                background="#005568"
                marginRight= "20px"
            />,
            <ButtonIcon
                text="Detail"
                height={20}
                icon={faInfoCircle}
                borderRadius="5px"
                background="#FFA903"
            />]
      ),
    },
  ];
const data = [
    {
      key: '1',
      Nomor : '1',
      Nama_Event: 'UGMTalks',
      tanggal_event :'2020-10-11',
    },
  ];


class ListPanitiaComponent extends Component {
    render() { 
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
                    <Breadcrumb.Item>Dashboard List Penandatangan</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>List Panitia</span>
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
 
export default ListPanitiaComponent;