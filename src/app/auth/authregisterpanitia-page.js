import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import { Route } from 'react-router-dom';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import RegisterComponent from '../../modules/auth/component/authregisterpanitia-component';

import '../../assets/css/auth-login.css'

class AuthRegisterPanitia extends Component {
    state = {
        nama_panitia: '',
        email : '',
        password: '',
        id_role: '3',
        confirm_password: '',
    }
    

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const params = {
            nama_panitia: this.state.nama_panitia,
            email: this.state.email,
            password: this.state.password,
            id_role: this.state.id_role,
            confirm_password: this.state.confirm_password,   
        }

        // if(validation.)

        console.log('params',params)
        API.post(`/register/panitia`, params)
        .then(res => {
            console.log('res',res.status)
            if(res.status == 201){
                this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
            }
           
            // else{
            //     alert('Login salah')
            // }
            // localStorage.setItem('token', res)
        });
    }

    render() {
        return (
        <RegisterComponent
            initialData={this.state}
            navigate={this.props.navigate}
            
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />
        );
    }
}
 

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(AuthRegisterPanitia);
export default page