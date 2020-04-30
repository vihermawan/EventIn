import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import TemplateSertifComponent from '../../../modules/admin-panitia/e-certificate/template-component';


class TemplateSertifPage extends Component {
    state = {
        
    }

    componentDidMount(){
       
    }

    render() { 

        return ( 
            <TemplateSertifComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(TemplateSertifPage);
export default page