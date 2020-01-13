import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import ListParticipantComponent from '../../../modules/admin-panitia/list-participant/list-participant-component';

class ListParticipantPage extends Component {
    state = {  }

    render() { 
        return ( 
            <ListParticipantComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ListParticipantPage);
export default page