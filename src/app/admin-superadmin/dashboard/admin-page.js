import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import AdminComponent from '../../../modules/admin-superadmin/dashboard/admin-component';

class AdminPage extends Component {
    state = {  }

    render() { 
        return ( 
            <AdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(AdminPage);
export default page