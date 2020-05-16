import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import CreateEventComponent from '../../../modules/admin-panitia/create-event/create-event-component';

class CreateEventPage extends Component {
    state = { 
        username: '',
        password: '',

     }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    
    render() { 
        return ( 
            <CreateEventComponent
                navigate={this.props.navigate}
                initialData={this.state}
                
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
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