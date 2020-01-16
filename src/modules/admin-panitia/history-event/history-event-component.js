import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Table, Tag, Col } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import TableProfile from '../../../common/component/table/table'
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
      title: 'Nama Event',
      dataIndex: 'Nama_Event',
      key: 'Nama_Event',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Kategori',
      dataIndex: 'tanggal_event',
      key: 'tanggal_event',
    },
    {
        title: 'Tempat',
        dataIndex: 'tanggal_event',
        key: 'tanggal_event',
    },
    {
      title: 'Peserta',
      dataIndex: 'tanggal_event',
      key: 'tanggal_event',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : '#87d068';
            if (tag === 'reject') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        [<ButtonIcon
            text="Download"
            height={20}
            icon={faUsers}
            borderRadius="5px"
            background="#070E57"
            marginRight= "20px"
        />,
        <ButtonIcon
            text="Delete"
            height={20}
            icon={faTrash}
            borderRadius="5px"
            background="#FF0303"
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
      tags: ['Done'],
    },
  ];
class HistoryEventComponent extends Component {
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
                    <Breadcrumb.Item>Dashboard CreateEvent</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                            <div className="container-title-event">
                                <span>History Event</span>
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
 
export default HistoryEventComponent;