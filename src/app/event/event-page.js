import React, { Component } from 'react';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import CONSTANS from '../../common/utils/Constants'
import { navigate } from '../../common/store/action'
import EventComponent from '../../modules/event/component/event-component';

// import store
import { setIdEvent } from '../../modules/admin-panitia/active-event/store/active-event-action'

class EventPage extends Component {
    state = { 
        event:[],
        kategori : [],
        eventbyKategori : [],
        loading : false,
        countEvent : '',
        idkategori : '',
     }

     componentDidMount(){
        this.getEvent();
        this.getKategori();
        
    }

    onTabChange = (id_kategori) => {
        this.setState({loading: true})
        API.get(`/peserta/event/kategori/${id_kategori}`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                this.setState({
                    eventbyKategori:res.data.data.event,
                })
            }
            this.setState({loading: false})
        });
    }

    getEvent=()=>{
        this.setState({loading: true})
        API.get(`/peserta/event`)
        .then(res => {
            console.log(res.data.size)
            if(res.status == 200){
                this.setState({
                    event:res.data.data.event.data,
                })
            }
            this.setState({loading: false})
        });
    }

    getKategori=()=>{
        API.get('/peserta/kategori')
        .then(res => {
            console.log('kategori',res)
            if(res.status == 200){
                this.setState({
                    kategori:res.data.data.kategori,
                    countEvent :res.data.size,
                })
            }
        })
    }

    //button detail participant
    onDetailEvent = (id) => {
        console.log('id ini',id)
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_KEY)
    }

    render() { 

        const cardData =  this.state.event.map( data => ({
            id : data.id_event,
            date: data.detail_event.start_event,
            price: data.status_biaya.nama_status,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            foto : data.detail_event.image_URL,
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
        }))

        return (
            <EventComponent
                navigate={this.props.navigate}
                cardData = {cardData}
                initialData = {this.state}
                onDetailEvent  = {this.onDetailEvent}
                kategori = {kategori}
                cardDataEventKategori = {cardDataEventKategori}
                onTabChange={this.onTabChange}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EventPage);
export default page