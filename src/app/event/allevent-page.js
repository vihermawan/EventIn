import React, { Component } from 'react';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import CONSTANS from '../../common/utils/Constants'
import { message} from 'antd';
import { navigate } from '../../common/store/action'
import AllEventComponent from '../../modules/allevent/component/allevent-component';

// import store.
import { setIdEvent } from '../../modules/admin-panitia/active-event/store/active-event-action'

class AllEventPage extends Component {
    state = { 
        page: 1,
        event:[],
        loading : false,
        loadingHome: false,
        current_page :'',
        last_page : '',
     }

     componentDidMount(){
        this.getAllEvent();
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })


    getAllEvent=(page)=>{
        this.setState({loading: true})
        API.get(`/peserta/Allevent?page=${page}`)
        .then(res => {
            if(res.status === 200){
                const allData = this.state.event.concat(res.data.data.event.data);
                this.setState({
                    event:allData,
                    current_page: res.data.data.event.current_page,
                    last_page: res.data.data.event.last_page,
                })
            }
            this.setState({loading: false})
        });
    }

    //button detail participant
    onDetailEvent = (id) => {
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_KEY)
    }

    nextPage = () => {
        const { page } = this.state;
        const nextPage = page + 1;
        this.getAllEvent(nextPage);
        this.setState({ page: nextPage });
    }

    success = quota => {
        message.success(`Kuota Masih tersisa ${quota} silahkan mendaftar`);
    };

    closed = () => {
        message.error(`Mohon maaf tidak bisa jadwal registrasi telah ditutup`);
    }

    see = event => {
        message.success(`Kuota full dan registrasi telah selesai, sampai jumpa di ${event}!`);
    }

    error = () => {
        message.error(`Mohon maaf tidak bisa mendaftar karena kuota penuh`);
    };

    render() { 

        const cardData =  this.state.event.map( data => ({
            id : data.id_event,
            date: data.detail_event.start_event,
            price: data.status_biaya.nama_status,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            foto : data.detail_event.image_URL,
            quota : (data.detail_event.limit_participant)-(data.peserta_event_count),
            endregist : data.detail_event.end_registration,
        }))

        return (
            <AllEventComponent
                navigate={this.props.navigate}
                cardData = {cardData}
                initialData = {this.state}
                onDetailEvent  = {this.onDetailEvent}
                onStartLoadingHome={this.onStartLoadingHome}
                onFinishLoadingHome={this.onFinishLoadingHome}
                nextPage={this.nextPage}
                success = {this.success}
                error = {this.error}
                closed = {this.closed}
                see = {this.see}
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