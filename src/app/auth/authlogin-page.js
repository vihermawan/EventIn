import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import { Route } from 'react-router-dom';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import LoginComponent from '../../modules/auth/component/authlogin-component';

import '../../assets/css/auth-login.css'
import axios from 'axios';

class AuthLogin extends Component {
    state = {
        username: '',
        password: '',
    }
    componentDidMount(){
        axios.get(`http://localhost:8000/api/status`)
        .then(response => {
            console.log('response',response)
        })
        .catch( err => {
            console.log('error', err)
        });

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
        console.log('username : ', this.state.username)
        console.log('password : ', this.state.password)
    }

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