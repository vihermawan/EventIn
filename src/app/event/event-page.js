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
        loading : false,
     }

     componentDidMount(){
        this.getEvent();
    }

    getEvent=()=>{
        API.get(`/peserta/event`)
        .then(res => {
            this.setState({loading: true})
            console.log(res.data.data.event)
            if(res.status == 200){
                this.setState({
                    event:res.data.data.event,
                    loading: false,
                })
            }
        });
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

        return (
            <EventComponent
                navigate={this.props.navigate}
                cardData = {cardData}
                initialData = {this.state}
                onDetailEvent  = {this.onDetailEvent}
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