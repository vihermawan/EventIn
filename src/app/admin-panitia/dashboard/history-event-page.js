import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import HistoryEventComponent from '../../../modules/admin-panitia/history-event/history-event-component';

class HistoryEventPage extends Component {
    state = {  }

    render() { 
        return ( 
            <HistoryEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(HistoryEventPage);
export default page