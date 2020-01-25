import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import ApprovalEventComponent from '../../../modules/admin-superadmin/user/panitia/approval-event-component';

class ApprovalEventPage extends Component {
    state = {  }

    render() { 
        return ( 
            <ApprovalEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ApprovalEventPage);
export default page