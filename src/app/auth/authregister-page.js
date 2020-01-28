import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import { Route } from 'react-router-dom';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import RegsiterComponent from '../../modules/auth/component/authregister-component';

import '../../assets/css/auth-login.css'

class AuthRegister extends Component {
    state = {
        username: '',
        email : '',
        password: '',
    }
    componentDidMount(){
        // API.get(`/annual`)
        // .then((response) => {
        //     console.log(response)
        // },(error) => {
        //         console.log(error)
        //     },
        // );
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
        console.log('email : ', this.state.email)
        console.log('password : ', this.state.password)
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