import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import WaitingListComponent from '../../../modules/admin-signer/waiting-list/waiting-list-component';

class WaitingListPage extends Component {
    state = {  }

    render() { 
        return ( 
            <WaitingListComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingListPage);
export default page