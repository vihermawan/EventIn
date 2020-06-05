import React, { Component } from 'react';
import { message,notification } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import EditProfileSignerComponent from '../../../modules/admin-signer/profile/edit-profile-component';


class EditProfilePage extends Component {
    state = {
        id_penandatangan : '',
        nama_penandatangan : '',
        instansi : '',
        email : '',
        jabatan : '',
        nip : '',
        picture : '',
        profile_picture :'',
        loading: false,
        button_edit : 'Edit Foto Profil',
        crop: {
            unit: '%',
            width: 30,
            aspect: 1 / 1,
          },
        croppedImageUrl : '',
        file_type : '',
        loading : false,
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
        API.get(`/penandatangan/profile-edit`)
        .then(res => {
            this.setState({
                id_penandatangan : res.data.data.penandatangan.penandatangan.id_penandatangan,
                nama_penandatangan :res.data.data.penandatangan.penandatangan.nama_penandatangan ,
                email : res.data.data.penandatangan.email,
                instansi :res.data.data.penandatangan.penandatangan.instansi ,
                nip :res.data.data.penandatangan.penandatangan.nip,
                file_p12 : res.data.data.penandatangan.penandatangan.file_p12,
                croppedImageUrl : res.data.data.penandatangan.penandatangan.image_URL,
                jabatan : res.data.data.penandatangan.penandatangan.jabatan,
                profile_picture :res.data.data.penandatangan.penandatangan.profile_picture,
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
                this.setState({ picture: imageUrl,croppedImageUrl :imageUrl,profile_picture:imageUrl,visible:true })
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
          const profile_picture = await this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile.jpeg'
          );
          this.setState({ profile_picture,croppedImageUrl });
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
        this.setState({profile_picture: croppedImage}) 
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
            profile_picture : null,
            croppedImageUrl : null,
        });
    };

    handleButtonEdit = () => {
        this.setState({
            button_edit : 'Upload Gambar',
            button_p12 : 'Upload File'
        })
    }

    handleButtonGambar = () => {
        this.setState({
            button_edit : 'Edit Foto Profil',
            button_p12 : 'Edit File P_12',
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
        const id_penandatangan = this.state.id_penandatangan
        const params = new FormData()
        params.append('profile_picture',this.state.profile_picture)
        params.append("_method", 'PUT')
        params.set('nama_penandatangan',this.state.nama_penandatangan)
        params.set('email',this.state.email)
        params.set('jabatan',this.state.jabatan)
        params.set('nip',this.state.nip)
        params.set('instansi',this.state.instansi)
        if(validation.required(this.state.nama_penandatangan) !== null){
            const message = validation.required(this.state.nama_penandatangan);
            this.openNotification(message, 'Nama Penanda tangan Harus Diisi')
        }else if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(validation.required(this.state.instansi) !== null){
            const message = validation.required(this.state.instansi);
            this.openNotification(message, 'Instansi Harus Diisi')
        }else if(validation.required(this.state.jabatan) !== null){
            const message = validation.required(this.state.jabatan);
            this.openNotification(message, 'Jabatan Harus Diisi')
        }else if(validation.numberRequired(this.state.nip) !== null){
            const message = validation.numberRequired(this.state.nip);
            this.openNotification(message, 'Nomor Induk Pegawai Harus Diisi')
        }else if(this.state.button_edit !== 'Edit Foto Profil'){
            if(this.state.file_type !== 'image/jpeg'){
                this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
            }else{
                this.setState({show: true})
                API.postEdit(`/penandatangan/profile/edit/${id_penandatangan}`, params)
                .then(res => {
                    if(res.status === 200){
                        this.props.navigate(CONSTANS.PROFILE_SIGNER_MENU_KEY)
                        window.location.reload();
                        message.success('Data Berhasil di Ubah');
                    }else{
                        this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                        this.setState({show: false})
                    }
                   
                });
            }
        }else{
        this.setState({show: true})
        API.postEdit(`/penandatangan/profile/edit/${id_penandatangan}`, params)
            .then(res => {
                if(res.status === 200){
                    this.props.navigate(CONSTANS.PROFILE_SIGNER_MENU_KEY)
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
            <EditProfileSignerComponent
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
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
export default page