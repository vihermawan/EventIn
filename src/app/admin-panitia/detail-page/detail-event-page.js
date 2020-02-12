import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailEventComponent from '../../../modules/admin-panitia/detail-event/detail-event-component';


class DetailEventPage extends Component {
    state = {
        detailEvent: [],
        loading: false,
    }

    componentDidMount(){
        this.getDetailEvent(this.props.idEvent);
    }

    getDetailEvent=(id)=>{
        // this.setState({loading: true})
        API.get(`/panitia/event/${id}`)
        .then(res => {
          console.log('res',res)
        //   this.setState({
        //     detailEvent:res.data.data.event,
        //     loading: false,
        //   })
        });
    }

    render() { 
         
        //   const data =  this.state.eventPast.map( data => ({
        //     key: data.id_event,
        //             nomor : data.id_event,
        //             nama_event: data.nama_event,
        //             start_event :data.detail_event.start_event,
        //             lokasi : data.detail_event.lokasi,
        //             kategori : data.detail_event.id_kategori,
        //             peserta : data.detail_event.limit_participant,
        //             tags: ['Done'],
        // }))

        return ( 
            <DetailEventComponent
                initialData={this.state}
                navigate={this.props.navigate}
                // data={data}
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