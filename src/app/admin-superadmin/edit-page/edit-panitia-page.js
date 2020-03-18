import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfilePanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/edit-panitia-component';


class EditProfilePanitiaAdminPage extends Component {
    state = {
        nama_panitia : '',
        email : '',
        organisasi : '',
        instagram: '',
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

    uploadGambar = (event) => {
        this.getBase64(event.target.files[0], imageUrl => {
            this.setState({ picture: imageUrl })
        })
        this.setState({ profile_picture:event.target.files[0] })
    }

    
    //get data profile dari API
    getProfile=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/detail-panitia/admin/${id_users}`)
        .then(res => {
            console.log('res',res.data.data)
            this.setState({
                nama_panitia :res.data.data.panitia.panitia.nama_panitia,
                email : res.data.data.panitia.email,
                instagram : res.data.data.panitia.panitia.instagram,
                organisasi : res.data.data.panitia.panitia.organisasi,
                no_telepon : res.data.data.panitia.panitia.no_telepon,
                picture : res.data.data.panitia.panitia.image_URL,
                loading: false,
            })
        });
    }

    render() { 


        return ( 
            <EditProfilePanitiaAdminComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                beforeUpload = {this.beforeUpload}
                handleChangeFoto = {this.handleChangeFoto}
                uploadGambar = {this.uploadGambar}
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