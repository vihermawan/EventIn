import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import ReceivedComponent from '../../../modules/admin-superadmin/e-certificate/received/received-component';

class ReceivedPage extends Component {
    state = {  }

    render() { 
        return ( 
            <ReceivedComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ReceivedPage);
export default page