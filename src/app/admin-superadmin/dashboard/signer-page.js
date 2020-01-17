import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import SignerAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/penandatangan-component';

class SignerAdminPage extends Component {
    state = {  }

    render() { 
        return ( 
            <SignerAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(SignerAdminPage);
export default page