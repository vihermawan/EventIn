import React, { Component } from 'react';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import DetailComponent from '../../modules/detail/component/detail-component';

class DetailPage extends Component {
    state = { 
        Event: [],
        kategori : [],
        detailEvent : [],
        status : [],
        loading: false,
     }

     componentDidMount(){
        this.getDetail(this.props.idEvent);
    }

    getDetail=(id)=>{
        this.setState({loading: true})
        API.get(`/peserta/event/${id}`)
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
            <DetailComponent
                navigate={this.props.navigate}
                initialData = {this.state}
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

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPage);
export default page