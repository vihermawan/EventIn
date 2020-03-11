import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfileComponent from '../../../modules/admin-panitia/profile/edit-profile-component';


class EditProfilePage extends Component {
    state = {
        user : [],
        nama_panitia : '',
        email : '',
        organsiasi : '',
        media_sosial : '',
        no_telepon : '',
        picture : '',
        loading: false,
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
            console.log('res',res.data.data.user)
            this.setState({
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

    render() { 

        return ( 
            <EditProfileComponent
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
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
export default page