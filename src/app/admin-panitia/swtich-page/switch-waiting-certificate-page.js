import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import SwitchWaitingCertificateComponent from '../../../modules/admin-panitia/switch-page/switch-waiting-certificate-component';

class SwitchWaitingCertificatePage extends Component {
    state = {
        
    }

    componentDidMount(){
      
    }

    render() {  
        return ( 
            <SwitchWaitingCertificateComponent
                initialData={this.state}
                navigate={this.props.navigate}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(SwitchWaitingCertificatePage);
export default page