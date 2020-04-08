import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import SignerComponent from '../../../modules/admin-signer/dashboard-signer/signer-component';

class SignerPage extends Component {
    state = {  }

    componentDidMount(){
        this.getCertificateAdmin();
    }

    getCertificateAdmin=()=>{
        this.setState({loading: true})
        API.get(`/penandatangan/sertifikat/waiting`)
        .then(res => {
          console.log('res',res.data.data.sertifikat)
            this.setState({
                e_certificate:res.data.data.sertifikat,
                loading: false,
            })
        });
    }


    render() { 
        return ( 
            <SignerComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(SignerPage);
export default page