import React, { Component } from 'react';
import { notification } from 'antd'
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import RegisterComponent from '../../modules/auth/component/authregisterpanitia-component';
import * as validation from '../../common/utils/validation'

import '../../assets/css/auth-login.css'

class AuthRegisterPanitia extends Component {
    state = {
        nama_panitia: '',
        email : '',
        password: '',
        id_role: '3',
        password_confirmation: '',
        loading:false,
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
            nama_panitia: this.state.nama_panitia,
            email: this.state.email,
            password: this.state.password,
            id_role: this.state.id_role,
            password_confirmation: this.state.password_confirmation,   
        }

        if(validation.required(this.state.nama_panitia) != null){
            const message = validation.required(this.state.nama_panitia)  
            this.openNotification(message, 'Nama belum dimasukkan')
        }else if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'Password minimal 8 karakter')
        }else if(validation.emailRequired(this.state.email) != null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(validation.minPassword(this.state.password_confirmation)){
            const message = validation.minPassword(this.state.password_confirmation);
            this.openNotification(message, 'Harap memasukkan password yang sama')
        }else{
            console.log('params',params)
            this.setState({loading: true})
            API.post(`/register/panitia`, params)
            .then(res => {
                console.log('res',res.status)
                if(res.status == 201){
                    this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
                }else{
                    this.openNotification('Register Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
            });
        }
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