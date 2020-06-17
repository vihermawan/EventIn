import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { notification,message } from 'antd'
import CONSTANS from '../../../common/utils/Constants';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import CreateCertificateComponent from '../../../modules/admin-panitia/create-certificate/create-certificate-component';

class CreateCertificatePage extends Component {
    state = { 
        penandatangan : [],
        activeEvent:[],
        nama : '',
        no_sertifikat: '',
        id_penandatangan : '',
        id_event : '',
        type_file : '',
        visible : false,
    }

    componentDidMount(){
        this.getPenandatangan();
        this.getEvent();
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

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

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
                size_sertifikat : event.target.files[0].size / 1024 / 1024,
                type_file   : event.target.files[0].name.split('.').pop()
                // type_file :event.target.files[0].type,
            })
        }
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

    showModal2 = () => {
        this.setState({
            show :true,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        params.set('nama',this.state.nama)
        params.set('no_sertifikat',this.state.no_sertifikat)
        params.set('id_event',this.state.id_event)
        params.set('id_penandatangan[]',this.state.id_penandatangan)
        params.append('sertifikat',this.state.sertifikat)
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
        }else if(this.state.type_file !== 'docx'){
            this.openNotification('Format Sertifikat Salah', 'Silahkan Upload Kembali dengan format Docx')
        }
        else{
            this.setState({loading: true})
            this.showModal2();
            API.postEdit(`/panitia/create-sertifikat`, params)
            .then(res => {
                if(res.status === 201){
                    this.setState({ show :false,})
                    message.success('Sertifikat berhasil Diajukan');
                    this.successNotification('Sukses mengajukan sertifikat', 'Tunggu 1 x 24 jam di email anda untuk mendapat pemberitahuan apakah sertifikat disetujui atau tidak')
                    this.props.navigate(CONSTANS.WAITING_SERTIF_PANITIA_MENU_KEY)
                }else{
                    this.setState({ show :false,})
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
            });
        }
    }

    

    render() { 
        return ( 
            <CreateCertificateComponent
                navigate={this.props.navigate}
                initialData={this.state}
                handlePenandatangan = {this.handlePenandatangan}
                uploadFile = {this.uploadFile}
                handleEvent = {this.handleEvent}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(CreateCertificatePage);
export default page