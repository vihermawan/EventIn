import React, { Component } from 'react';
import { connect } from 'react-redux';
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import VisualComponent from '../../../modules/admin-panitia/create-event/visual/visual-component'
import Axios from 'axios';

class VisualPage extends Component {
    state = {
      
    }

    componentDidMount(){
       
    }

  
    render() {
        return ( 
            <VisualComponent
                initialData={this.state}
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

const page = connect(mapStateToProps, mapDispatchToProps)(VisualPage);
export default page