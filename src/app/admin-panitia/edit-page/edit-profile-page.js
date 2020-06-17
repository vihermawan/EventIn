import React, { Component } from 'react';
import { message,notification } from 'antd';
import CONSTANS from '../../../common/utils/Constants'
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import EditProfileComponent from '../../../modules/admin-panitia/profile/edit-profile-component';


class EditProfilePage extends Component {
    state = {
        user : [],
        id_panitia : '',
        nama_panitia : '',
        email : '',
        organsiasi : '',
        media_sosial : '',
        telepon : '',
        picture : '',
        foto_panitia : '',
        loading: false,
        visible:false,
        button_edit : 'Edit Foto Profil',
        file_type : '',
        crop: {
            unit: '%',
            width: 30,
            aspect: 1 / 1,
          },
        croppedImageUrl : '',
        show : false,
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
        API.get(`/panitia/profile-edit`)
        .then(res => {
            this.setState({
                id_panitia : res.data.data.user.panitia.id_panitia,
                nama_panitia : res.data.data.user.panitia.nama_panitia,
                email : res.data.data.user.email,
                organisasi : res.data.data.user.panitia.organisasi,
                telepon  : res.data.data.user.panitia.telepon,
                instagram : res.data.data.user.panitia.instagram,
                foto_panitia : res.data.data.user.panitia.foto_panitia,
                croppedImageUrl : res.data.data.user.panitia.image_URL,
                loading: false,
            })
        });
    }

    getBase64 = (img, callback)  =>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
  
    uploadGambar = (event) => {
        if(event.target.files[0].type !== 'image/jpeg' ){
            this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
        }
        else if(event.target.files[0].size / 1024 / 1024 > 2){
            this.openNotification('Ukuran file Melebihi 2Mb', 'Silahkan Upload Kembali')
        }
        else{
            this.getBase64(event.target.files[0], imageUrl => {
                this.setState({ picture: imageUrl,croppedImageUrl :imageUrl,foto_panitia:imageUrl,visible:true })
            })
            this.setState({file_type:event.target.files[0].type})
        }
        
    }
      
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImgLink(
            this.imageRef,
            crop,
            'newFile.jpeg'
          );
          const foto_panitia = await this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile.jpeg'
          );
          this.setState({ foto_panitia,croppedImageUrl });
        }
    }
    
    getCroppedImgLink(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
        if (!blob) {
            console.error('Canvas is empty');
            return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
        }, 'image/jpeg');
    });
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
        })     
    }

    dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({foto_panitia: croppedImage}) 
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    handleOk = e => {
        this.setState({
            visible: false,
        });
    };
    
    handleCancel = e => {
        this.setState({
            visible: false,
            foto_panitia : null,
            croppedImageUrl : null,
        });
    };

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
        params.set('telepon',this.state.telepon)
        if(validation.required(this.state.nama_panitia) !== null){
            const message = validation.required(this.state.nama_panitia);
            this.openNotification(message, 'Nama Panitia Harus Diisi')
        }else if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(validation.required(this.state.organisasi) !== null){
            const message = validation.required(this.state.organisasi);
            this.openNotification(message, 'Organisasi Harus Diisi')
        }else if(validation.required(this.state.instagram) !== null){
            const message = validation.required(this.state.instagram);
            this.openNotification(message, 'Instagram Harus Diisi')
        }else if(validation.numberRequired(this.state.telepon) !== null){
            const message = validation.numberRequired(this.state.telepon);
            this.openNotification(message, 'Nomor Telepon Event Harus Diisi')
        }
        else if(this.state.button_edit !== 'Edit Foto Profil'){
            if(this.state.file_type !== 'image/jpeg'){
                this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
            }else{
                localStorage.setItem('telepon', this.state.telepon)
                localStorage.setItem('instagram',this.state.instagram)
                this.setState({show: true})
                API.postEdit(`/panitia/editprofile/${id_panitia}`, params)
                .then(res => {
                    console.log(res)
                    if(res.status === 200){
                        this.props.navigate(CONSTANS.PROFILE_ADMIN_PANITIA_MENU_KEY)
                        window.location.reload();
                        message.success('Data Berhasil di Ubah');
                    }else{
                        this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                        this.setState({show: false})
                    }
                    
                });
            }
        }else{
            localStorage.setItem('telepon', this.state.telepon)
            localStorage.setItem('instagram',this.state.instagram)
            this.setState({show: true})
            API.postEdit(`/panitia/editprofile/${id_panitia}`, params)
            .then(res => {
                if(res.status === 200){
                    this.props.navigate(CONSTANS.PROFILE_ADMIN_PANITIA_MENU_KEY)
                    window.location.reload();
                    message.success('Data Berhasil di Ubah');
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                    this.setState({show: false})
                }
                
            });
        }
        
    }

    render() { 

        return ( 
            <EditProfileComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                uploadGambar = {this.uploadGambar}
                handleSubmit = {this.handleSubmit}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar = {this.handleButtonGambar}
                onImageLoaded={this.onImageLoaded}
                onCropComplete={this.onCropComplete}
                onCropChange={this.onCropChange}
                showModal={this.showModal}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
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