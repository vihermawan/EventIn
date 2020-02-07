import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../common/api'
import { navigate } from '../../common/store/action'
import EventComponent from '../../modules/event/component/event-component';

class EventPage extends Component {
    state = { 
        event: [],
     }

     componentDidMount(){
        this.getEvent();
    }

    getEvent=()=>{
        API.get(`/peserta/event`)
        .then(res => {
            console.log('res',res.data.data.kategori)
            // this.setState({activeEvent:res.data.data.event})
            /*
                res.data.data.event[0].id_event
                res.data.data.event[1].id_event
            */ 
        });
    }

    

    render() { 

        const data =  this.state.event.map( data => ({
            nama : data.kategori.nama_event
        }))

        return (
            <EventComponent
                navigate={this.props.navigate}
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