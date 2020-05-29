import React, { Component } from 'react';
import { message,notification } from 'antd';
import CONSTANS from '../../../common/utils/Constants'
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import EditPasswordComponent from '../../../modules/admin-signer/profile/edit-password-signer-component';


class EditPasswordPage extends Component {
    state = {
       old_password : '',
       password: '',
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

    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        params.set('old_password',this.state.old_password)
        params.set('password',this.state.password)
        params.set('password_confirmation',this.state.password)
        if(validation.minPassword(this.state.old_password)){
            const message = validation.minPassword(this.state.old_password);
            this.openNotification(message, 'Password Lama harus diisi')
        }else if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'Password Baru harus diisi')
        }else{
        this.setState({show: true})
        API.post(`/penandatangan/change-password`, params)
            .then(res => {
                if(res.status === 200){
                    if(res.data.status === 'Error'){
                        this.openNotification(res.data.message, 'Silahkan isi password dengan benar')
                        this.setState({show: false})
                    }else{
                        this.props.navigate(CONSTANS.PROFILE_SIGNER_MENU_KEY)
                        message.success('Password Berhasil di Ubah');
                    }
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({show: false})
            });
        }
    }

    render() { 

        return ( 
            <EditPasswordComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
              
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.user,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditPasswordPage);
export default page