import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import {message, notification } from 'antd';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import EditEventComponent from '../../../modules/admin-panitia/edit-event/edit-event-component';
import moment from 'moment';

class EditEventPage extends Component {
    state = {
        id_event : '',
        nama: '',
        description: '',
        organisasi: '',
        batas_peserta: '',
        kategori_input : '',
        no_telepon : '',
        email_event : '',
        instagram : '',
        status_biaya: '',
        biaya: '0',
        bank: '-',
        no_rekening: '-',
        id_kabupaten : '',
        id_provinsi : '',
        start_event :moment().format('YYYY-MM-DD'),
        end_event : moment().format('YYYY-MM-DD'),
        time_start : '',
        time_end : '',
        open_registration: moment().format('YYYY-MM-DD'),
        end_registration:moment().format('YYYY-MM-DD'),
        venue:'',
        lokasi : '',
        picture_event : '',
        provinsi :[],
        kabupaten: [],
        picture : '',
        visible:false,
        type_file : '',
        button_edit : 'Edit Foto Profil',
        crop: {
          unit: '%',
          width: 30,
          aspect: 16 / 9,
        },
        croppedImageUrl : '',
        loading: false,
    }

    componentDidMount(){
        this.getDetailEvent(this.props.idEvent);
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

    getKabupatenData = (id_kabupaten) => {
        this.setState({loading: true})
        API.get(`/kabupaten-data/${id_kabupaten}`)
        .then(res => {
            this.setState({
                kabupaten:res.data.data.kabupaten,
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

    getDetailEvent=(id)=>{
        this.setState({loading: true})
        API.get(`/panitia/event/${id}`)
        .then(res => {
                this.setState({
                    id_event : res.data.data.event.id_event,
                    nama : res.data.data.event.nama_event,
                    description : res.data.data.event.detail_event.deskripsi_event,
                    organisasi: res.data.data.event.organisasi,
                    batas_peserta: res.data.data.event.detail_event.limit_participant,
                    kategori_input : res.data.data.event.id_kategori,
                    id_kabupaten : res.data.data.event.detail_event.id_kabupaten,
                    id_provinsi : res.data.data.event.detail_event.id_provinsi,
                    no_telepon : res.data.data.event.detail_event.telepon,
                    email_event : res.data.data.event.detail_event.email_event,
                    instagram : res.data.data.event.detail_event.instagram,
                    status_biaya : res.data.data.event.status_biaya.id_status,
                    start_event : res.data.data.event.detail_event.start_event,
                    end_event : res.data.data.event.detail_event.end_event,
                    time_start : res.data.data.event.detail_event.time_start,
                    time_end : res.data.data.event.detail_event.time_end,
                    open_registration : res.data.data.event.detail_event.open_registration,
                    end_registration : res.data.data.event.detail_event.end_registration,
                    venue : res.data.data.event.detail_event.venue,
                    lokasi : res.data.data.event.detail_event.lokasi,
                    picture_event : res.data.data.event.detail_event.picture,
                    croppedImageUrl: res.data.data.event.detail_event.image_URL,
                    loading: false,
                })
                this.getKabupatenData(res.data.data.event.detail_event.id_kabupaten)
        });
    }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    handleKategori = (value) => {
        this.setState({ kategori_input: value })
    }

    handleStatus = (value) => {
        this.setState({ status_biaya: value })
    }

    handleBank = (value) => {
        this.setState({ bank: value })
    }

    handleTempat = (value) => {
        this.setState({ venue: value })
    }

    disabledDate(current) {
        return current && current < moment().startOf('day');
    }
    
    onChangeTimeStart= (time, timeString) =>{
        this.setState({ 
            time_start: timeString,
        })
    }

    onChangeTimeEnd= (time, timeString) =>{
        this.setState({ 
            time_end: timeString,
        })
    }

    onChangeDateStart = (date, dateString) => {
        this.setState({ 
            start_event: dateString,
        })
    }

    onChangeDateEnd = (date, dateString) => {
        this.setState({ 
            end_event: dateString,
        })
    }

    onChangeDateRegisStart = (date, dateString) => {
        this.setState({ 
            open_registration: dateString,
        })
    }

    onChangeDateRegistEnd = (date, dateString) => {
        this.setState({ 
            end_registration: dateString,
        })
    }

    handleProvinsi = (input, option) => {
        this.setState({ id_provinsi: input })  
        this.getKabupaten(input)
    }

    handleKabupaten = (input, option) => {
        this.setState({ id_kabupaten: input })  
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
                this.setState({ picture: imageUrl,croppedImageUrl :imageUrl,picture_event:imageUrl,visible:true,type_file :event.target.files[0].type })
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

    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        const id_panitia = this.props.idEvent
        params.set('nama_event',this.state.nama)
        params.set('deskripsi_event',this.state.description)
        params.set('organisasi',this.state.organisasi)
        params.set('email_event',this.state.email_event)
        params.set('no_telepon',this.state.no_telepon)
        params.set('instagram',this.state.instagram)
        params.set('id_kategori',this.state.kategori_input)
        params.set('limit_participant',this.state.batas_peserta)

        params.set('id_status_biaya',this.state.status_biaya)
        params.set('biaya',this.state.biaya)
        params.set('nomor_rekening',this.state.no_rekening)
        params.set('bank',this.state.bank)

        params.set('lokasi',this.state.lokasi)
        params.set('venue',this.state.venue)
        params.set('id_provinsi',this.state.id_provinsi)
        params.set('id_kabupaten',this.state.id_kabupaten)

        params.set('start_event',this.state.start_event)
        params.set('end_event',this.state.end_event)
        params.set('open_registration',this.state.open_registration)
        params.set('end_registration',this.state.end_registration)
        params.set('time_start',this.state.time_start)
        params.set('time_end',this.state.time_end)
        
        params.append('picture',this.state.picture_event)
        params.append("_method", 'PUT')

        if(this.state === null){
            this.openNotification('Data Wajib di Isi', 'Silahkan isi data dengan benar')
        }else if(validation.emailRequired(this.state.email_event) !== null){
            const message = validation.emailRequired(this.state.email_event);
            this.openNotification(message, 'Harap memasukkan email dengan benar')
        }
        else if(this.state.button_edit !== 'Edit Foto Profil'){
            if(this.state.file_type !== 'image/jpeg'){
                this.openNotification('Format Gambar Salah', 'Silahkan Upload Kembali dengan format JPG')
            }else{
                this.setState({loading: true})
                API.postEdit(`/panitia/editevent/${id_panitia}`, params)
                .then(res => {
                    console.log(res)
                    if(res.status === 200){
                        message.success('Data Berhasil di Ubah');
                        this.props.navigate(CONSTANS. ACTIVE_EVENT_MENU_KEY)                
                    }else{
                        this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                    }
                    this.setState({loading: false})
                });
            }
        }else{
            this.setState({loading: true})
            API.postEdit(`/panitia/editevent/${id_panitia}`, params)
            .then(res => {
                console.log(res)
                if(res.status === 200){
                    message.success('Data Berhasil di Ubah');
                    this.props.navigate(CONSTANS. ACTIVE_EVENT_MENU_KEY)                
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
            });
        }
    }
    
    render() { 
        return ( 
            <EditEventComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                handleKategori={this.handleKategori}
                handleStatus={this.handleStatus}
                handleBank={this.handleBank}
                handleTempat = {this.handleTempat}
                onChangeTimeStart ={this.onChangeTimeStart}
                onChangeTimeEnd = {this.onChangeTimeEnd}
                onChangeDateStart = {this.onChangeDateStart}
                onChangeDateEnd = {this.onChangeDateEnd}
                onChangeDateRegisStart = {this.onChangeDateRegisStart}
                onChangeDateRegistEnd = {this.onChangeDateRegistEnd}
                disabledDate = {this.disabledDate}
                uploadGambar = {this.uploadGambar}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar={this.handleButtonGambar}
                onImageLoaded={this.onImageLoaded}
                onCropComplete={this.onCropComplete}
                onCropChange={this.onCropChange}
                showModal={this.showModal}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
                handleSubmit = {this.handleSubmit}
                handleKabupaten ={this.handleKabupaten}
                handleProvinsi = {this.handleProvinsi}
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

const page = connect(mapStateToProps, mapDispatchToProps)(EditEventPage);
export default page