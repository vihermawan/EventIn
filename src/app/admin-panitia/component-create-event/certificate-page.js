import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { message } from 'antd';
import { navigate } from '../../../common/store/action'
import CertificateComponent from '../../../modules/admin-panitia/create-event/ceritificate/certificate-component';

class CertificatePage extends Component {
    state = {
      nama_sertifikat : '',
      deskripsi : '',
      sertifikat : '',
    }

    componentDidMount(){
       
    }

    componentWillMount(){
      const data = JSON.parse(localStorage.getItem('step-6'));
      console.log(data)
      if(data !== null){
          this.setState({
              nama_sertifikat: data.nama_sertifikat,
              deskripsi: data.deskripsi,
              sertifikat: data.sertifikat,
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

    onNext = () => {
      this.props.next();
      localStorage.setItem('step-6', JSON.stringify(this.state));
    }

    onPrev = () => {
      this.props.prev();
      localStorage.setItem('step-6', JSON.stringify(this.state));
    }

    getBase64 = (pdf, callback)  =>{
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(pdf);
    }

    uploadFile = (event) => {
        this.setState({ 
            sertifikat:event.target.files[0] 
        })
        console.log('sertif',this.state.sertifikat)
    }    

    handleSubmit = () => {
      // e.preventDefault();
      const params = new FormData()
      const basic_info = JSON.parse(localStorage.getItem('step-1'));
      const biaya = JSON.parse(localStorage.getItem('step-2'));
      const venue = JSON.parse(localStorage.getItem('step-3'));
      const datetime = JSON.parse(localStorage.getItem('step-4'));
      const visual = JSON.parse(localStorage.getItem('step-5'));

      params.set('nama_event',basic_info.nama)
      params.set('description',basic_info.description)
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
      params.set('close_registration',datetime.end_registration)
      params.set('time_start',datetime.time_start)
      params.set('time_end',datetime.time_end)
    
      params.append('picture',visual.picture_event)
      
      params.set('nama_sertifikat',this.state.nama_sertifikat)
      params.set('description',this.state.deskripsi)
      params.append('sertifikat',this.state.sertifikat)
     
      console.log('params', params)
      API.post(`/panitia/create/event`, params)
      .then(res => {
          console.log('res',res)
          // if(res.status == 200){
          //     message.success('Data Berhasil di Ubah');
          //     this.componentDidMount();
          // }else{
          //     this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
          // }
         
      });

    }
  
    render() {

        return ( 
            <CertificateComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                uploadFile = {this.uploadFile}
                onNext={this.onNext}
                onPrev={this.onPrev}
                handleSubmit = {this.handleSubmit}
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