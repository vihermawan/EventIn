import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import { API } from '../../common/api'
import HomeComponent from '../../modules/home/component/home-component';

class HomePage extends Component {
    state = {  }

    componentDidMount(){
        API.get(`/annual`)
        .then((response) => {
            console.log(response)
        },(error) => {
                console.log(error)
            },
        );
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