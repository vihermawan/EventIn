import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailEventComponent from '../../../modules/admin-panitia/detail-event/detail-event-component';


class DetailEventPage extends Component {
    state = {
        Event: [],
        kategori : [],
        detailEvent : [],
        status : [],
        loading: false,
    }

    componentDidMount(){
        console.log('props',this.props)
        this.getDetailEvent(this.props.idEvent);
    }

    getDetailEvent=(id)=>{
        this.setState({loading: true})
        API.get(`/panitia/event/${id}`)
        .then(res => {
          console.log('res',res.data.data.event)
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
            <DetailEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(DetailEventPage);
export default page