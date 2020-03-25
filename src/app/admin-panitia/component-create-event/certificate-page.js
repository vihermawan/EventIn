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
      button_edit : 'Edit Foto Profil',
    }

    componentDidMount(){
       
    }

    componentWillMount(){
      const data = JSON.parse(localStorage.getItem('step-5'));
      console.log(data)
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

    // onNext = () => {
    //   this.props.next();
    //   localStorage.setItem('step-6', JSON.stringify(this.state));
    // }

    onPrev = () => {
      this.props.prev();
      localStorage.setItem('step-5', JSON.stringify(this.state));
    }

    uploadFile = (event) => {
        if(event.target.files[0].type != 'application/msword'){
            console.log('harusnya')
            this.openNotification('Format Sertifikat Salah', 'Silahkan Upload Kembali dengan format RTF')
        }
        else if(event.target.files[0].size / 1024 / 1024 > 2){
            console.log('ukuran', this.state.size_sertifikat)
            this.openNotification('Ukuran file Melebihi 2Mb', 'Silahkan Upload Kembali')
        }else{ 
            this.setState({ 
                sertifikat:event.target.files[0],
                size_sertifikat : event.target.files[0].size / 1024 / 1024,
            })
        }
       
        console.log('sertif',event.target.files[0])
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
        }else{
            this.getBase64(event.target.files[0], imageUrl => {
                this.setState({ picture: imageUrl })
            })
            this.setState({ picture_event:event.target.files[0] })
        }
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

    handleSubmit = () => {
        const params = new FormData()
        const basic_info = JSON.parse(localStorage.getItem('step-1'));
        const biaya = JSON.parse(localStorage.getItem('step-2'));
        const venue = JSON.parse(localStorage.getItem('step-3'));
        const datetime = JSON.parse(localStorage.getItem('step-4'));
        // const visual = JSON.parse(localStorage.getItem('step-5'));

        params.set('nama_event',basic_info.nama)
        params.set('deskripsi_event',basic_info.description)
        params.set('organisasi',basic_info.organisasi)
        params.set('email_event',basic_info.email_event)
        params.set('no_telepon',basic_info.no_telepon)
        params.set('instagram',basic_info.instagram)
        params.set('id_kategori',basic_info.kategori_input)
        params.set('limit_participant',basic_info.batas_peserta)

        params.set('id_status_biaya',biaya.status_biaya)
        params.set('biaya',biaya.biaya)
        params.set('nomor_rekening',biaya.no_rekening)
        params.set('bank',biaya.bank)

        params.set('lokasi',venue.lokasi)
        params.set('venue',venue.venue)

        params.set('start_event',datetime.start_event)
        params.set('end_event',datetime.end_event)
        params.set('open_registration',datetime.open_registration)
        params.set('end_registration',datetime.end_registration)
        params.set('time_start',datetime.time_start)
        params.set('time_end',datetime.time_end)
        
        
        params.set('nama_sertifikat',this.state.nama_sertifikat)
        params.set('description',this.state.deskripsi)
        params.append('sertifikat',this.state.sertifikat)
        params.append('picture',this.state.picture_event)
        
        console.log('params', params)

      
    if(validation.required(this.state.nama_sertifikat) != null){
        const message = validation.required(this.state.nama_sertifikat);
        this.openNotification(message, 'Nama Sertifikat Harus Diisi')
    }else if(validation.required(this.state.deskripsi) != null){
        const message = validation.required(this.state.deskripsi);
        this.openNotification(message, 'Deskripsi Sertifikat Harus Diisi')
    }else if(validation.required(this.state.sertifikat) != null ){
        const message = validation.required(this.state.sertifikat);
        this.openNotification(message, 'Sertifikat Harus Diupload')
    }else if(validation.required(this.state.picture_event) != null ){
        const message = validation.required(this.state.picture_event);
        this.openNotification(message, 'Gambar Event Harus di upload')
    }else{
        this.setState({loading: true})
        API.postEdit(`/panitia/create/event`, params)
        .then(res => {
            console.log('res',res)
            if(res.status == 201){
                message.success('Event Berhasil Ditambahkan');
                this.props.navigate(CONSTANS.ACTIVE_EVENT_MENU_KEY)
            }else{
                this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
            }
           
        });
     }
     

    }
  
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
                beforeUpload={this.beforeUpload}
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