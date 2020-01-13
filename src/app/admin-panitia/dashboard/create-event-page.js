import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import CreateEventComponent from '../../../modules/admin-panitia/create-event/create-event-component';

class CreateEventPage extends Component {
    state = {  }

    render() { 
        return ( 
            <CreateEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);
export default page