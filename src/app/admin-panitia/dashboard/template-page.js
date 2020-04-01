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

    getTemplate=()=>{
      this.setState({loading: true})
      API.get(`/panitia/download/template`)
      .then(res => {
        console.log('res',res)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sertifikat.rtf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  }

    render() { 

        return ( 
            <TemplateSertifComponent
                initialData={this.state}
                navigate={this.props.navigate}
                getTemplate={this.getTemplate}
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