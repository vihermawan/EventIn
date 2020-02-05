import React, { Component } from 'react';
import { connect } from 'react-redux';
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import PanitiaComponent from '../../../modules/admin-panitia/dashboard-panitia/panitia-component';
import Axios from 'axios';

class PanitiaPage extends Component {
    state = {
        sertifikat: [],
    }

    componentDidMount(){
        // this.getStatus();
    }

    // getStatus=()=>{
    //     API.get(`/status`)
    //     .then(res => {
    //         console.log('res',res)
           
    //     });
    // }
    
  
    render() {
        return ( 
            <PanitiaComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(PanitiaPage);
export default page