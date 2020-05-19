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
        telepon : 'Silahkan diisi',
        tanggal_lahir : moment().format('YYYY-MM-DD'),
        password: '',
        password_confirmation: '',
        loading: false,
        is_aggreed : false,
        show : false,
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
    }

    successNotification = (message, description) => {
        notification.success({
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
        params.set('nama_peserta',this.state.nama_peserta)
        params.set('password',this.state.password)
        params.set('email',this.state.email)
        params.set('password_confirmation',this.state.password)
        params.set('telepon',this.state.telepon)
        params.set('jenis_kelamin',this.state.jenis_kelamin)
        params.set('organisasi',this.state.organisasi)
        params.set('pekerjaan',this.state.pekerjaan)
        
        if(validation.required(this.state.nama_peserta) !== null){
            const message = validation.required(this.state.nama_peserta)  
            this.openNotification(message, 'Nama belum dimasukkan') 
        }else if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(this.state.jenis_kelamin === '-'){
            this.openNotification('Harus diisi', 'Harap isi data jenis kelamin')
        }else if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'Harap masukkan kata sandi minimal 8 karakter')
        }else{
            this.setState({loading: true,show : false})
            API.post(`/auth/register/peserta`, params)
            .then(res => {
                if(res.status === 201){
                    this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
                    this.successNotification('Sukses', 'Pendaftaran Berhasil')
                }else if(res.status === 422){
                    if(res.data.errors.email[0] === 'The email has already been taken.'){
                        this.openNotification('Email telah terdaftar', 'Silahkan daftar dengan email lain')
                    }
                }else{
                    this.openNotification('Pendaftaran Salah', 'Silahkan isi data dengan benar')
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

const page = connect(mapStateToProps, mapDispatchToProps)(AuthRegister);
export default page