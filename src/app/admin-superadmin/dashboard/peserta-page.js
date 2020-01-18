import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import PesertaAdminComponent from '../../../modules/admin-superadmin/user/peserta/peserta-component';

class PesertaAdminPage extends Component {
    state = {  }

    render() { 
        return ( 
            <PesertaAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(PesertaAdminPage);
export default page