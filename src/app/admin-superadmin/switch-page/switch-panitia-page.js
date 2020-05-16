import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import SwitchPanitiaComponent from '../../../modules/admin-superadmin/switch-page/switch-panitia-component';

class SwitchPanitiaPage extends Component {
    state = {
        activeKey: '1',
    }

    componentDidMount(){
    
    }

    changeKey = (key) => {
        this.setState({activeKey: key})
    }

    render() {  
        return ( 
            <SwitchPanitiaComponent
                initialData={this.state}
                navigate={this.props.navigate}
                changeKey={this.changeKey}
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