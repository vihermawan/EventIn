import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import SwitchPanitiaComponent from '../../../modules/admin-superadmin/switch-page/switch-panitia-component';

class SwitchPanitiaPage extends Component {
    state = {
        
    }

    componentDidMount(){
      
    }

    render() {  
        return ( 
            <SwitchPanitiaComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(SwitchPanitiaPage);
export default page