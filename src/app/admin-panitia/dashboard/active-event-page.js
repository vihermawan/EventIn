import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import ActiveEventComponent from '../../../modules/admin-panitia/active-event/active-event-component';

class ActiveEventPage extends Component {
    state = {  }

    render() { 
        return ( 
            <ActiveEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ActiveEventPage);
export default page