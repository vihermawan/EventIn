import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import SwitchPesertaComponent from '../../../modules/admin-superadmin/switch-page/switch-peserta-component';

class SwitchPesertaPage extends Component {
    state = {
        
    }

    componentDidMount(){
      
    }

    render() {  
        return ( 
            <SwitchPesertaComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(SwitchPesertaPage);
export default page