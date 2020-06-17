import React, { Component } from 'react';
import { notification,message } from 'antd'
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
        telepon :'Silahkan isi',
        instagram : 'Silahkan isi',
        organisasi :'',
        password_confirmation: '',
        loading:false,
        show :false,
        is_aggreed : false,
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

    onRegister = () => {
        this.setState({show : true})
    }

    
    handleOk = e => {
        if(this.state.is_aggreed === false){
            this.openNotification('Silahkan Check List', 'Syarat dan Ketentuan harap di klik')
        }else{
            this.handleSubmit();
        }
    };

    handleCancel = e => {
        this.setState({
            show: false,
        });
    };

    onChange = (e) => {
        this.setState({is_aggreed : e.target.checked })
    }


    handleSubmit = () => {
        const params = new FormData()
        params.set('nama_panitia',this.state.nama_panitia)
        params.set('password',this.state.password)
        params.set('email',this.state.email)
        params.set('password_confirmation',this.state.password)
        params.set('telepon',this.state.telepon)
        params.set('instagram',this.state.instagram)
        params.set('organisasi',this.state.organisasi)

        if(validation.required(this.state.nama_panitia) !== null){
            const message = validation.required(this.state.nama_panitia)  
            this.openNotification(message, 'Nama belum dimasukkan')
        }else if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(validation.required(this.state.organisasi) !== null){
            const message = validation.required(this.state.organisasi);
            this.openNotification(message, 'Organisasi belum diisi')
        }else if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'Password minimal 8 karakter')
        }else{
            this.setState({loading: true,show : false})
            API.post(`/auth/register/panitia`, params)
            .then(res => {
                if(res.status === 201){
                    this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
                    message.success('Berhasil Melakukan Registrasi');
                }else if(res.status === 422){
                    if(res.data.errors.email[0] === 'The email has already been taken.'){
                        this.openNotification('Email telah terdaftar', 'Silahkan daftar dengan email lain')
                    }
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
            onRegister = {this.onRegister}
            handleOk = {this.handleOk}
            handleCancel = {this.handleCancel}
            onChange ={this.onChange}
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