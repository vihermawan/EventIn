import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import PenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/penandatangan-component';

class PenandatanganAdminPage extends Component {
    state = {  }

    render() { 
        return ( 
            <PenandatanganAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(PenandatanganAdminPage);
export default page