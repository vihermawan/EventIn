import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import LoginComponent from '../../modules/auth/component/authlogin-component';

import '../../assets/css/auth-login.css'

class AuthLogin extends Component {
    render() {
        return (
        <LoginComponent
            navigate={this.props.navigate}
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