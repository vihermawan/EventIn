import React, { Component } from 'react';
import { notification } from 'antd'
import { Route } from 'react-router-dom';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import LoginComponent from '../../modules/auth/component/authlogin-component';
import '../../assets/css/auth-login.css'
import * as validation from '../../common/utils/validation'

class AuthLogin extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
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

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const params = {
            email: this.state.email,
            password: this.state.password   
        }

        if(validation.emailRequired(this.state.email) != null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'harus diisi email')
        } else if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'harus diisi email')
        } else {
            this.setState({loading: true})

            API.post(`/login`, params)
            .then(res => {
                console.log('res',res )
                if(res.status == 200){
                    if(res.data.data.id_role == 2){
                        localStorage.setItem('username', res.data.nama)
                        this.props.navigate(CONSTANS.PANITIA_MENU_KEY)
                        localStorage.setItem('token', res.data.data.api_token)
                    }
                    else if(res.data.data.id_role == 1) {
                        localStorage.setItem('username', res.data.nama)
                        this.props.navigate(CONSTANS.ADMIN_MENU_KEY)
                        localStorage.setItem('token', res.data.data.api_token)
                    }
                    else if(res.data.data.id_role == 3) {
                        localStorage.setItem('username', res.data.nama)
                        this.props.navigate(CONSTANS.HOME_MENU_KEY)
                        localStorage.setItem('token', res.data.data.api_token)
                    }
                    else if(res.data.data.id_role == 4) {
                        localStorage.setItem('username', res.data.nama)
                        this.props.navigate(CONSTANS.SIGNER_MENU_KEY)
                        localStorage.setItem('token', res.data.data.api_token)
                    }
                }
                else{
                    // alert('Login salah')
                    this.openNotification('Login Salah', 'Silahkan isi email dan password dengan benar')
                }
                this.setState({loading: false})
            });
        }
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