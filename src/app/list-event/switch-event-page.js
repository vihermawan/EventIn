import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import SwitchEventComponent from '../../modules/list-event/component/switch-event-component';

class SwitchEventPage extends Component {
    state = {
        loadingHome :false,
    }

    componentDidMount(){
      
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })

    render() {  
        return ( 
            <SwitchEventComponent
                initialData={this.state}
                navigate={this.props.navigate}
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

const page = connect(mapStateToProps, mapDispatchToProps)(SwitchEventPage);
export default page