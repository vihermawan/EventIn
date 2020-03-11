import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import {message } from 'antd';
import { navigate } from '../../../common/store/action'
import BasicInfoComponent from '../../../modules/admin-panitia/create-event/basic-info/basic-info-component';

class BasicInfoPage extends Component {
    state = {
        nama: '',
        description: '',
        organisasi: '',
        batas_peserta: '',
        kategori_input : '',
        kategori: [],
    }

    componentDidMount(){
       
    }

    getKategori=()=>{
        API.get('/peserta/kategori')
        .then(res => {
            console.log('kategori',res)
            if(res.status == 200){
                this.setState({
                    kategori:res.data.data.kategori,
                    
                })
            }
        })
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-1'));
        console.log(data)
        if(data !== null){
            this.setState({
                nama: data.nama,
                description: data.description,
                organisasi: data.organisasi,
                batas_peserta: data.batas_peserta,
                kategori_input : data.kategori_input
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

    handleKategori = (value) => {
        this.setState({ kategori_input: value.key })
    }

    handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      
    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
      }

    onNext = () => {
        this.props.next()
        localStorage.setItem('step-1', JSON.stringify(this.state));
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