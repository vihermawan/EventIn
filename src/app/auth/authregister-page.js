import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import { Route } from 'react-router-dom';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import RegsiterComponent from '../../modules/auth/component/authregister-component';

import '../../assets/css/auth-login.css'

class AuthRegister extends Component {
    state = {
        nama_peserta: '',
        email : '',
        password: '',
        id_role: '3',
        confirm_password: '',
    }
    componentDidMount(){
        API.get(`/registerpanitia`)
        .then((response) => {
            console.log(response)
        },(error) => {
                console.log(error)
            },
        );
    }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     console.log('username : ', this.state.username)
    //     console.log('email : ', this.state.email)
    //     console.log('password : ', this.state.password)
    // }

    handleSubmit = e => {
        e.preventDefault();
        const params = {
            nama_peserta: this.state.nama_peserta,
            email: this.state.email,
            password: this.state.password,
            id_role: this.state.id_role,
            confirm_password: this.state.confirm_password,   
        }
        console.log('params',params)
        API.post(`/register/peserta`, params)
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
        <RegsiterComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(AuthRegister);
export default page