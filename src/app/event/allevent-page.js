import React, { Component } from 'react';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import CONSTANS from '../../common/utils/Constants'
import { navigate } from '../../common/store/action'
import AllEventComponent from '../../modules/allevent/component/allevent-component';

// import store
import { setIdEvent } from '../../modules/admin-panitia/active-event/store/active-event-action'

class AllEventPage extends Component {
    state = { 
        event:[],
        loading : false,
        loadingHome: false,
     }

     componentDidMount(){
        this.getAllEvent();
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })


    getAllEvent=()=>{
        this.setState({loading: true})
        API.get(`/peserta/Allevent`)
        .then(res => {
            console.log(res.data.data.event.current_page + 1)
            if(res.status == 200){
                this.setState({
                    event:res.data.data.event.data,
                })
            }
            this.setState({loading: false})
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
            <AllEventComponent
                navigate={this.props.navigate}
                cardData = {cardData}
                initialData = {this.state}
                onDetailEvent  = {this.onDetailEvent}
                onStartLoadingHome={this.onStartLoadingHome}
                onFinishLoadingHome={this.onFinishLoadingHome}
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

const page = connect(mapStateToProps, mapDispatchToProps)(AllEventPage);
export default page