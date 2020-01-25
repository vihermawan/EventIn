import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import ListPanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/listpanitia-component';

class ListPanitiaAdminPage extends Component {
    state = {  }

    render() { 
        return ( 
            <ListPanitiaAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ListPanitiaAdminPage);
export default page