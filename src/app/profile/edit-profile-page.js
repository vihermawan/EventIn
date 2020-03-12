import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { navigate } from '../../common/store/action'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import CONSTANS from '../../common/utils/Constants'
import { API } from '../../common/api'
//import component
import EditProfileComponent from '../../modules/profile/component/edit-profile-component';
import ButtonDashboard from '../../common/component/button/button-dashboard';

class EditProfilePage extends Component {
    state = { 
        user : [],
        nama_peserta : '',
        email : '',
        jenis_kelamin : '',
        tanggal_lahir: '',
        no_telepon : '',
        pekerjaan : '',
        picture : '',
        loading : false
    }

    componentDidMount(){
        this.getProfile();
    }

    //get data profile dari API
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/peserta/edit-profile`)
        .then(res => {
            console.log('res',res.data.data.user)
            this.setState({
                nama_peserta : res.data.data.user.peserta.nama_peserta,
                email : res.data.data.user.email,
                pekerjaan : res.data.data.user.peserta.pekerjaan,
                no_telepon : res.data.data.user.peserta.no_telefon,
                jenis_kelamin : res.data.data.user.peserta.jenis_kelamin,
                picture:res.data.data.user.peserta.image_URL,
                loading: false,
            })
        });
    }
    

    render() { 
        return ( 
            <EditProfileComponent
                navigate={this.props.navigate}
                initialData={this.state}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
export default page