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

    handleChangePdf = info => {
      if (info.file.status === 'uploading') {
        this.setState({ 
          loading: true 
        });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, sertifikat =>
          this.setState({
            sertifikat : info.file,
            loading: false,
          }),
        );
      }
    };
    
  
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
                beforeUpload = {this.beforeUpload}
                handleChangePdf = {this.handleChangePdf}
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