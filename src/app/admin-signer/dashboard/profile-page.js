import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import { navigate } from '../../../common/store/action'
import ProfileSignerComponent from '../../../modules/admin-signer/profile/profile-component';

//import store.
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'

class ProfilePage extends Component {
    state = {  
        user : [],
        nama_panitia : '',
        panitia:[],
        loading : false,
    }

    componentDidMount(){
        this.getProfile();
    }
    
    //get data profile dari API.
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/penandatangan/profile`)
        .then(res => {
            this.setState({
                user:res.data.data.penandatangan,
                loading: false,
            })
        });
    }

    onEditSigner = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PROFILE_SIGNER_MENU_KEY)
    }

    onEditPassword = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PASSWORD_SIGNER_MENU_KEY)
    }

    render() { 

        const dataProfile =  this.state.user.map( ({id_users, email, penandatangan}, index) => ({
            id_users : id_users,
            email : email,
            nama_penandatangan : penandatangan.nama_penandatangan,
            instansi : penandatangan.instansi,
            jabatan : penandatangan.jabatan,
            nip : penandatangan.nip,
            picture : penandatangan.image_URL,
        }))


        return ( 
            <ProfileSignerComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                dataProfile = {dataProfile}
                onEditSigner = {this.onEditSigner}
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