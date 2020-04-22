import React, { Component } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../common/api'
import { navigate } from '../../common/store/action'
import * as validation from '../../common/utils/validation'
import SetPasswordComponent from '../../modules/set-password/set-password-component.js';

class SetPasswordPage extends Component {
    state = {  
        current: '',
        password : '',
        loading : false,
    }

    componentDidMount(){
        let pathArray = window.location.pathname.split('/');
        let pathName = pathArray[2];
        pathName === '' ? this.setState({current: '/set-password-signer'}) : this.setState({current: pathName});
        console.log('path',pathName)
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
        console.log('path',this.state.current)
        e.preventDefault();
        const params = {
            password: this.state.password,
            password_confirmation: this.state.password,  
        }
        if(validation.minPassword(this.state.password)){
            const message = validation.minPassword(this.state.password);
            this.openNotification(message, 'Password minimal 8 karakter')
        }else{
            this.setState({loading: true})
            API.post(`/password/reset/${this.state.current}`, params)
            .then(res => {
                console.log('res',res)
            });
        }
        
    }


    render() { 
        return ( 
            <SetPasswordComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(SetPasswordPage);
export default page