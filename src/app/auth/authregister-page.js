import React, { Component } from 'react';
import { notification } from 'antd'
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import RegisterComponent from '../../modules/auth/component/authregisterpeserta-component';
import * as validation from '../../common/utils/validation'
import '../../assets/css/auth-login.css'
import moment from 'moment';

class AuthRegister extends Component {
    state = {
        nama_peserta: '',
        email : '',
        jenis_kelamin : '-',
        organisasi: 'Silahkan diisi',
        pekerjaan : 'Silahkan diisi',
        umur : '-',
        no_telefon : 'Silahkan diisi',
        tanggal_lahir : moment().format('YYYY-MM-DD'),
        password: '',
        password_confirmation: '',
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

    handleJenisKelamin = (value) => {
        this.setState({ jenis_kelamin: value.key })
        console.log('jenis_kelamin', value.key);
    }

    successNotification = (message, description) => {
        notification.success({
            message,
            description,
        });
    };

    
    handleSubmit = e => {
        e.preventDefault();
        const params = {
            nama_peserta: this.state.nama_peserta,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password,  
            jenis_kelamin : this.state.jenis_kelamin 
        }
        
        if(validation.required(this.state.nama_peserta) !== null){
            const message = validation.required(this.state.nama_peserta)  
            this.openNotification(message, 'Nama belum dimasukkan') 
        }else if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(this.state.jenis_kelamin === '-'){
            this.openNotification('Harus diisi', 'Jenis Kelamin belum dimasukkan')
        }else if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'Password minimal 8 karakter')
        }else{
            console.log('params',params)
            this.setState({loading: true})
            API.post(`/auth/register/peserta`, params)
            .then(res => {
                console.log('res',res)
                if(res.status === 201){
                    this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
                    this.successNotification('Sukses', 'Register Berhasil')
                }else if(res.data.errors.email[0] === 'The email has already been taken.'){
                    this.openNotification('Email telah terdaftar', 'Silahkan daftar dengan email lain')
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
            handleJenisKelamin={this.handleJenisKelamin}
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