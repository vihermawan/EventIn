import React, { Component } from 'react';
import { Layout, BackTop, Row, Col,Icon, Tag } from 'antd';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../../../assets/css/profile.css'
// component
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import TableProfile from '../../../common/component/table/table'
import ButtonIcon from '../../../common/component/button/button-icon'
import ButtonRounded from '../../../common/component/button/button-rounded'

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
        title: 'Tanggal',
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
            icon={faUser}
            borderRadius="5px"
            background="#070E57"
            marginRight= "20px"
        />,
        <ButtonIcon
            text="Delete"
            height={20}
            icon={faUser}
            borderRadius="5px"
            background="#FF0303"
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


class ProfileComponent extends Component {
    render() { 
        const imageprofile = require(`../../../assets/images/ava.jpg`);
        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                />
                <Content style={{ overflow: "hidden" }}>
                    {/* Section 1 */}
                    <Row className="section-container">
                        <Col lg={6} md={12} sm={12}>
                            <Row>
                                <Col span={24}>
                                   <div className="container-profile">
                                   <img
                                        src={imageprofile}
                                        alt="Event 1"
                                        style={{maxWidth: '100%', borderRadius: '10px'}}
                                    />
                                   </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={18} md={12} sm={12}>
                            <Row className="profile-description">
                                <Col span={24}>
                                   <div className="name-profile">
                                      <span className="text-soft-blue title-small bold">Jhon Lorem </span>
                                      <br/>
                                      <p className="text-soft-grey email-user"> <Icon type="mail" style={{marginRight:'10px'}} />john@mail.ugm.ac.id</p>                                      
                                   </div>
                                   <div>
                                    <ButtonIcon
                                          text="Edit Profile"
                                          height={20}
                                          icon={faUser}
                                          borderRadius="5px"
                                          background="#070E57"
                                          marginLeft= "0px"
                                          paddingLeft= "0px"
                                      />
                                   </div>
                                </Col> 
                                <Col lg={6} md={12} sm={12}>
                                    <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Pekerjaan</p>
                                      <p className="text-black desc-profile">Mahasiswa</p>
                                   </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Tanggal Lahir</p>
                                      <p className="text-black desc-profile">01-01-1999</p>
                                   </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Jenis Kelamin</p>
                                      <p className="text-black desc-profile">Laki-laki</p>
                                   </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <div className="container-desc">
                                      <p className="text-soft-blue desc-title">Nomor Telefon</p>
                                      <p className="text-black desc-profile">+6285868586656</p>
                                   </div>
                                </Col>
                            </Row>  
                        </Col>
                    </Row>
                    {/* Section 2 */}
                    <Row className="section-container profile">
                        <Col lg={6} md={12} sm={12}>
                          <div className="title-total-event">
                              <span className="text-soft-blue title-medium bold"> Total ada</span>
                          </div>
                          <div className="total-event">
                              <span className="text-soft-blue title-biggest bold"> 10</span>
                          </div>
                          <div className="desc-total-event">
                              <span className="text-soft-blue title-small bold"> Event yang kamu ikuti</span>
                          </div>
                        </Col>
                        <Col lg={18} md={12} sm={12}>
                            <Col lg={24}>
                                <div className="desc-table-event">
                                  <span className="text-soft-blue title-medium bold"> Tabel Event</span>
                                </div>
                            </Col>
                            <Row gutter={24} type="flex">
                                <TableProfile 
                                    columns={columns} 
                                    dataSource={data} 
                                    className="table-profile"
                                />
                            </Row>
                        </Col>
                    </Row>
                    <BackTop />
                </Content>
                <Footer/>
            </Layout>
        );
    }
}
 
export default ProfileComponent;