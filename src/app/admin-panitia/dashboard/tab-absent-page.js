import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import TabAbsentComponent from '../../../modules/admin-panitia/tab-absent/tab-absent-component';

class TabAbsentPage extends Component {
    state = {
        
    }

    componentDidMount(){
      
    }

    render() {  
        return ( 
            <TabAbsentComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(TabAbsentPage);
export default page