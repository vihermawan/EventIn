import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import { API } from '../../common/api'
//import component
import ProfileComponent from '../../modules/profile/component/profile-component';

//import store
import { setIdUsers } from '../../modules/admin-superadmin/user/store/users-action'

class ProfilePage extends Component {
    state = { 
        user : [],
        peserta:[],
        sizeEvent : '',
        loadingHome: false,
    }

    componentDidMount(){
        this.getProfile();
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })

    //get data profile dari API.
    getProfile=()=>{
        this.setState({loadingHome: true})
        API.get(`/peserta/profile`)
        .then(res => {
            this.setState({
                user:res.data.data.user,
                loadingHome: false,
            })
        });
    }
    
    onEditPeserta = (id_users) => {
      this.props.setIdUsers(id_users)
      this.props.navigate(CONSTANS.EDIT_PROFILE_MENU_KEY)
    }

    onEditPassword = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PASSWORD_MENU_KEY)
    }

    render() { 

        const dataProfile =  this.state.user.map( ({id_users, email, peserta}, index) => ({
            id_users : id_users,
            email : email,
            nama_peserta : peserta.nama_peserta,
            tanggal_lahir : peserta.tanggal_lahir,
            jenis_kelamin : peserta.jenis_kelamin,
            pekerjaan : peserta.pekerjaan,
            telepon : peserta.telepon,
            picture : peserta.image_URL,
        }))

        return ( 
            <ProfileComponent
                navigate={this.props.navigate}
                initialData={this.state}
                dataProfile = {dataProfile}
                onEditPeserta = {this.onEditPeserta}
                onStartLoadingHome={this.onStartLoadingHome}
                onFinishLoadingHome={this.onFinishLoadingHome}
                onEditPassword = {this.onEditPassword}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdUsers,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default page