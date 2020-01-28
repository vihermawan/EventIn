import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import StatusMasterComponent from '../../../modules/admin-superadmin/data-master/status-component';

class StatusMasterPage extends Component {
    state = {  }

    render() { 
        return ( 
            <StatusMasterComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(StatusMasterPage);
export default page