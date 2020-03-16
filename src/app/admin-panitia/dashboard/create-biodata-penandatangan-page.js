import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import { notification, message } from 'antd';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import CreateBiodataPenandatanganComponent from '../../../modules/admin-panitia/list-penandatangan/create-penandatangan-component';

class CreateBiodataPenandatanganPage extends Component {
    state = { 
       nama : '',
       email : '',
       jabatan: '',
       instansi : '',
       nip : '',
       profile_picture: null,
       picture: null,
       loading : false,
       visible:false,
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
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
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

    uploadGambar = (event) => {
        this.getBase64(event.target.files[0], imageUrl => {
            this.setState({ picture: imageUrl })
        })
        this.setState({ profile_picture:event.target.files[0] })
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };
    

    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        params.append('profile_picture',this.state.profile_picture)
        params.set('nama',this.state.nama)
        params.set('email',this.state.email)
        params.set('jabatan',this.state.jabatan)
        params.set('nip',this.state.nip)
        params.set('instansi',this.state.instansi)
        
        console.log('params', params)

        if(validation.required(this.state.nama) != null){
            const message = validation.required(this.state.nama)  
            this.openNotification(message, 'Nama belum dimasukkan')
        }else if(validation.emailRequired(this.state.email) != null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(validation.required(this.state.jabatan) != null){
            const message = validation.required(this.state.jabatan)  
            this.openNotification(message, 'Jabatan belum dimasukkan')
        }else if(validation.required(this.state.nip) != null){
            const message = validation.required(this.state.nip)  
            this.openNotification(message, 'Nomor Induk Pegawai belum dimasukkan')
        }else if(validation.required(this.state.instansi) != null){
            const message = validation.required(this.state.instansi)  
            this.openNotification(message, 'Instansi belum dimasukkan')
        }
        
        else{
            this.setState({loading: true,visible:true})
            API.post(`/panitia/create/biodata-penandatangan`, params)
            .then(res => {
                console.log('res',res)
                if(res.status == 201){
                    this.props.navigate(CONSTANS.LIST_BIODATA_PENANDATANGAN_PANITIA_MENU_KEY)
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
            });
        }
    }

    
    render() { 
        return ( 
            <CreateBiodataPenandatanganComponent
                navigate={this.props.navigate}
                initialData={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                beforeUpload = {this.beforeUpload}
                uploadGambar={this.uploadGambar}
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