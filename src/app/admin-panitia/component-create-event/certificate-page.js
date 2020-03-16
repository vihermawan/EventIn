import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { navigate } from '../../../common/store/action'
import CertificateComponent from '../../../modules/admin-panitia/create-event/ceritificate/certificate-component';

class CertificatePage extends Component {
    state = {
      nama_sertifikat : '',
      deskripsi : '',
      sertifikat : '',
    }

    componentDidMount(){
       
    }

  componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-6'));
        console.log(data)
        if(data !== null){
            this.setState({
                nama_sertifikat: data.nama_sertifikat,
                deskripsi: data.deskripsi,
                sertifikat: data.sertifikat,
            })
        }
  }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    onNext = () => {
      this.props.next();
      localStorage.setItem('step-6', JSON.stringify(this.state));
    }
    onPrev = () => {
        this.props.prev();
    }

    getBase64 = (pdf, callback)  =>{
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(pdf);
    }

    beforeUpload = (file) => {
      const isPdf = file.type === '.pdf';
      if (!isPdf) {
        message.error('You can only upload PDF file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isPdf && isLt2M;
    }


    uploadFile = (event) => {
      // this.getBase64(event.target.files[0], imageUrl => {
      //     this.setState({ picture: imageUrl })
      // })
      this.setState({ sertifikat:event.target.files[0] })
      console.log('sertif',this.state.sertifikat)
  }
    
  
    render() {

        return ( 
            <CertificateComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                beforeUpload = {this.beforeUpload}
                uploadFile = {this.uploadFile}
                onNext={this.onNext}
                onPrev={this.onPrev}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(CertificatePage);
export default page