import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import AboutComponent from '../../modules/about/component/about-component';

class AboutPage extends Component {
    state = {  }

    render() { 
        return (
            <AboutComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(AboutPage);
export default page