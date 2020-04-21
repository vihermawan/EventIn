import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { notification,message } from 'antd';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import CreateCertificateComponent from '../../../modules/admin-panitia/create-certificate/create-certificate-component';

class CreateCertificatePage extends Component {
    state = { 
        username: '',
        password: '',
        penandatangan : [],
        activeEvent:[],
        nama_sertifikat : '',
        id_penandatangan : '',
        id_event : '',
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
            console.log('res',res.data.data.event)
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
          console.log('res',res.data.data.penandatangan)
          this.setState({
            penandatangan:res.data.data.penandatangan,
            loading: false,
          })
        });
    }

    handlePenandatangan = (input, option) => {
        console.log('input', input, 'option', option);
        this.setState({ id_penandatangan: input })  
    }

    handleEvent = (input, option) => {
        console.log('input', input, 'option', option);
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

    openNotification = (message, description) => {
        notification.error({
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
        params.set('nama_sertifikat',this.state.nama_sertifikat)
        params.set('id_event',this.state.id_event)
        params.set('id_penandatangan[]',this.state.id_penandatangan)
        params.append('sertifikat',this.state.sertifikat)
        if(validation.required(this.state.nama_sertifikat) != null ){
            const message = validation.required(this.state.nama_sertifikat);
            this.openNotification(message, 'Nama Sertifikat Harus diIsi')
        }else if(validation.required(this.state.id_event) != null ){
            const message = validation.required(this.state.id_event);
            this.openNotification(message, 'Event Harus diisi')
        }else if(validation.required(this.state.id_penandatangan) != null ){
            const message = validation.required(this.state.id_penandatangan);
            this.openNotification(message, 'Penandatangan harus dipilih')
        }else if(validation.required(this.state.sertifikat) != null ){
            const message = validation.required(this.state.sertifikat);
            this.openNotification(message, 'Sertifikat Harus Diupload')
        }else{
            this.setState({loading: true})
            this.showModal2();
            API.postEdit(`/panitia/create-sertifikat`, params)
            .then(res => {
                console.log('res',res)
                if(res.status == 201){
                    message.success('Sertifikat berhasil Ditambahkan');
                    // this.props.navigate(CONSTANS.ACTIVE_EVENT_MENU_KEY)
                }else{
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