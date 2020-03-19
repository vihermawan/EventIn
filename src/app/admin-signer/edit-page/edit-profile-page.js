import React, { Component } from 'react';
import { message,notification } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfileSignerComponent from '../../../modules/admin-signer/profile/edit-profile-component';


class EditProfilePage extends Component {
    state = {
        id_penandatangan : '',
        nama_penandatangan : '',
        instansi : '',
        email : '',
        jabatan : '',
        nip : '',
        picture : '',
        profile_picture :'',
        loading: false,
        button_edit : 'Edit Foto Profil',
    }

    componentDidMount(){
        this.getProfile();
    }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }
    
    //get data profile dari API
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/penandatangan/profile-edit`)
        .then(res => {
            console.log('res',res)
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

    handleButtonEdit = () => {
        this.setState({
            button_edit : 'Upload Gambar',
            button_p12 : 'Upload File'
        })
    }

    handleButtonGambar = () => {
        this.setState({
            button_edit : 'Edit Foto Profil',
            button_p12 : 'Edit File P_12',
        })
    }

    
    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

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
        this.setState({loading: true})
        API.postEdit(`/penandatangan/profile/edit/${id_penandatangan}`, params)
            .then(res => {
                console.log('res',res)
                if(res.status == 200){
                    message.success('Data Berhasil di Ubah');
                    this.componentDidMount();
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
               
            });

    }

    render() { 
        return ( 
            <EditProfileSignerComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                uploadGambar = {this.uploadGambar}
                handleSubmit = {this.handleSubmit}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar = {this.handleButtonGambar}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
export default page