import React, { Component } from 'react';
import { message,notification } from 'antd';
import CONSTANS from '../../common/utils/Constants'
import { connect } from 'react-redux';
import { API } from '../../common/api'
import { navigate } from '../../common/store/action'
import EditPasswordComponent from '../../modules/profile/component/edit-password-component';


class EditPasswordPage extends Component {
    state = {
       old_password : '',
       password: '',
       loading : false,
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

    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        params.set('old_password',this.state.old_password)
        params.set('password',this.state.password)
        params.set('password_confirmation',this.state.password)
        this.setState({loading: true})
        
        API.post(`/peserta/change-password`, params)
            .then(res => {
                console.log('res',res)
                if(res.status == 200){
                    this.props.navigate(CONSTANS.PROFILE_MENU_KEY)
                    message.success('Passwword Berhasil di Ubah');
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
            });
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