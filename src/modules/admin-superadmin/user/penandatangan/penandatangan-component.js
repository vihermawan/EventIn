import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Input, Col,Tag } from 'antd';
import '../../../../assets/css/admin-panitia/active-event.css'
import { faUsers, faTrash } from '@fortawesome/free-solid-svg-icons'
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
      title: 'Nama Penandatangan',
      dataIndex: 'Nama_Event',
      key: 'Nama_Event',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Instansi',
      dataIndex: 'tanggal_event',
      key: 'tanggal_event',
    },
    {
      title: 'Jabatan',
      dataIndex: 'tanggal_event',
      key: 'tanggal_event',
    },
    {
    title: 'Jenis Kelamin',
    dataIndex: 'tanggal_event',
    key: 'tanggal_event',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        [<ButtonIcon
            text="Detail"
            height={20}
            icon={faInfoCircle}
            borderRadius="5px"
            background="#FFA903"
            marginRight= "20px"
        />,
        <ButtonIcon
            text="Delete"
            height={20}
            icon={faTrash}
            borderRadius="5px"
            background="#E11212"
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


class PenandatanganAdminComponent extends Component {
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
                                <span>List Penandatangan</span>
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
 
export default PenandatanganAdminComponent;