import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, notification } from 'antd';
import CONSTANS from '../../../src/common/utils/Constants'
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
        telepon : '',
        pekerjaan : '',
        picture : '',
        foto_peserta : '',
        organisasi:'',
        umur : '',
        button_edit : 'Edit Foto Profil',
        crop: {
            unit: '%',
            width: 30,
            aspect: 1 / 1,
          },
        loading : false,
        croppedImageUrl : '',
    }

    componentDidMount(){
        this.getProfile();
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })

    //get data profile dari API
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/peserta/edit-profile`)
        .then(res => {
            this.setState({
                id_peserta : res.data.data.user.peserta.id_peserta,
                nama_peserta : res.data.data.user.peserta.nama_peserta,
                email : res.data.data.user.email,
                pekerjaan : res.data.data.user.peserta.pekerjaan,
                tanggal_lahir:res.data.data.user.peserta.tanggal_lahir,
                umur:res.data.data.user.peserta.umur,
                organisasi :res.data.data.user.peserta.organisasi,
                telepon : res.data.data.user.peserta.telepon,
                jenis_kelamin : res.data.data.user.peserta.jenis_kelamin,
                organisasi : res.data.data.user.peserta.organisasi,
                croppedImageUrl:res.data.data.user.peserta.image_URL,
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
                this.setState({ picture: imageUrl,croppedImageUrl :imageUrl,foto_peserta:imageUrl,visible:true })
            })
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
          const foto_peserta = await this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile.jpeg'
          );
          this.setState({ foto_peserta,croppedImageUrl });
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
        this.setState({foto_peserta: croppedImage}) 
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
            foto_peserta : null,
            croppedImageUrl : null,
        });
    };

    handleJenisKelamin = (value) => {
        this.setState({ jenis_kelamin: value })
    }

    onChangeBirthDate = (date, dateString) => {
        this.setState({ 
            tanggal_lahir: dateString,
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
        const id_peserta = this.state.id_peserta
        const params = new FormData()
        params.append('foto_peserta',this.state.foto_peserta)
        params.append("_method", 'PUT')
        params.set('nama_peserta',this.state.nama_peserta)
        params.set('email',this.state.email)
        params.set('umur',this.state.umur)
        params.set('pekerjaan',this.state.pekerjaan)
        params.set('tanggal_lahir',this.state.tanggal_lahir)
        params.set('jenis_kelamin',this.state.jenis_kelamin)
        params.set('organisasi',this.state.organisasi)
        params.set('instagram',this.state.instagram)
        params.set('tanggal_lahir',this.state.tanggal_lahir)
        params.set('telepon',this.state.telepon)
        this.setState({loading: true})
        API.postEdit(`/peserta/profile/edit/${id_peserta}`, params)
            .then(res => {
                if(res.status === 200){
                    message.success('Data Berhasil di Ubah');
                    this.props.navigate(CONSTANS.PROFILE_MENU_KEY)
                    window.location.reload();
                    //this.componentDidMount();
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
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
                onChangeBirthDate={this.onChangeBirthDate}
                onImageLoaded={this.onImageLoaded}
                onCropComplete={this.onCropComplete}
                onCropChange={this.onCropChange}
                showModal={this.showModal}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
                onStartLoadingHome={this.onStartLoadingHome}
                onFinishLoadingHome={this.onFinishLoadingHome}
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