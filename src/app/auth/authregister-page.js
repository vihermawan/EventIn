import React, { Component } from 'react';
import { notification } from 'antd'
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import RegisterComponent from '../../modules/auth/component/authregisterpeserta-component';
import * as validation from '../../common/utils/validation'
import '../../assets/css/auth-login.css'

class AuthRegister extends Component {
    state = {
        nama_peserta: '',
        email : '',
        jenis_kelamin : '',
        organisasi: 'Silahkan diisi',
        pekerjaan : 'Silahkan diisi',
        umur : '',
        no_telefon : 'Silahkan diisi',
        tanggal_lahir : '',
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

    
    handleSubmit = () => {
        // e.preventDefault();
        // const params = {
        //     nama_peserta: this.state.nama_peserta,
        //     email: this.state.email,
        //     password: this.state.password,
        //     password_confirmation: this.state.password_confirmation,   
        // }
        
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
            // console.log('params',params)
            // this.setState({loading: true})
            // API.post(`/register/peserta`, params)
            // .then(res => {
            //     console.log('res',res)
            //     if(res.status == 201){
            //         this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
            //     }else{
            //         this.openNotification('Register Salah', 'Silahkan isi data dengan benar')
            //     }
            //     this.setState({loading: false})
            // });
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

const page = connect(mapStateToProps, mapDispatchToProps)(AuthRegister);
export default page