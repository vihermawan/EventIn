import React, { Component } from 'react';
import { notification } from 'antd'
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import LoginComponent from '../../modules/auth/component/authlogin-component';
import '../../assets/css/auth-login.css'
import * as validation from '../../common/utils/validation'

// import store
import { setNamaUser, onLogin } from '../../modules/auth/store/login-action'

class AuthLogin extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        confirmDirty: false,
    }
    componentDidMount(){
        
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

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

    successNotification = (message, description) => {
        notification.success({
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
        if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap isi data dengan benar')
        }else if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'Harap isi data dengan benar')
        }else {
            // this.props.onLogin(params);
            this.setState({loading: true})
            API.post(`/auth/login`, params)
            .then(res => {
                if(res.status === 200){
                    if(res.data.id_role === 2){
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('username', res.data.nama)
                        localStorage.setItem('id_role', res.data.id_role)
                        localStorage.setItem('profile_picture', res.data.profile_picture)
                        localStorage.setItem('instagram', res.data.instagram)
                        localStorage.setItem('telepon', res.data.telepon)
                        this.props.navigate(CONSTANS.PANITIA_MENU_KEY)
                        this.successNotification('Sukses', 'Berhasil Masuk')
                      
                    }
                    else if(res.data.id_role === 1) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('username', res.data.nama)
                        localStorage.setItem('profile_picture', res.data.profile_picture)
                        localStorage.setItem('id_role', res.data.id_role)
                        this.props.navigate(CONSTANS.ADMIN_MENU_KEY)
                        this.successNotification('Sukses', 'Berhasil Masuk')
                       
                    }
                    else if(res.data.id_role === 3) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('username', res.data.nama)
                        localStorage.setItem('profile_picture', res.data.profile_picture)
                        localStorage.setItem('id_role', res.data.id_role)
                        this.props.navigate(CONSTANS.HOME_MENU_KEY)
                        this.successNotification('Sukses', 'Berhasil Masuk')
                        
                    }
                    else if(res.data.id_role === 4) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('username', res.data.nama)
                        localStorage.setItem('profile_picture', res.data.profile_picture)
                        localStorage.setItem('id_role', res.data.id_role)
                        this.props.navigate(CONSTANS.SIGNER_MENU_KEY)
                        this.successNotification('Sukses', 'Berhasil Masuk')
                    }
                }else if(res.data.status === 'Banned'){
                    this.openNotification('Akun telah dibanned', 'Akun anda telah diblokir. Silahkan kirim email ke service.eventin@gmail.com jika menurut anda tidak selayaknya diblokir')
                }else{
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
            handleConfirmBlur = {this.handleConfirmBlur}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />
        );
    }
}
 

const mapStateToProps = state => ({
    // dataLogin: state.login.dataUser
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setNamaUser,
    // onLogin,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
export default page