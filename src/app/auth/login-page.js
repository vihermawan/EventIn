import React, { Component } from 'react';
import { connect } from 'react-redux';

import { API } from '../../common/api'
import { navigate } from '../../common/store/action'
import LoginComponent from '../../modules/auth/component/login-component';
import * as validation from '../../common/utils/validation'

class LoginPage extends Component {
    state = {
        username: '',
        password: '',
    }

    componentDidMount(){
        API.get(`/annual`)
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

const page = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default page