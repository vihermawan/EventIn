import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import { notification, message } from 'antd';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import CreateBiodataPenandatanganComponent from '../../../modules/admin-panitia/list-penandatangan/create-penandatangan-component';

class CreateBiodataPenandatanganPage extends Component {
    state = { 
       nama : '',
       email : '',
       jabatan: '',
       instansi : '',
       nip : '',
       profile_picture: null,
       picture: null,
       loading : false,
       visible:false,
       show: false,
       crop: {
        unit: '%',
        width: 30,
        aspect: 1 / 1,
      },
      croppedImageUrl : '',
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

    uploadGambar = (event) => {
        if(event.target.files[0].type != 'image/jpeg' ){
            console.log('harusnya')
            this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
        }
        else if(event.target.files[0].size / 1024 / 1024 > 2){
            this.openNotification('Ukuran file Melebihi 2Mb', 'Silahkan Upload Kembali')
        }
        else{
            console.log('cek', event.currentTarget.value)
            this.getBase64(event.target.files[0], imageUrl => {
                this.setState({ picture: imageUrl,croppedImageUrl :imageUrl,profile_picture:imageUrl,visible:true })
            })
            // this.setState({ profile_picture:event.target.files[0] })
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
          console.log('croping',this.state.croppedImageUrl)
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
        console.log('ini lo', this.state.profile_picture)
    }
  
    showModal = () => {
        this.setState({
          visible: true,
          
        });
    };

    showModal2 = () => {
        this.setState({
            show :true,
        })
    }
    
    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            picture_event : null,
            croppedImageUrl : null,
        });
    };

    successNotification = (message, description) => {
        notification.success({
            message,
            description,
        });
    };

    
    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        params.append('profile_picture',this.state.profile_picture)
        params.set('nama',this.state.nama)
        params.set('email',this.state.email)
        params.set('jabatan',this.state.jabatan)
        params.set('nip',this.state.nip)
        params.set('instansi',this.state.instansi)
        
        console.log('params', params)

        if(validation.required(this.state.nama) != null){
            const message = validation.required(this.state.nama)  
            this.openNotification(message, 'Nama belum dimasukkan')
        }else if(validation.emailRequired(this.state.email) != null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(validation.required(this.state.jabatan) != null){
            const message = validation.required(this.state.jabatan)  
            this.openNotification(message, 'Jabatan belum dimasukkan')
        }else if(validation.required(this.state.nip) != null){
            const message = validation.required(this.state.nip)  
            this.openNotification(message, 'Nomor Induk Pegawai belum dimasukkan')
        }else if(validation.required(this.state.instansi) != null){
            const message = validation.required(this.state.instansi)  
            this.openNotification(message, 'Instansi belum dimasukkan')
        }else{
            this.setState({loading: true})
            this.showModal2();
            API.post(`/panitia/create/biodata-penandatangan`, params)
            .then(res => {
                console.log('res',res)
                if(res.status == 201){
                    this.props.navigate(CONSTANS.LIST_BIODATA_PENANDATANGAN_PANITIA_MENU_KEY)
                    message.success('Biodata Penandatangan Berhasil Ditambahkan');
                    this.successNotification('Sukses menambah data penandatangan', 'Tunggu 1 x 24 jam di email anda untuk mendapat pemberitahuan apakah penandatangan ditolak atau diterima')
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
            });
        }
    }

    render() { 
        return ( 
            <CreateBiodataPenandatanganComponent
                navigate={this.props.navigate}
                initialData={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel = {this.handleCancel}
                handleOk ={this.handleOk}
                uploadGambar={this.uploadGambar}
                onImageLoaded={this.onImageLoaded}
                onCropComplete={this.onCropComplete}
                onCropChange={this.onCropChange}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(CreateBiodataPenandatanganPage);
export default page