import React, { Component } from 'react';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import EventComponent from '../../modules/event/component/event-component';

class EventPage extends Component {
    state = { 
        event:[],
     }

     componentDidMount(){
        this.getEvent();
    }

    getEvent=()=>{
        API.get(`/peserta/event`)
        .then(res => {
            console.log('res',res.data.data.event.detail_event)
            this.setState({event:res.data.data.event})
        });
    }

    render() { 

        const cardData =  this.state.event.map( data => ({
            //image: require(`../../../assets/images/card-event.png`),
            date: data.detail_event.start_event,
            price: data.detail_event.audien,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            

        }))

        return (
            <EventComponent
                navigate={this.props.navigate}
                cardData = {cardData}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EventPage);
export default page