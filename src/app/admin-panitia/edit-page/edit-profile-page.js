import React, { Component } from 'react';
import { message,notification } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfileComponent from '../../../modules/admin-panitia/profile/edit-profile-component';


class EditProfilePage extends Component {
    state = {
        user : [],
        id_panitia : '',
        nama_panitia : '',
        email : '',
        organsiasi : '',
        media_sosial : '',
        no_telepon : '',
        picture : '',
        foto_panitia : '',
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
      

    //get data profile dari API
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/panitia/profile-edit`)
        .then(res => {
            console.log('res',res)
            this.setState({
                id_panitia : res.data.data.user.panitia.id_panitia,
                nama_panitia : res.data.data.user.panitia.nama_panitia,
                email : res.data.data.user.email,
                organisasi : res.data.data.user.panitia.organisasi,
                no_telepon  : res.data.data.user.panitia.no_telepon,
                instagram : res.data.data.user.panitia.instagram,
                foto_panitia : res.data.data.user.panitia.foto_panitia,
                picture : res.data.data.user.panitia.image_URL,
                loading: false,
            })
        });
    }

    
    uploadGambar = (event) => {
        this.getBase64(event.target.files[0], imageUrl => {
            this.setState({ picture: imageUrl })
        })
        this.setState({ foto_panitia:event.target.files[0] })
    }

    handleButtonEdit = () => {
        this.setState({
            button_edit : 'Upload Gambar',
        })
    }

    handleButtonGambar = () => {
        this.setState({
            button_edit : 'Edit Foto Profil',
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
        const id_panitia = this.state.id_panitia
        const params = new FormData()
        params.append('foto_panitia',this.state.foto_panitia)
        params.append("_method", 'PUT')
        params.set('nama_panitia',this.state.nama_panitia)
        params.set('email',this.state.email)
        params.set('organisasi',this.state.organisasi)
        params.set('instagram',this.state.instagram)
        params.set('no_telepon',this.state.no_telepon)
        this.setState({loading: true})
        
        API.postEdit(`/panitia/editprofile/${id_panitia}`, params)
            .then(res => {
                console.log('res',res)
                if(res.status == 200){
                    message.success('Data Berhasil di Ubah');
                    this.componentDidMount();
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
            });
    }

    render() { 

        return ( 
            <EditProfileComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                beforeUpload = {this.beforeUpload}
                uploadGambar = {this.uploadGambar}
                handleSubmit = {this.handleSubmit}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar = {this.handleButtonGambar}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.user,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
export default page