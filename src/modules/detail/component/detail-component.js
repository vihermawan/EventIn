import React, { Component } from 'react';
import { Layout, BackTop, Row, Col, Button, Card, Tag, Modal, Icon,  Statistic } from 'antd';
import '../../../assets/css/detail.css'
import Navbar from '../../../common/layout/navbar-landing'
import Footer from '../../../common/layout/footer-landing'
import LoadingContainer from '../../../common/component/loading/loading-container'
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
const { Content } = Layout;
const { Countdown } = Statistic;

class DetailComponent extends Component {
    state = {
        isPaid : false,
    };

    render() { 
      
        const {initialData,handleCancel,handleOk,showModal,onStartLoadingHome,onFinishLoadingHome,showModalClose,handleOkClose} = this.props
        const datebeginevent = moment(initialData.detailEvent.start_event).format("DD MMMM")
        const dateEndEvent = moment(initialData.detailEvent.end_event).format("DD MMMM YYYY")
        const regisbeginevent = moment(initialData.detailEvent.open_registration).format("DD MMMM")
        const regisendevent = moment(initialData.detailEvent.end_registration).format("DD MMMM YYYY")
        const dateNow =  moment().format('YYYY-MM-DD')
        const endregist = Date.parse(initialData.detailEvent.end_registration)
        const benefitData = [
            {
                image: require(`../../../assets/images/Day.png`),
                title: 'Tanggal',
                description: datebeginevent  + ' - ' + dateEndEvent,
            },
            {
                image: require(`../../../assets/images/Location.png`),
                title: 'Tempat',
                description: initialData.detailEvent.lokasi ,
            },
            {
                image: require(`../../../assets/images/Regis.png`),
                title: 'Registrasi',
                description: regisbeginevent+ ' - ' + regisendevent,
            },
            {
                image: require(`../../../assets/images/Quota.png`),
                title: 'Kuota',
                description: initialData.detailEvent.limit_participant + ' orang'
            },
            
        ]
        let hidden = this.state.isPaid ? 'hidden-objek' : 'block-objek'

        return ( 
            <Layout className="landing-container">
                <Navbar
                    navigate={this.props.navigate}
                    onStartLoadingHome={onStartLoadingHome}
                    onFinishLoadingHome={onFinishLoadingHome}
                />
                <LoadingContainer loading={initialData.loadingHome}>
                <Content style={{ overflow: "hidden" }}>
                    <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%'}}>
                        <Col lg={12} md={12} sm={12}>
                            <Row>
                                <Col span={24} >
                                    <div className="title-container-detail">
                                        <span className="text-soft-blue title-big-detail">{initialData.Event.nama_event}</span>
                                        <br/>
                                        <span className="text-soft-blue title-small-detail">{initialData.Event.organisasi}</span>
                                    </div>
                                </Col>
                                <Col span={24} style={{ marginTop: 2 }}>
                                    <Countdown className="text-soft-blue title-small title-container-detail" title="Akan diselenggarakan pada" value={initialData.detailEvent.start_event} format="M bulan D hari, H-m-s hour" />
                                </Col>
                                <Col span={24}>
                                    <div className="button-detail-1-container">
                                        <div style={endregist > Date.parse(dateNow) && initialData.Event.peserta_event_count !== initialData.detailEvent.limit_participant ? {display:"block"}:{display:"none"}}>
                                            <Button className="button-participate button-regis" style={{marginTop:'2%'}} type="primary" onClick={showModal}>
                                                Daftar!
                                            </Button>
                                        </div>
                                        <div style={ endregist > Date.parse(dateNow) && initialData.Event.peserta_event_count !== initialData.detailEvent.limit_participant ? {display:"none"}:{display:"block"}}>
                                            <Button className="button-participate button-regis-closed" style={{marginTop:'2%'}} type="danger" onClick={showModalClose}>
                                                Pendaftaran Tutup!
                                            </Button>
                                        </div>
                                        <Modal
                                            title={"Kamu akan mendaftar di "+initialData.Event.nama_event}
                                            visible={initialData.visible}
                                            onOk={handleOk}
                                            confirmLoading={initialData.confirmLoading}
                                            onCancel={handleCancel}
                                        >
                                            <LoadingContainer loading={initialData.loading}>   
                                                <p className="bold">Apakah anda yakin akan mendaftar pada acara {initialData.Event.nama_event} yang akan dilaksanakan pada {datebeginevent + ' - ' + dateEndEvent} ?</p>
                                                <p className="text-soft-blue" style={initialData.status.nama_status === 'Free' ? {display:"block"}:{display:"none"}}>Biaya pendaftaran {initialData.Event.nama_event} gratis !</p>
                                                <p className="text-soft-blue" style={initialData.status.nama_status === 'Free' ? {display:"none"}:{display:"block"}}>Total yang harus dibayar: Rp. {initialData.detailEvent.biaya},-</p>
                                                <p className="text-soft-blue mb-50" style={initialData.status.nama_status === 'Free' ? {display:"none"}:{display:"block"}}>
                                                    Anda harus melakukan transfer ke rekening : {initialData.detailEvent.nomor_rekening} dari bank {initialData.detailEvent.bank}
                                                </p>
                                                <p className="text-merah" style={initialData.status.nama_status === 'Free' ? {display:"block"}:{display:"none"}}>*Silahkan melakukan pendaftaran.</p>
                                                <p className="text-merah" style={initialData.status.nama_status === 'Free' ? {display:"none"}:{display:"block"}}>*Setelah melakukan registrasi, jangan lupa untuk melakukan pembayaaran sesuai nominal yang tertera diatas.</p>
                                            </LoadingContainer> 
                                        </Modal>
                                        <Modal
                                            title={"Pendaftaran event "+initialData.Event.nama_event}
                                            visible={initialData.visible_close}
                                            onOk={handleOkClose}
                                            confirmLoading={initialData.confirmLoading}
                                            onCancel={handleCancel}
                                        >
                                            <LoadingContainer loading={initialData.loading}>   
                                                <p className="bold">Mohon maaf pendaftaran event {initialData.Event.nama_event} yang akan dilaksanakan pada {datebeginevent + ' - ' + dateEndEvent} telah ditutup</p>
                                                <p>Silahkan mendaftar pada event yang lain</p>
                                            </LoadingContainer> 
                                        </Modal>
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
                    <Row style = {{minHeight: '100%',marginBottom: '2%', marginLeft: '5%', marginRight:'5%'}}>
                        <Col lg={24} className="card-container-detail">
                            <Card className="card-content-detail">
                                <Row gutter={24} type="flex" justify="center">
                                    {
                                        benefitData.map( data =>
                                            <Col lg={6} className="text-align">
                                                    <div className="detail-content" style={{marginLeft:'20%', marginBottom:'20%'}}>
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
                    <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%'}}> 
                        <Col lg={12} md={12} sm={12}>
                            <Row style={{marginLeft:'12%', marginTop:'4%'}}>
                                <div className="title-container-detail-2">
                                    <p className="text-soft-grey title-quote-detail teks-detail">{initialData.detailEvent.deskripsi_event}</p>
                                </div>
                            </Row>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                            <Row style={{marginLeft:'5%'}}>
                                <Col span={24} >
                                    <div className="title-container-nama">
                                        <span className="text-soft-blue judul-detail">{initialData.Event.nama_event} </span>
                                        <br/>
                                    </div>
                                </Col>
                                <Col span={24} style={{ marginTop:'1%' }}>
                                    <div>
                                        <Tag color="green">{initialData.kategori.nama_kategori}</Tag>
                                    </div>
                                </Col>
                                <Row>
                                    <Col span={12} style={{ marginTop:'2%' }}>
                                        <div>
                                            <p className="ikon-judul">Pembayaran Pendaftaran : </p>
                                            <Col span={12}>
                                                <div className="ikon-tulisan">
                                                    <p style={initialData.status.nama_status === 'Free' ? {display:"block"}:{display:"none"}}>Biaya          : Gratis</p>
                                                    <p style={initialData.status.nama_status === 'Free' ? {display:"none"}:{display:"block"}}>Biaya          : Rp. {initialData.detailEvent.biaya}</p>
                                                    <p>Bank           : {initialData.detailEvent.bank}</p>
                                                    <p>Nomor Rekening : {initialData.detailEvent.nomor_rekening}</p>
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col span={12} style={{ marginTop:'2%' }}>
                                    <div>
                                        <p className="ikon-judul">More Info : </p>
                                        <Col span={12}>
                                            <div className="ikon-tulisan">
                                                <a href= {`https://instagram.com/${initialData.detailEvent.instagram}`} target="_blank"> <p><Icon type="instagram" /> @ {initialData.detailEvent.instagram}</p></a>
                                                <p><Icon className="ikon-2" type="phone" /> {initialData.detailEvent.telepon}</p>
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                    <BackTop />
                </Content>
                </LoadingContainer>
                <Footer/>
            </Layout>
        );
    }
}
export default DetailComponent;