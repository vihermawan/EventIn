import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import ECertificateComponent from '../../../modules/admin-signer/e-certificate/e-certificate-component';

class ECertificatePage extends Component {
    state = {  }

    render() { 
        return ( 
            <ECertificateComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ECertificatePage);
export default page