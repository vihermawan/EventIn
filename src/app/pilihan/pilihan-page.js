import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import PilihanComponent from '../../modules/pilihan/component/pilihan-component';

class PilihanPage extends Component {
    state = {  }

    render() { 
        return ( 
            <PilihanComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(PilihanPage);
export default page