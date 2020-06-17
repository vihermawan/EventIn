import React, { Component } from 'react';
import { message,notification } from 'antd';
import CONSTANS from '../../../common/utils/Constants'
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import EditCertificateComponent from '../../../modules/admin-panitia/e-certificate/edit-certificate-component';

class EditCertificatePage extends Component {
    state = {
        nama_sertifikat: '',
        no_sertifikat :'',
        size_sertifikat :'',
        sertifikat :'',
        nama_display: '',
        id_event: '',
        id_sertifikat : '',
        id_penandatangan :'',
        loading: false,
        show : false,
        type_file : '',
        activeEvent : [],
        penandatangan : [],
        button_edit : 'Edit Foto Profil',
    }

    componentDidMount(){
        this.getCertificate(this.props.idSertifikat);
        this.getPenandatangan();
        this.getEvent();
    }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

     //get data dari APIsertifikat
    getEvent=()=>{
        this.setState({loading: true})
        API.get(`/panitia/event`)
        .then(res => {
            this.setState({
                activeEvent:res.data.data.event,
                loading: false,
            })
        });
    }

    getPenandatangan=()=>{
        this.setState({loading: true})
        API.get(`/panitia/list-penandatangan`)
        .then(res => {
          this.setState({
            penandatangan:res.data.data.penandatangan,
            loading: false,
          })
        });
    }

    handlePenandatangan = (input, option) => {
        this.setState({ id_penandatangan: input })  
    }

    handleEvent = (input, option) => {
        this.setState({ id_event: input })  
    }

    //get data profile dari API
    getCertificate=(id_sertifikat)=>{
        this.setState({loading: true})
        API.get(`/panitia/event-sertifikat/${id_sertifikat}`)
        .then(res => {
            this.setState({
                nama : res.data.data.sertifikat.sertifikat.nama,
                no_sertifikat : res.data.data.sertifikat.sertifikat.no_sertifikat,
                sertifikat : res.data.data.sertifikat.sertifikat.sertifikat,
                nama_display : res.data.data.sertifikat.sertifikat.sertifikat,
                id_event : res.data.data.sertifikat.sertifikat.id_event,
                id_penandatangan : res.data.data.sertifikat.id_penandatangan,
                id_sertifikat : res.data.data.sertifikat.id_sertifikat,
                loading: false,
            })
        });
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
   
    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };
   
    uploadFile = (event) => {
        // if(event.target.files[0].type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        if(event.target.files[0].name.split('.').pop() !== 'docx'){
            this.openNotification('Format Sertifikat Salah', 'Silahkan Upload Kembali dengan format Docx')
        }
        else if(event.target.files[0].size / 1024 / 1024 > 2){
            this.openNotification('Ukuran file Melebihi 2Mb', 'Silahkan Upload Kembali')
        }else{ 
            this.setState({ 
                sertifikat:event.target.files[0],
                nama_display : event.target.files[0].name,
                size_sertifikat : event.target.files[0].size / 1024 / 1024,
                type_file : event.target.files[0].name.split('.').pop()
                // type_file :event.target.files[0].type,
            })
        }
    } 

    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        params.append('sertifikat',this.state.sertifikat)
        params.append("_method", 'PUT')
        params.set('nama',this.state.nama)
        params.set('no_sertifikat',this.state.no_sertifikat)
        params.set('id_penandatangan',this.state.id_penandatangan)
        params.set('id_event',this.state.id_event)

        if(validation.required(this.state.nama) !== null ){
            const message = validation.required(this.state.nama);
            this.openNotification(message, 'Nama Sertifikat Harus diIsi')
        }else if(validation.required(this.state.no_sertifikat) !== null ){
            const message = validation.required(this.state.no_sertifikat);
            this.openNotification(message, 'Nomor Sertifikat Harus diisi')
        }else if(validation.required(this.state.id_event) !== null ){
            const message = validation.required(this.state.id_event);
            this.openNotification(message, 'Event Harus diisi')
        }else if(validation.required(this.state.id_penandatangan) !== null ){
            const message = validation.required(this.state.id_penandatangan);
            this.openNotification(message, 'Penandatangan harus dipilih')
        }else if(validation.required(this.state.sertifikat) !== null ){
            const message = validation.required(this.state.sertifikat);
            this.openNotification(message, 'Sertifikat Harus Diupload')
        }else if(this.state.button_edit !== 'Edit Foto Profil'){
            if(this.state.type_file !== 'docx'){
                this.openNotification('Format Sertifikat Salah', 'Silahkan Upload Kembali dengan format Docx')
            }else{
                this.setState({ show: true})
                API.postEdit(`/panitia/edit-sertifikat-event/${this.state.id_sertifikat}`, params)
                .then(res => {
                    if(res.status === 200){
                        message.success('Data Sertifikat Berhasil diUbah');
                        this.props.navigate(CONSTANS.WAITING_SERTIF_PANITIA_MENU_KEY)
                    }else{
                        this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                    }
                    this.setState({loading: false, show : false})
                });
            }
        }
        else{
            this.setState({show : true})
            API.postEdit(`/panitia/edit-sertifikat-event/${this.state.id_sertifikat}`, params)
            .then(res => {
                if(res.status === 200){
                    message.success('Data Sertifikat Berhasil diUbah');
                    this.props.navigate(CONSTANS.WAITING_SERTIF_PANITIA_MENU_KEY)
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({ show : false})
            });
        }
       
    }

    render() { 

        return ( 
            <EditCertificateComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
                handleButtonEdit = {this.handleButtonEdit}
                handleButtonGambar = {this.handleButtonGambar}
                uploadFile = {this.uploadFile}
                handleEvent = {this.handleEvent}
                handlePenandatangan = {this.handlePenandatangan}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.certificate,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(EditCertificatePage);
export default page