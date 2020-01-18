import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import SignerComponent from '../../../modules/admin-signer/dashboard-signer/signer-component';

class SignerPage extends Component {
    state = {  }

    render() { 
        return ( 
            <SignerComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(SignerPage);
export default page