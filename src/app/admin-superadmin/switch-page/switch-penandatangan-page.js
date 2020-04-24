import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import SwitchPenandatanganComponent from '../../../modules/admin-superadmin/switch-page/switch-penandatangan-component';

class SwitchPenandatanganPage extends Component {
    state = {
        
    }

    componentDidMount(){
      
    }

    render() {  
        return ( 
            <SwitchPenandatanganComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(SwitchPenandatanganPage);
export default page