import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Icon,Card, Col,Tag } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
// component
import DetailEvent from '../../../common/component/detail/detail-component'
import LoadingContainer from '../../../common/component/loading/loading-container'
// constant content
const { Content } = Layout;



class DetailEventComponent extends Component {
    render() { 
      const { initialData, columns, data } = this.props
      const benefitData = [
        {
            image: require(`../../../assets/images/day.png`),
            title: 'The Day',
            description: initialData.detailEvent.start_event + ' - ' + initialData.detailEvent.end_event,
        },
        {
            image: require(`../../../assets/images/location.png`),
            title: 'Venue',
            description: initialData.detailEvent.lokasi ,
        },
        {
            image: require(`../../../assets/images/regis.png`),
            title: 'Registrasi',
            description: initialData.detailEvent.open_registration + ' - ' + initialData.detailEvent.end_registration,
        },
        {
            image: require(`../../../assets/images/quota.png`),
            title: 'Quota',
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
                    <Breadcrumb.Item>Dashboard Active Event</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard Detail Event</Breadcrumb.Item>
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
                                                            <div className="category-event">
                                                                <Row>
                                                                    <Col span={24} style={{ marginTop:'1%' }}>
                                                                        <div>
                                                                            <Tag color="blue">{initialData.status.nama_status}</Tag>
                                                                            <Tag color="blue">{initialData.kategori.nama_kategori}</Tag>
                                                                        </div>
                                                                    </Col>
                                                                    <Col span={24} style={{ marginTop:'4%' }}>
                                                                        <div>
                                                                            <p>More Info : </p>
                                                                            <p className="text-soft-blue">
                                                                                <Icon type="instagram" /> @{initialData.detailEvent.instagram}
                                                                            </p>
                                                                            <p className="text-soft-blue">
                                                                                <Icon type="ie" /> ice-indonesia.com 
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