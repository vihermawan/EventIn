import React, { Component } from 'react';
import { notification, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfilePanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/edit-panitia-component';


class EditProfilePanitiaAdminPage extends Component {
    state = {
        id_panitia : '',
        nama_panitia : '',
        email : '',
        organisasi : '',
        instagram: '',
        no_telepon : '',
        picture : '',
        loading: false,
        foto_panitia: null,
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
        this.setState({ foto_panitia:event.target.files[0] })
    }

    
    //get data profile dari API
    getProfile=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/detail-panitia/admin/${id_users}`)
        .then(res => {
            this.setState({
                id_panitia : res.data.data.panitia.panitia.id_panitia,
                nama_panitia :res.data.data.panitia.panitia.nama_panitia,
                email : res.data.data.panitia.email,
                instagram : res.data.data.panitia.panitia.instagram,
                organisasi : res.data.data.panitia.panitia.organisasi,
                no_telepon : res.data.data.panitia.panitia.no_telepon,
                picture : res.data.data.panitia.panitia.image_URL,
                foto_panitia :res.data.data.panitia.panitia.foto_panitia,
                loading: false,
            })
        });
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
        API.postEdit(`/admin/panitia/edit/${id_panitia}`, params)
            .then(res => {
                if(res.status === 200){
                    message.success('Data Berhasil di Ubah');
                    this.componentDidMount();
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
            });

    }

    render() { 


        return ( 
            <EditProfilePanitiaAdminComponent
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
    ...state.panitia,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePanitiaAdminPage);
export default page