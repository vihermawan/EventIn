import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import LoginComponent from '../../modules/auth/component/authlogin-component';
import '../../assets/css/auth-login.css'

class AuthLogin extends Component {
    state = {
        email: '',
        password: '',
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

    handleSubmit = e => {
        this.setState({loading: true})
        e.preventDefault();
        const params = {
            email: this.state.email,
            password: this.state.password   
        }
        console.log('params',params)
        API.post(`/login`, params)
        .then(res => {
            console.log('res',res.data )
            localStorage.setItem('username', res.data.nama)
            if(res.data.data.id_role == 2){
                this.props.navigate(CONSTANS.PANITIA_MENU_KEY)
                localStorage.setItem('token', res.data.data.api_token)
                this.setState({loading: false})
            }
            else if(res.data.data.id_role == 1) {
                this.props.navigate(CONSTANS.ADMIN_MENU_KEY)
                localStorage.setItem('token', res.data.data.api_token)
                this.setState({loading: false})
            }
            else if(res.data.data.id_role == 3) {
                this.props.navigate(CONSTANS.HOME_MENU_KEY)
                localStorage.setItem('token', res.data.data.api_token)
                this.setState({loading: false})
            }
            else if(res.data.data.id_role == 4) {
                this.props.navigate(CONSTANS.SIGNER_MENU_KEY)
                localStorage.setItem('token', res.data.data.api_token)
                this.setState({loading: false})
            }
            else{
                alert('Login salah')
            }
        });
    }

    render() {
        return (
        <LoginComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
export default page