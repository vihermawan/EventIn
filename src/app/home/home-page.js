import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import { API } from '../../common/api'
import HomeComponent from '../../modules/home/component/home-component';
import { Lines } from 'react-preloaders';
 

class HomePage extends Component {
    state = {  }

    componentDidMount(){
        
    }

    render() { 
        return ( 
            <HomeComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default page