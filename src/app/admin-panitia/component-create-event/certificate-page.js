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
    
  
    render() {


    const handleUpload = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

        return ( 
            <CertificateComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                handleUpload={handleUpload}
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