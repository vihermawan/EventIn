import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import {message, notification } from 'antd';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import BasicInfoComponent from '../../../modules/admin-panitia/create-event/basic-info/basic-info-component';

class BasicInfoPage extends Component {
    state = {
        nama: '',
        description: '',
        organisasi: '',
        batas_peserta: '',
        kategori_input : '',
        no_telepon : '',
        email_event : '',
        instagram : '',
        kategori: [],
    }

    componentDidMount(){
       this.getKategori();
    }

    getKategori=()=>{
        API.get('/panitia/kategori')
        .then(res => {
            if(res.status === 200){
                console.log(res.data.data.kategori)
                this.setState({
                    kategori:res.data.data.kategori,
                })
            }
        })
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-1'));
        if(data !== null){
            this.setState({
                nama: data.nama,
                description: data.description,
                organisasi: data.organisasi,
                batas_peserta: data.batas_peserta,
                kategori_input : data.kategori_input,
                no_telepon : data.no_telepon,
                email_event : data.email_event,
                instagram : data.instagram,
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

    handleKategori = (input, option) => {
        console.log(input.key)
        this.setState({ kategori_input: input.key})
    }



    handleButtonClick(e) {
        message.info('Click on left button.');
      }
      
    handleMenuClick(e) {
        message.info('Click on menu item.');
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    onNext = () => {
        if(validation.required(this.state.nama) !== null){
            const message = validation.required(this.state.nama);
            this.openNotification(message, 'Nama Event Harus Diisi')
        }else if(validation.required(this.state.description) !== null){
            const message = validation.required(this.state.description);
            this.openNotification(message, 'Deskripsi Event Harus Diisi')
        }else if(validation.required(this.state.organisasi) !== null){
            const message = validation.required(this.state.organisasi);
            this.openNotification(message, 'Organisasi Harus Diisi')
        }else if(validation.numberRequired(this.state.batas_peserta) !== null){
            const message = validation.numberRequired(this.state.batas_peserta);
            this.openNotification(message, 'Batas Peserta Event Harus Diisi')
        }else if(validation.numberRequired(this.state.no_telepon) !== null){
            const message = validation.numberRequired(this.state.no_telepon);
            this.openNotification(message, 'Nomor Telefon Harus Diisi')
        }else if(validation.emailRequired(this.state.email_event) !== null){
            const message = validation.emailRequired(this.state.email_event);
            this.openNotification(message, 'Email Event Harus Diisi')
        }else if(validation.required(this.state.kategori_input) !== null){
            const message = validation.required(this.state.kategori_input);
            this.openNotification(message, 'Kategori Event Harus Dipilih')
        }else if(validation.required(this.state.instagram) !== null){
            const message = validation.required(this.state.instagram);
            this.openNotification(message, 'Akun Instagram Event Harus Diisi')
        }else{
            this.props.next()
            localStorage.setItem('step-1', JSON.stringify(this.state));
        }
        
    }
  
    render() {

        return ( 
            <BasicInfoComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                onNext={this.onNext}
                handleKategori={this.handleKategori}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(BasicInfoPage);
export default page