import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import ProfileSignerComponent from '../../../modules/admin-signer/profile/profile-component';

class ProfilePage extends Component {
    state = {  }

    render() { 
        return ( 
            <ProfileSignerComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default page