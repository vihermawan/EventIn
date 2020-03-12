import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfilePesertaAdminComponent from '../../../modules/admin-superadmin/user/peserta/edit-peserta-component';


class EditProfilePesertaAdminPage extends Component {
    state = {
        nama_peserta : '',
        email : '',
        pekerjaan : '',
        jenis_kelamin: '',
        no_telepon : '',
        picture : '',
        loading: false,
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
      
    handleChangeFoto = info => {
        if (info.file.status === 'uploading') {
            this.setState({ 
                loading: true 
            });
            return;
    }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, picture =>
            this.setState({
                picture,
                loading: false,
            }),
        );
    }
    };
    
    //get data profile dari API
    getProfile=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta/${id_users}`)
        .then(res => {
            console.log('res',res.data.data)
            this.setState({
                nama_peserta :res.data.data.peserta.peserta.nama_peserta,
                email : res.data.data.peserta.email,
                organisasi : res.data.data.peserta.peserta.organisasi,
                jenis_kelamin : res.data.data.peserta.peserta.jenis_kelamin,
                pekerjaan : res.data.data.peserta.peserta.pekerjaan,
                no_telepon : res.data.data.peserta.peserta.no_telefon,
                picture : res.data.data.peserta.peserta.image_URL,
                loading: false,
            })
        });
    }

    render() { 


        return ( 
            <EditProfilePesertaAdminComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                beforeUpload = {this.beforeUpload}
                handleChangeFoto = {this.handleChangeFoto}
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