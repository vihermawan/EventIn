import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditProfileSignerComponent from '../../../modules/admin-superadmin/user/penandatangan/edit-penandatangan-component';


class EditProfileAdminSignerPage extends Component {
    state = {
        nama_penandatangan : '',
        email : '',
        instansi : '',
        nip : '',
        jabatan : '',
        p_12 : '',
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
        API.get(`/admin/showeditpenandatangan/${id_users}`)
        .then(res => {
          console.log('res',res.data.data.penandatangan.penandatangan.nama_penandatangan)
          this.setState({
            nama_penandatangan :res.data.data.penandatangan.penandatangan.nama_penandatangan ,
            email : res.data.data.penandatangan.email,
            instansi :res.data.data.penandatangan.penandatangan.instansi ,
            nip :res.data.data.penandatangan.penandatangan.nip,
            p_12 : res.data.data.penandatangan.penandatangan.p_12,
            picture : res.data.data.penandatangan.penandatangan.image_URL,
            jabatan : res.data.data.penandatangan.penandatangan.jabatan,
            loading: false,
          })
        });
    }

    render() { 
        return ( 
            <EditProfileSignerComponent
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
    ...state.penandatangan,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfileAdminSignerPage);
export default page