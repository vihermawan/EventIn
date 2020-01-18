import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import PanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/panitia-component';

class PanitiaAdminPage extends Component {
    state = {  }

    render() { 
        return ( 
            <PanitiaAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(PanitiaAdminPage);
export default page