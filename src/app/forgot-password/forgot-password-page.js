import React, { Component } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../common/api'
import { navigate } from '../../common/store/action'
import ForgotPasswordComponent from '../../modules/forgot-password/forgot-password-component';
import * as validation from '../../common/utils/validation'

class ForgotPasswordPage extends Component {
    state = {  
        current: '',
        email : '',
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
    //

    openNotification = (message, description) => {
        notification.success({
            message,
            description,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const params = {
            email: this.state.email,
        }
        if(validation.emailRequired(this.state.email) != null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'harus diisi email')
        }else{
            this.setState({loading: true})
            API.post(`/password/create`, params)
            .then(res => {
                console.log('res',res)
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