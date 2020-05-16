import React, { Component } from 'react';
import { notification, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfilePesertaAdminComponent from '../../../modules/admin-superadmin/user/peserta/edit-peserta-component';


class EditProfilePesertaAdminPage extends Component {
    state = {
        id_peserta : '',
        nama_peserta : '',
        email : '',
        pekerjaan : '',
        jenis_kelamin: '',
        no_telepon : '',
        picture : '',
        loading: false,
        foto_peserta: null,
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
    
    //get data profile dari API
    getProfile=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta/${id_users}`)
        .then(res => {
            this.setState({
                id_peserta : res.data.data.peserta.peserta.id_peserta,
                nama_peserta :res.data.data.peserta.peserta.nama_peserta,
                email : res.data.data.peserta.email,
                organisasi : res.data.data.peserta.peserta.organisasi,
                jenis_kelamin : res.data.data.peserta.peserta.jenis_kelamin,
                pekerjaan : res.data.data.peserta.peserta.pekerjaan,
                no_telepon : res.data.data.peserta.peserta.no_telefon,
                picture : res.data.data.peserta.peserta.image_URL,
                foto_peserta :res.data.data.peserta.peserta.foto_peserta,
                loading: false,
            })
        });
    }

    uploadGambar = (event) => {
        this.getBase64(event.target.files[0], imageUrl => {
            this.setState({ picture: imageUrl })
        })
        this.setState({ foto_peserta:event.target.files[0] })
    }


    handleJenisKelamin = (value) => {
        this.setState({ jenis_kelamin: value.key })
    }

    
    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        const id_peserta = this.state.id_peserta
        const params = new FormData()
        params.append('foto_peserta',this.state.foto_peserta)
        params.append("_method", 'PUT')
        params.set('nama_peserta',this.state.nama_peserta)
        params.set('email',this.state.email)
        params.set('jenis_kelamin',this.state.jenis_kelamin)
        params.set('organisasi',this.state.organisasi)
        params.set('instagram',this.state.instagram)
        params.set('no_telepon',this.state.no_telepon)
        this.setState({loading: true})
        API.postEdit(`/admin/peserta/edit/${id_peserta}`, params)
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
            <EditProfilePesertaAdminComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                beforeUpload = {this.beforeUpload}
                uploadGambar = {this.uploadGambar}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar = {this.handleButtonGambar}
                handleSubmit = {this.handleSubmit}
                handleJenisKelamin ={this.handleJenisKelamin}
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

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePesertaAdminPage);
export default page