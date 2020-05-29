import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { notification,message } from 'antd';
import CONSTANS from '../../../common/utils/Constants'
import * as validation from '../../../common/utils/validation'
import { navigate } from '../../../common/store/action'

import CertificateComponent from '../../../modules/admin-panitia/create-event/ceritificate/certificate-component';

class CertificatePage extends Component {
    state = {
      nama_sertifikat : '',
      deskripsi : '',
      sertifikat : '',
      picture_event : '',
      size_sertifikat:'',
      picture : '',
      loading:false,
      visible:false,
      button_edit : 'Edit Foto Profil',
      type_file : '',
      crop: {
        unit: '%',
        width: 30,
        aspect: 16 / 9,
      },
      croppedImageUrl : '',
      show : false,
    }

    componentDidMount(){
       
    }

    componentWillMount(){
      const data = JSON.parse(localStorage.getItem('step-5'));
      if(data !== null){
          this.setState({
              nama_sertifikat: data.nama_sertifikat,
              deskripsi: data.deskripsi,
          })
      }
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
        if(event.target.files[0].type !== 'image/jpeg' ){
            this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
        }
        else if(event.target.files[0].size / 1024 / 1024 > 2){
            this.openNotification('Ukuran file Melebihi 2Mb', 'Silahkan Upload Kembali')
        }
        else{
            this.getBase64(event.target.files[0], imageUrl => {
                this.setState({ picture: imageUrl,croppedImageUrl :imageUrl,picture_event:imageUrl,visible:true })
            })
            this.setState({type_file :event.target.files[0].type })
        }//cek
        
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
          const picture_event = await this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile.jpeg'
          );
          this.setState({ picture_event,croppedImageUrl });
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
        this.setState({picture_event: croppedImage}) 
    }
   
    onPrev = () => {
        this.props.prev();
        localStorage.setItem('step-5', JSON.stringify(this.state));
    }
   

    handleButtonEdit = () => {
        this.setState({
            button_edit : 'Upload Gambar'
        })
    }

    handleButtonGambar = () => {
        this.setState({
            button_edit : 'Edit Foto Profil'
        })
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    successNotification = (message, description) => {
        notification.success({
            message,
            description,
        });
    };

    handleSubmit = () => {
        const params = new FormData()
        const basic_info = JSON.parse(localStorage.getItem('step-1'));
        const biaya = JSON.parse(localStorage.getItem('step-2'));
        const venue = JSON.parse(localStorage.getItem('step-3'));
        const datetime = JSON.parse(localStorage.getItem('step-4'));
        params.set('nama_event',basic_info.nama)
        params.set('deskripsi_event',basic_info.description)
        params.set('organisasi',basic_info.organisasi)
        params.set('email_event',basic_info.email_event)
        params.set('telepon',basic_info.no_telepon)
        params.set('instagram',basic_info.instagram)
        params.set('id_kategori',basic_info.kategori_input)
        params.set('limit_participant',basic_info.batas_peserta)

        params.set('id_status_biaya',biaya.status_biaya)
        params.set('biaya',biaya.biaya)
        params.set('nomor_rekening',biaya.no_rekening)
        params.set('bank',biaya.bank)

        params.set('lokasi',venue.lokasi)
        params.set('venue',venue.venue)
        params.set('id_provinsi',venue.id_provinsi)
        params.set('id_kabupaten', venue.id_kabupaten)

        params.set('start_event',datetime.start_event)
        params.set('end_event',datetime.end_event)
        params.set('open_registration',datetime.open_registration)
        params.set('end_registration',datetime.end_registration)
        params.set('time_start',datetime.time_start)
        params.set('time_end',datetime.time_end)
    
        params.append('picture',this.state.picture_event)

    if(validation.required(this.state.picture_event) !== null ){
        const message = validation.required(this.state.picture_event);
        this.openNotification(message, 'Gambar Event Harus di upload')
    }else if(this.state.type_file !== 'image/jpeg'){
        this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
    }else{
        this.setState({loading: true, show : true})
        API.postEdit(`/panitia/create/event`, params)
        .then(res => {
            if(res.status === 201){
                message.success('Event Berhasil Ditambahkan');
                this.props.navigate(CONSTANS.ACTIVE_EVENT_MENU_KEY)
                this.successNotification('Sukses membuat event', 'Tunggu 1x24 jam di email anda untuk mendapat pemberitahuan apakah event anda ditolak atau diterima')
                localStorage.removeItem('step-1');
                localStorage.removeItem('step-2');
                localStorage.removeItem('step-3');
                localStorage.removeItem('step-4');
            }else{
                this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                this.setState({loading: false, show : false})
            }
        });
     }
     

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
            picture_event : null,
            croppedImageUrl : null,
        });
    };
  
    render() {

        return ( 
            <CertificateComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                uploadFile = {this.uploadFile}
                onPrev={this.onPrev}
                handleSubmit = {this.handleSubmit}
                uploadGambar = {this.uploadGambar}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar={this.handleButtonGambar}
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
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(CertificatePage);
export default page