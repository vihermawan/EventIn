import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import RegisteredComponent from '../../modules/registered/component/registered-component';

class RegisteredPage extends Component {
    state = {  }

    render() { 
        return (
            <RegisteredComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(RegisteredPage);
export default page