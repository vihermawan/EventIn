import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailAllEventComponent from '../../../modules/admin-superadmin/detail-event/detail-all-event-component';


class DetailAllEventPage extends Component {
    state = {
        Event: [],
        kategori : [],
        detailEvent : [],
        status : [],
        provinsi : '',
        kabupaten : '',
        loading: false,
    }

    componentDidMount(){
         this.getDetailEvent(this.props.idEvent);
    }

    getDetailEvent=(id)=>{
        this.setState({loading: true})
        API.get(`/admin/detail-event/admin/${id}`)
        .then(res => {
          this.setState({
            Event:res.data.data.event,
            kategori : res.data.data.event.kategori,
            detailEvent : res.data.data.event.detail_event,
            status : res.data.data.event.status_biaya,
            provinsi : res.data.data.event.detail_event.provinsi.provinsi,
            kabupaten : res.data.data.event.detail_event.kabupaten.ibu_kota,
            loading: false,
          })
        });
    }

    render() { 
         
        return ( 
            <DetailAllEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(DetailAllEventPage);
export default page