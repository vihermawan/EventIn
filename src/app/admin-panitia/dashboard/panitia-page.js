import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import PanitiaComponent from '../../../modules/admin-panitia/dashboard-panitia/panitia-component';

class PanitiaPage extends Component {
    state = {
        id_panitia : '',
        no_telepon :'',
        instagram : '',
        total_event : '',
        total_certificate : '',
    }

    componentDidMount(){
        this.getProfile();
        this.getCertificate();
        this.getEventPast();
    }

    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/panitia/profile-edit`)
        .then(res => {
            this.setState({
                id_panitia : res.data.data.user.panitia.id_panitia,
                no_telepon: res.data.data.user.panitia.no_telepon,
                instagram : res.data.data.user.panitia.instagram,
                loading: false,
            })
            if(res.data.data.user.panitia.no_telepon == 'Silahkan isi'){
                this.openNotification('Silahkan lengkapi biodata', 'Agar bisa membuat event!')
            }else if(res.data.data.user.panitia.instagram == 'Silahkan isi'){
                this.openNotification('Silahkan lengkapi biodata', 'Agar bisa membuat event!')
            }
        });
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    getCertificate=()=>{
        this.setState({loading: true})
        API.get(`/panitia/event-sertifikat`)
        .then(res => {
          console.log('res',res.data.size)
            this.setState({total_certificate : res.data.size})
        });
    }

    getEventPast=()=>{
        this.setState({loading: true})
        API.get(`/panitia/eventPast`)
        .then(res => {
          this.setState({
            total_event:res.data.size,
            loading: false,
          })
        });
    }

    
  
    render() {
        return ( 
            <PanitiaComponent
                initialData={this.state}
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

const page = connect(mapStateToProps, mapDispatchToProps)(PanitiaPage);
export default page