import React, { Component } from 'react';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { message} from 'antd';
import CONSTANS from '../../common/utils/Constants'
import { navigate } from '../../common/store/action'
import EventComponent from '../../modules/event/component/event-component';

// import store
import { setIdEvent } from '../../modules/admin-panitia/active-event/store/active-event-action'
import { setIdKategori } from '../../modules/alleventkategori/store/kategori-action'

class EventPage extends Component {
    state = { 
        event:[],
        event_seacrh : [],
        event_week : [],
        size_event_seacrh: '',
        size : '',
        kategori : [],
        eventbyKategori : [],
        loading : false,
        countEvent : '',
        idkategori : '',
        nama_event : '',
        loadingHome: false,
        loadingWeek : false,
     }

    componentDidMount(){
        this.getEvent();
        this.getKategori();
        this.getEventbyWeek();
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })

    onTabChange = (id_kategori) => {
        this.setState({loading: true})
        API.get(`/peserta/event/kategori/${id_kategori}`)
        .then(res => {
            if(res.status === 200){
                this.setState({
                    eventbyKategori:res.data.data.event,
                    countEvent :res.data.size,
                })
            }
            this.setState({loading: false})
        });
    }

    getEvent=()=>{
        this.setState({loading: true})
        API.get(`/peserta/event`)
        .then(res => {
            console.log(res)
            if(res.status === 200){
                this.setState({
                    event:res.data.data.event.data,
                })
            }
            this.setState({loading: false})
        });
    }

    getEventbyWeek =()=>{
        this.setState({loadingWeek: true})
        API.get(`/peserta/eventbyWeek`)
        .then(res => {
            if(res.status === 200){
                this.setState({
                    event_week:res.data.data.event.data,
                })
            }
            this.setState({loadingWeek: false})
        });
    }

    getKategori=()=>{
        API.get('/peserta/kategori')
        .then(res => {
            if(res.status === 200){
                this.setState({
                    kategori:res.data.data.kategori,
                    size : res.data.size,
                })
            }
        })
    }

    onSeacrhEvent = (params) =>{
        API.get(`/event/search?nama=${params}`)
        .then(res => {
            if(res.status === 200){
                this.setState({
                    event_seacrh:res.data.data.event.data,
                    size_event_seacrh : res.data.data.event.total,
                })
            }
            this.setState({loading: false})
        });
    }

    //button detail participant
    onDetailEvent = (id) => {
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_KEY)
    }

    onEventKategori = (id_kategori) => {
        this.props.setIdKategori(id_kategori)
        this.props.navigate(CONSTANS.ALL_KATEGORI_MENU_KEY)
    }

    success = quota => {
        message.success(`Kuota Masih tersisa ${quota} silahkan mendaftar`);
    };


    closed = () => {
        message.error(`Mohon maaf tidak bisa jadwal registrasi telah ditutup`);
    }

    see = event => {
        message.success(`Kuota full dan registrasi telah selesai, sampai jumpa di ${event}!`);
    }

    error = () => {
        message.error(`Mohon maaf tidak bisa mendaftar karena kuota penuh`);
    };

    render() { 

        const cardData =  this.state.event.map( data => ({
            id : data.id_event,
            date: data.detail_event.start_event,
            price: data.status_biaya.nama_status,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            foto : data.detail_event.image_URL,
            quota : (data.detail_event.limit_participant)-(data.peserta_event_count),
            endregist : data.detail_event.end_registration,
        }))

        const kategori = this.state.kategori.map(data => ({
            id_kategori : data.id_kategori,
            kategori : data.nama_kategori,
        }))

        const cardDataEventKategori =  this.state.eventbyKategori.map( data => ({
            id : data.id_event,
            date: data.detail_event.start_event,
            price: data.status_biaya.nama_status,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            foto : data.detail_event.image_URL,
            quota : (data.detail_event.limit_participant)-(data.peserta_event_count),
            endregist : data.detail_event.end_registration,
        }))

        const cardDataEvenyWeek =  this.state.event_week.map( data => ({
            id : data.id_event,
            date: data.detail_event.start_event,
            price: data.status_biaya.nama_status,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            foto : data.detail_event.image_URL,
            quota : (data.detail_event.limit_participant)-(data.peserta_event_count),
            endregist : data.detail_event.end_registration,
        }))

        const cardDataEventSeacrh =  this.state.event_seacrh.map( data => ({
            id : data.id_event,
            date: data.detail_event.start_event,
            price: data.status_biaya.nama_status,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            foto : data.detail_event.image_URL,
            quota : (data.detail_event.limit_participant)-(data.peserta_event_count),
            endregist : data.detail_event.end_registration,
        }))

        return (
            <EventComponent
                navigate={this.props.navigate}
                cardData = {cardData}
                initialData = {this.state}
                onDetailEvent  = {this.onDetailEvent}
                kategori = {kategori}
                cardDataEventKategori = {cardDataEventKategori}
                cardDataEventSeacrh = {cardDataEventSeacrh}
                cardDataEvenyWeek = {cardDataEvenyWeek}
                onTabChange={this.onTabChange}
                onStartLoadingHome={this.onStartLoadingHome}
                onFinishLoadingHome={this.onFinishLoadingHome}
                onEventKategori={this.onEventKategori}
                onSeacrhEvent = {this.onSeacrhEvent}
                success = {this.success}
                error = {this.error}
                closed = {this.closed}
                see = {this.see}
            />
        );
    }
}
 
const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdEvent,
    setIdKategori,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EventPage);
export default page