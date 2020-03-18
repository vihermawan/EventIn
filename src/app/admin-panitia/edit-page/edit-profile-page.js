import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfileComponent from '../../../modules/admin-panitia/profile/edit-profile-component';


class EditProfilePage extends Component {
    state = {
        user : [],
        id_user : '',
        nama_panitia : '',
        email : '',
        organsiasi : '',
        media_sosial : '',
        no_telepon : '',
        picture : '',
        loading: false,
    }

    componentDidMount(){
        console.log('id_panitia',this.props.idPanitia)
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
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/panitia/profile-edit`)
        .then(res => {
            console.log('res',res)
            this.setState({
                id_user : res.data.data.user.id_users,
                nama_panitia : res.data.data.user.panitia.nama_panitia,
                email : res.data.data.user.email,
                organisasi : res.data.data.user.panitia.organisasi,
                no_telepon  : res.data.data.user.panitia.no_telepon,
                instagram : res.data.data.user.panitia.instagram,
                picture : res.data.data.user.panitia.image_URL,
                loading: false,
            })
        });
    }

    
    uploadGambar = (event) => {
        this.getBase64(event.target.files[0], imageUrl => {
            this.setState({ picture: imageUrl })
        })
        this.setState({ profile_picture:event.target.files[0] })
    }

    handleSubmit = (id_user) => {
        // e.preventDefault();
        const params = new FormData()
        params.append('profile_picture',this.state.profile_picture)
        params.set('nama_panitia',this.state.nama_panitia)
        params.set('email',this.state.email)
        params.set('organisasi',this.state.organisasi)
        params.set('instagram',this.state.instagram)
        params.set('no_telepon',this.state.no_telepon)

        API.post(`/editprofile/${id_user}`, params)
            .then(res => {
                console.log('res',res)
                // if(res.status == 201){
                //     this.props.navigate(CONSTANS.LIST_BIODATA_PENANDATANGAN_PANITIA_MENU_KEY)
                // }else{
                //     this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                // }
                // this.setState({loading: false})
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
                handleChangeFoto = {this.handleChangeFoto}
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