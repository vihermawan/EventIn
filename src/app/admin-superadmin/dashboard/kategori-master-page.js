import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from '../../../common/store/action'
import KategoriMasterComponent from '../../../modules/admin-superadmin/data-master/kategori-component';

class KategoriMasterPage extends Component {
    state = {  }

    render() { 
        return ( 
            <KategoriMasterComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(KategoriMasterPage);
export default page