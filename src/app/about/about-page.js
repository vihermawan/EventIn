import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import AboutComponent from '../../modules/about/component/about-component';

class AboutPage extends Component {
    state = { 
        loadingHome: false,
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })

    render() { 
        return (
            <AboutComponent
                navigate={this.props.navigate}
                initialData= {this.state}
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

const page = connect(mapStateToProps, mapDispatchToProps)(AboutPage);
export default page