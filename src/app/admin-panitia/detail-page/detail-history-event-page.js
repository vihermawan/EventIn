import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailHistoryEventComponent from '../../../modules/admin-panitia/detail-event/detail-history-event-component'

class DetailHistoryEventPage extends Component {
    state = {
        Event: [],
        kategori : [],
        detailEvent : [],
        status : [],
        loading: false,
    }

    componentDidMount(){
        this.getDetailEvent(this.props.idEvent);
    }

    getDetailEvent=(id)=>{
        this.setState({loading: true})
        API.get(`/panitia/event/${id}`)
        .then(res => {
          this.setState({
            Event:res.data.data.event,
            kategori : res.data.data.event.kategori,
            detailEvent : res.data.data.event.detail_event,
            status : res.data.data.event.status_biaya,
            loading: false,
          })
         
        });
    }

    

    render() { 
        return ( 
             <DetailHistoryEventComponent
                initialData={this.state}
                navigate={this.props.navigate}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailHistoryEventPage);
export default page