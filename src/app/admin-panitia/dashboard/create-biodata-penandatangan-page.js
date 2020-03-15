import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import { Upload, Icon, message } from 'antd';
import { navigate } from '../../../common/store/action'
import CreateBiodataPenandatanganComponent from '../../../modules/admin-panitia/list-penandatangan/create-penandatangan-component';

class CreateBiodataPenandatanganPage extends Component {
    state = { 
       nama : '',
       email : '',
       jabatan: '',
       instansi : '',
       nip : '',
       profile_picture: null,
       loading : false,
     }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    getBase64 = (img, callback)  =>{
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.addEventListener('load', () => callback(reader.result));
       
    }
  
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
      
    handleChangeFoto = info => {
        if (info.file.status === 'uploading') {
            this.setState({ 
                loading: true 
            });
            return;
    }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            message.success(`${info.file.name} file uploaded successfully`);
        //     this.getBase64(info.file.originFileObj, img =>
        //         this.setState({
        //             profile_picture : img,
        //             loading: false,
        //         }),
        //  );
        this.setState({
            profile_picture : info.file.name,
            loading: false,
        })
        }
    };

    onChange = info => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        
          message.success(`${info.file.name} file uploaded successfully`);
        //   this.setState({
        //     profile_picture : info.file.name,
        //     // loading: false,
        //     })
        this.uploadGambar(info);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
    }


    uploadGambar = (event) => {
        this.setState({
            profile_picture:event.target.files[0]
        })
    }
    

    handleSubmit = e => {
        e.preventDefault();
        const params = {
            nama: this.state.nama,
            email: this.state.email,
            jabatan: this.state.jabatan,
            nip: this.state.nip,
            instansi: this.state.instansi,   
            profile_picture: this.state.profile_picture,   
        }
        console.log('params',params)
        const fd = new FormData()
        fd.append('profile_picture',this.state.profile_picture)
        
        console.log('fd',fd)
        // this.setState({loading: true})
            API.post(`/panitia/create/biodata-penandatangan`, fd)
            .then(res => {
                console.log('res',res)
                // if(res.status == 201){
                //     this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
                // }else{
                //     this.openNotification('Register Salah', 'Silahkan isi data dengan benar')
                // }
                // this.setState({loading: false})
            });
    }

    
    render() { 
        return ( 
            <CreateBiodataPenandatanganComponent
                navigate={this.props.navigate}
                initialData={this.state}
                
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                beforeUpload = {this.beforeUpload}
                handleChangeFoto = {this.handleChangeFoto}
                uploadGambar={this.uploadGambar}
                onChange = {this.onChange}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(CreateBiodataPenandatanganPage);
export default page