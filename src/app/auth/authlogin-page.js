import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import { Route } from 'react-router-dom';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import LoginComponent from '../../modules/auth/component/authlogin-component';
import '../../assets/css/auth-login.css'
import axios from 'axios';

class AuthLogin extends Component {
    state = {
        username: '',
        password: '',
    }
    componentDidMount(){
        
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
            email: this.state.username,
            password: this.state.password   
        }
        console.log('params',params)
        API.post(`/login`, params)
        .then(res => {
            console.log('res',res)
            if(res.statusText == 'OK'){
                this.props.navigate(CONSTANS.DASHBOARD_MENU_KEY)
                // localStorage.setItem('token', res.data)
            } else {
                alert('salah lu loginnya tong')
            }
            localStorage.setItem('token', res)
        });
    }git

    render() {
        return (
        <LoginComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
export default page