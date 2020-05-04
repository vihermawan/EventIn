import React, { Component } from 'react';
import { message,notification } from 'antd';
import CONSTANS from '../../../common/utils/Constants'
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import EditCertificateComponent from '../../../modules/admin-panitia/e-certificate/edit-certificate-component';

class EditCertificatePage extends Component {
    state = {
        nama_sertifikat: '',
        deskripsi :'',
        size_sertifikat :'',
        sertifikat :'',
        loading: false,
        button_edit : 'Edit Foto Profil',
    }

    componentDidMount(){
        this.getCertificate(this.props.idSertifikat);
    }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    //get data profile dari API
    getCertificate=(id_sertifikat)=>{
        this.setState({loading: true})
        API.get(`/panitia/event-sertifikat/${id_sertifikat}`)
        .then(res => {
            console.log('res',res)
            this.setState({
                nama_sertifikat : res.data.data.sertifikat.nama_sertifikat,
                deskripsi : res.data.data.sertifikat.description,
                sertifikat : res.data.data.sertifikat.sertifikat,
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
        if(event.target.files[0].type !== 'application/msword'){
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

    handleSubmit = e => {
        e.preventDefault();
        const params = new FormData()
        params.append('sertifikat',this.state.sertifikat)
        params.append("_method", 'PUT')
        params.set('nama_sertifikat',this.state.nama_sertifikat)
        params.set('description',this.state.deskripsi)
        this.setState({loading: true})
        
        API.postEdit(`/panitia/edit-sertifikat-event/${this.props.idSertifikat}`, params)
            .then(res => {
                console.log('res',res)
                if(res.status === 200){
                    message.success('Data Sertifikat Berhasil diUbah');
                    this.props.navigate(CONSTANS.WAITING_SERTIF_PANITIA_MENU_KEY)
                    window.location.reload();
                   
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                }
                this.setState({loading: false})
            });
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