import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import EventComponent from '../../modules/event/component/event-component';

class EventPage extends Component {
    state = {  }

    render() { 
        return (
            <EventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(EventPage);
export default page