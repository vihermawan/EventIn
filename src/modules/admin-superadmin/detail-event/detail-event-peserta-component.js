import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Icon,Card, Col,Tag } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
// component
import LoadingContainer from '../../../common/component/loading/loading-container'
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
// constant content
const { Content } = Layout;



class DetailEventComponent extends Component {
    render() { 
        const { initialData} = this.props
        const datebeginevent = moment(initialData.detailEvent.start_event).format("DD MMMM")
        const dateEndEvent = moment(initialData.detailEvent.end_event).format("DD MMMM YYYY")
        const regisbeginevent = moment(initialData.detailEvent.open_registration).format("DD MMMM")
        const regisendevent = moment(initialData.detailEvent.end_registration).format("DD MMMM YYYY")
        const timestart = initialData.detailEvent.time_start
        const timeend = initialData.detailEvent.time_end
        const benefitData = [
            {
                image: require(`../../../assets/images/Day.png`),
                title: 'Pelaksanaan',
                description: datebeginevent + ' - ' + dateEndEvent+' '+timestart+ ' - '+timeend, 
            },
            {
                image: require(`../../../assets/images/Location.png`),
                title: 'Tempat',
                description: initialData.provinsi+' '+initialData.kabupaten+' '+initialData.detailEvent.lokasi ,
            },
            {
                image: require(`../../../assets/images/Regis.png`),
                title: 'Registrasi',
                description: regisbeginevent + ' - ' + regisendevent,
            },
            {
                image: require(`../../../assets/images/Quota.png`),
                title: 'Kuota',
                description: initialData.detailEvent.limit_participant + ' orang'
            },
            
         ]
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
                        <Breadcrumb.Item><Link to='/admin/list-peserta'>Daftar Peserta</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/admin/list-peserta/detail-peserta'>Detail Peserta</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Detail Event</Breadcrumb.Item>
                  </Breadcrumb>
  
                  <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                      <Col lg={24} md={24} sm={24}> 
                          <div className="container-active-event">
                              <Row>
                              <div className="container-title-event">
                                  <span>Detail Event</span>
                              </div>
                              </Row>
                              <LoadingContainer loading={initialData.loading}>
                                  <Row gutter={24} type="flex">
                                      <Layout className="landing-container">
                                          <Content style={{ overflow: "hidden" }}>
                                              <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%'}}>
                                                  <Col lg={12} md={12} sm={12}>
                                                      <Row>
                                                          <Col span={24} >
                                                              <div className="title-container-detail-event">
                                                                  <span className="text-soft-blue title-big-detail">{initialData.Event.nama_event} </span>
                                                                  <br/>
                                                                  <span className="text-soft-blue title-small-detail">{initialData.Event.organisasi}</span>
                                                              </div>
                                                          </Col>
                                                          <Col span={24}>
                                                            <div className="category-event-panitia">
                                                                <Row>
                                                                    <Col span={24} style={{ marginTop:'1%' }}>
                                                                        <div>
                                                                            <Tag color="blue">{initialData.status.nama_status}</Tag>
                                                                            <Tag color="blue">{initialData.kategori.nama_kategori}</Tag>
                                                                        </div>
                                                                    </Col>
                                                                    <Col span={14} style={{ marginTop:'4%' }}>
                                                                        <div>
                                                                            <p className="ikon-judul">Pembayaran : </p>
                                                                            <Col span={12}>
                                                                                <div className="text-soft-blue">
                                                                                    <p>Biaya          : Rp. {initialData.detailEvent.biaya}</p>
                                                                                    <p>Bank           : {initialData.detailEvent.bank}</p>
                                                                                    <p>Nomor Rekening : {initialData.detailEvent.nomor_rekening}</p>
                                                                                </div>
                                                                            </Col>
                                                                        </div>
                                                                    </Col>
                                                                    <Col span={10} style={{ marginTop:'4%' }}>
                                                                        <div>
                                                                            <p className="ikon-judul">More Info : </p>
                                                                            <p className="text-soft-blue">
                                                                                <a href= {`https://instagram.com/${initialData.detailEvent.instagram}`} target="_blank"><Icon type="instagram" /> @{initialData.detailEvent.instagram}</a>
                                                                            </p>
                                                                            <p className="text-soft-blue">
                                                                                <Icon type="phone" /> {initialData.detailEvent.telepon}
                                                                            </p>
                                                                            <p className="text-soft-blue" style={{width:"700px"}}>
                                                                                <Icon type="mail" /> {initialData.detailEvent.email_event}
                                                                            </p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                      </Row>
                                                  </Col>
                                                  <Col lg={12} md={12} sm={12}>
                                                      <div className="image-big-container-detail">
                                                          <img
                                                              src={initialData.detailEvent.image_URL}
                                                              alt="Home 1"
                                                              style={{maxWidth: '100%'}}
                                                          />
                                                      </div>
                                                  </Col>
                                              </Row>
                                              <Row style = {{minHeight: '100%',marginBottom: '2%', marginRight:'5%'}}>
                                                  <Col lg={12} md={24} sm={24}>
                                                      <div className="desc-event">
                                                          <p className="text-soft-grey title-quote-detail teks-detail">
                                                              {initialData.detailEvent.deskripsi_event}
                                                          </p>
                                                      </div>
                                                  </Col>
                                                  <Col lg={12} md={24} sm={24}>
                                                      <Card className="card-content-detail-event">
                                                          <Row gutter={24} type="flex" justify="center">
                                                              {
                                                                  benefitData.map( data =>
                                                                      <Col lg={12} className="text-align">
                                                                              <div className="detail-content" style={{marginLeft:'5%'}}>
                                                                                  <img src={data.image} alt="organizer" className="detail-image"/>
                                                                                  <div className="text-soft-blue bold detail-title">
                                                                                      {data.title}
                                                                                  </div>
                                                                                  <div className="detail-description">
                                                                                      {data.description}
                                                                                  </div>
                                                                              </div>
                                                                      </Col>
                                                                  )
                                                              }
                                                          </Row>
                                                      </Card>
                                                  </Col>
                                              </Row>
                                          </Content>
                                      </Layout>
                                  </Row>
                              </LoadingContainer>
                          </div>
                      </Col>
                  </Row>
              </Content>
          );
      }
  }
 
export default DetailEventComponent;