import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import TabAbsentComponent from '../../../modules/admin-panitia/tab-absent/tab-absent-component';

class TabAbsentPage extends Component {
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
            <TabAbsentComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(TabAbsentPage);
export default page