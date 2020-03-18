import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfileSignerComponent from '../../../modules/admin-superadmin/user/penandatangan/edit-penandatangan-component';


class EditProfileAdminSignerPage extends Component {
    state = {
        id_penandantangan : '',
        nama_penandatangan : '',
        email : '',
        instansi : '',
        nip : '',
        method : 'PUT',
        jabatan : '',
        file_p12 : null,
        picture : '',
        name_photo : '',
        profile_picture: null,
        loading: false,
        button_edit : 'Edit Foto Profil',
    }

    componentDidMount(){
        this.getProfile(this.props.idUsers);
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

    uploadP12 = (event) => {
        this.setState({
            file_p12:event.target.files[0]
        })
    }
    
    //get data profile dari API
    getProfile=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/showeditpenandatangan/${id_users}`)
        .then(res => {
          console.log('res',res.data.data.penandatangan)
          this.setState({
            id_penandatangan : res.data.data.penandatangan.penandatangan.id_penandatangan,
            nama_penandatangan :res.data.data.penandatangan.penandatangan.nama_penandatangan ,
            email : res.data.data.penandatangan.email,
            instansi :res.data.data.penandatangan.penandatangan.instansi ,
            nip :res.data.data.penandatangan.penandatangan.nip,
            file_p12 : res.data.data.penandatangan.penandatangan.file_p12,
            picture : res.data.data.penandatangan.penandatangan.image_URL,
            jabatan : res.data.data.penandatangan.penandatangan.jabatan,
            profile_picture :res.data.data.penandatangan.penandatangan.profile_picture,
            loading: false,
          })
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        const id_penandatangan = this.state.id_penandatangan
        const params = new FormData()
        params.append('profile_picture',this.state.profile_picture)
        params.append("_method", 'PUT')
        params.append('file_p12',this.state.file_p12)
        params.set('nama_penandatangan',this.state.nama_penandatangan)
        params.set('email',this.state.email)
        params.set('jabatan',this.state.jabatan)
        params.set('nip',this.state.nip)
        params.set('instansi',this.state.instansi)
        
        API.postEdit(`/admin/penandatangan/edit/${id_penandatangan}`, params)
            .then(res => {
                console.log('res',res)
                // if(res.status == 201){
                //     this.props.navigate(CONSTANS.LIST_BIODATA_PENANDATANGAN_PANITIA_MENU_KEY)
                // }else{
                //     this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                // }
                this.setState({loading: false})
            });

    }

    handleButtonEdit = () => {
        this.setState({
            button_edit : 'Upload Gambar'
        })
    }

    handleButtonGambar = () => {
        this.setState({
            button_edit : 'Edit Foto Profil'
        })
    }

    render() { 
        return ( 
            <EditProfileSignerComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                uploadGambar = {this.uploadGambar}
                uploadP12 = {this.uploadP12}
                handleSubmit = {this.handleSubmit}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar = {this.handleButtonGambar}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.penandatangan,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfileAdminSignerPage);
export default page