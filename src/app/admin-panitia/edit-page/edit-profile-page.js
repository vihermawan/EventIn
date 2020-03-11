import React, { Component } from 'react';

import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfileComponent from '../../../modules/admin-panitia/profile/edit-profile-component';


class EditProfilePage extends Component {
    state = {
        user : [],
        loading: false,
    }

    componentDidMount(){
        this.getProfile();
    }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }
    
    //get data profile dari API
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/panitia/profile`)
        .then(res => {
            console.log('res',res.data.data.user)
            this.setState({
                user:res.data.data.user,
                loading: false,
            })
        });
    }

    render() { 

        const dataProfile =  this.state.user.map( ({id_users, email, panitia}, index) => ({
            id_users : id_users,
            email : email,
            nama_panitia : panitia.nama_panitia,
            organisasi : panitia.organisasi,
            instagram : panitia.instagram,
            no_telepon : panitia.no_telepon,
            picture : panitia.image_URL,
        }))


        return ( 
            <EditProfileComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                dataProfile = {dataProfile}
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

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
export default page