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
       id_provinsi: '',
       id_kabupaten : '',
       provinsi : [],
       kabupaten : [],
       profile_picture: null,
       picture: null,
       loading : false,
       visible:false,
       show: false,
       telepon : '',
       file_type : '',
       crop: {
        unit: '%',
        width: 30,
        aspect: 1 / 1,
      },
      croppedImageUrl : '',
    }

    componentDidMount(){
        this.getProvinsi();
    }

    getProvinsi = () => {
        this.setState({loading: true})
        API.get(`/provinsi`)
        .then(res => {
            this.setState({
                provinsi:res.data.data.provinsi,
                loading: false,
            })
        });
    }

    getKabupaten = (id_provinsi) => {
        this.setState({loading: true})
        API.get(`/kabupaten/${id_provinsi}`)
        .then(res => {
            this.setState({
                kabupaten:res.data.data.kabupaten,
                loading: false,
            })
        });
    }

    handleProvinsi = (input, option) => {
        this.setState({ id_provinsi: input })  
        this.getKabupaten(input)
    }

    handleKabupaten = (input, option) => {
        this.setState({ id_kabupaten: input })  
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
                this.setState({ picture: imageUrl,croppedImageUrl :imageUrl,profile_picture:imageUrl,visible:true})
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
        params.set('telepon',this.state.telepon)
        params.set('id_provinsi',this.state.id_provinsi)
        params.set('id_kabupaten', this.state.id_kabupaten)

        if(validation.required(this.state.nama) !== null){
            const message = validation.required(this.state.nama)  
            this.openNotification(message, 'Nama Penandatangan belum dimasukkan')
        }else if(validation.emailRequired(this.state.email) !== null){
            const message = validation.emailRequired(this.state.email);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }else if(validation.numberRequired(this.state.nip) !== null){
            const message = validation.numberRequired(this.state.nip)  
            this.openNotification(message, 'Nomor Induk Pegawai belum dimasukkan')
        }else if(validation.required(this.state.jabatan) !== null){
            const message = validation.required(this.state.jabatan)  
            this.openNotification(message, 'Jabatan belum dimasukkan')
        }else if(validation.required(this.state.instansi) !== null){
            const message = validation.required(this.state.instansi)  
            this.openNotification(message, 'Instansi belum dimasukkan')
        }else if(validation.numberRequired(this.state.telepon) !== null){
            const message = validation.numberRequired(this.state.telepon)  
            this.openNotification(message, 'Nomor Telepon belum dimasukkan')
        }else if(validation.required(this.state.id_provinsi) !== null){
            const message = validation.required(this.state.id_provinsi)  
            this.openNotification(message, 'Provinsi belum dimasukkan')
        }else if(validation.required(this.state.id_kabupaten) !== null){
            const message = validation.required(this.state.id_kabupaten)  
            this.openNotification(message, 'Kabupaten belum dimasukkan')
        }else if(this.state.file_type !== 'image/jpeg'){
            this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
        }
        else{
            this.setState({show: true})
            API.post(`/panitia/create/biodata-penandatangan`, params)
            .then(res => {
                if(res.status === 201){
                    this.props.navigate(CONSTANS.LIST_BIODATA_PENANDATANGAN_PANITIA_MENU_KEY)
                    message.success('Biodata Penandatangan Berhasil Diajukan');
                    this.successNotification('Sukses mengajukan data penandatangan', 'Tunggu 1 x 24 jam di email anda untuk mendapat pemberitahuan apakah penandatangan ditolak atau diterima')
                }else{
                    this.setState({show :false})
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false,show :false})
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
                handleProvinsi = {this.handleProvinsi}
                handleKabupaten = {this.handleKabupaten}
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