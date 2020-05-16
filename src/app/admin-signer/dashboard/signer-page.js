import React, { Component } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import SignerComponent from '../../../modules/admin-signer/dashboard-signer/signer-component';

class SignerPage extends Component {
    state = {  
        total_waiting :'',
        nama_penandatangan:'',
        instansi: '',
        jabatan:'',
        loading: false,
    }

    componentDidMount(){
        this.getCertificateAdmin();
        this.getProfile();
    }

     //get data profile dari API
     getProfile=()=>{
        this.setState({loading: true})
        API.get(`/penandatangan/profile-edit`)
        .then(res => {
            this.setState({
                nama_penandatangan :res.data.data.penandatangan.penandatangan.nama_penandatangan,
                jabatan : res.data.data.penandatangan.penandatangan.jabatan,
                instansi : res.data.data.penandatangan.penandatangan.instansi,
                loading: false,
            })
        });
    }

    getCertificateAdmin=()=>{
        this.setState({loading: true})
        API.get(`/penandatangan/count-waiting`)
        .then(res => {
            this.setState({
                total_waiting:res.data.size,
                loading: false,
            })
            if(this.state.total_waiting > 0){
                this.openNotification('Sertifikat yang perlu ditandatangani ada '+this.state.total_waiting, 'Silahkan di tandatangani')
            }
        });
    }

    openNotification = (message, description) => {
        notification.success({
            message,
            description,
        });
    };


    render() { 
        return ( 
            <SignerComponent
                navigate={this.props.navigate}
                initialData = {this.state}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(SignerPage);
export default page