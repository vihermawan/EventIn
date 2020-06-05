import React, { Component } from 'react';
import { notification, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../common/api'
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import ForgotPasswordComponent from '../../modules/forgot-password/forgot-password-component';
import * as validation from '../../common/utils/validation'

class ForgotPasswordPage extends Component {
    state = {  
        email : '',
        loading : false,
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

    showModal2 = () => {
        this.setState({
            show :true,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const params = {
            email: this.state.email,
        }
        if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Email harus diisi')
        }else{
            this.setState({show :true})
            API.post(`/password/create`, params)
            .then(res => {
                if( res.status === 200){
                    this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
                    message.success('Silahkan cek email');
                }else{
                    this.openNotification('Email Salah','Silahkan masukkan email kembali')
                    this.setState({show : false})
                }
            });
        }
    }


    render() { 
        return ( 
            <ForgotPasswordComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
export default page