import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import CONSTANS from '../../common/utils/Constants'
import HomeComponent from '../../modules/home/component/home-component';

 
class HomePage extends Component {
    state = { 
        loadingHome: false,
    }

    componentDidMount(){
    
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })
 
    onLoginHome = () => {
        this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
    }

    onRegisterHome = () => {
        this.props.navigate(CONSTANS.CHOOSE_MENU_KEY)
        console.log('pindah')
    }

    render() { 
        return ( 
            <HomeComponent
                initialData = {this.state}
                navigate={this.props.navigate}
                onLoginHome = {this.onLoginHome}
                onRegisterHome = {this.onRegisterHome}
                onStartLoadingHome={this.onStartLoadingHome}
                onFinishLoadingHome={this.onFinishLoadingHome}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default page