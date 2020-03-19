import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, notification } from 'antd';
import { navigate } from '../../common/store/action'
import { API } from '../../common/api'
//import component
import EditProfileComponent from '../../modules/profile/component/edit-profile-component';

class EditProfilePage extends Component {
    state = { 
        id_peserta : '',
        nama_peserta : '',
        email : '',
        jenis_kelamin : '',
        tanggal_lahir: '',
        no_telepon : '',
        pekerjaan : '',
        picture : '',
        foto_peserta : '',
        button_edit : 'Edit Foto Profil',
        loading : false
    }

    componentDidMount(){
        this.getProfile();
    }

    //get data profile dari API
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/peserta/edit-profile`)
        .then(res => {
            console.log('res',res.data.data.user)
            this.setState({
                id_peserta : res.data.data.user.peserta.id_peserta,
                nama_peserta : res.data.data.user.peserta.nama_peserta,
                email : res.data.data.user.email,
                pekerjaan : res.data.data.user.peserta.pekerjaan,
                no_telepon : res.data.data.user.peserta.no_telefon,
                jenis_kelamin : res.data.data.user.peserta.jenis_kelamin,
                picture:res.data.data.user.peserta.image_URL,
                foto_peserta : res.data.data.user.peserta.foto_peserta,
                loading: false,
            })
        });
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

    uploadGambar = (event) => {
        this.getBase64(event.target.files[0], imageUrl => {
            this.setState({ picture: imageUrl })
        })
        this.setState({ foto_peserta:event.target.files[0] })
    }


    handleJenisKelamin = (value) => {
        this.setState({ jenis_kelamin: value.key })
        console.log('jenis_kelamin', value.key);
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
        API.postEdit(`/peserta/profile/edit/${id_peserta}`, params)
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
            <EditProfileComponent
                navigate={this.props.navigate}
                initialData={this.state}
                handleChange = {this.handleChange}
                uploadGambar = {this.uploadGambar}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar = {this.handleButtonGambar}
                handleJenisKelamin ={this.handleJenisKelamin}
                handleSubmit = {this.handleSubmit}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
export default page