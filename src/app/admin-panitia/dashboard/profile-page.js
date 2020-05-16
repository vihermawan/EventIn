import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import ProfileComponent from '../../../modules/admin-panitia/profile/profile-component';

//import store
import { setIdPanitia } from '../../../modules/admin-superadmin/user/panitia/store/panitia-action'
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'

class ProfilePage extends Component {
    state = {  
        user : [],
        loading : false,
    }

    componentDidMount(){
        this.getProfile();
    }
    
    //get data profile dari API
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/panitia/profile`)
        .then(res => {
            this.setState({
                user:res.data.data.user,
                loading: false,
            })
        });
    }

    onEditPanitia = (id_panitia) => {
        this.props.setIdPanitia(id_panitia)
        this.props.navigate(CONSTANS.EDIT_PROFILE_PANITIA_MENU_KEY)
    }

    onEditPassword = (id_panitia) => {
        this.props.setIdPanitia(id_panitia)
        this.props.navigate(CONSTANS.EDIT_PASSWORD_PANITIA_MENU_KEY)
    }

    render() { 

        const dataProfile =  this.state.user.map( ({id_users, email, panitia}, index) => ({
            id_users : id_users,
            id_panitia : panitia.id_panitia,
            email : email,
            nama_panitia : panitia.nama_panitia,
            organisasi : panitia.organisasi,
            instagram : panitia.instagram,
            telepon : panitia.telepon,
            picture : panitia.image_URL,
        }))


        return ( 
            <ProfileComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                dataProfile = {dataProfile}
                onEditPanitia = {this.onEditPanitia}
                onEditPassword = {this.onEditPassword}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    setIdUsers,
    setIdPanitia,
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default page