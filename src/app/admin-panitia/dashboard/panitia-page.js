import React, { Component } from 'react';
import { connect } from 'react-redux';
import {message, notification } from 'antd';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import PanitiaComponent from '../../../modules/admin-panitia/dashboard-panitia/panitia-component';
import Axios from 'axios';

class PanitiaPage extends Component {
    state = {
        id_panitia : '',
        no_telepon :'',
        instagram : '',
    }

    componentDidMount(){
        this.getProfile();
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