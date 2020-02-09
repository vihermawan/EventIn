import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import BiodataPenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/biodata-penandatangan-component';

class BiodataPenandatanganAdminPage extends Component {
    state = {  }

    render() { 
        return ( 
            <BiodataPenandatanganAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(BiodataPenandatanganAdminPage);
export default page