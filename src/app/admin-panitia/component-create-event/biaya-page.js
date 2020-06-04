import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import BiayaComponent from '../../../modules/admin-panitia/create-event/biaya/biaya-component';

class BiayaPage extends Component {
    state = {
        status_biaya : '',
        bank : '-',
        no_rekening : '',
        biaya : '',
    }

    componentDidMount(){
       
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-2'));
        if(data !== null){
            this.setState({
                status_biaya: data.status_biaya,
                biaya: data.biaya,
                bank: data.bank,
                no_rekening: data.no_rekening,
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

    handleStatus = (value) => {
        this.setState({ status_biaya: value.key })
    }


    handleBank = (value) => {
        this.setState({ bank: value.key })
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };


    onNext = () => {       
        if(validation.required(this.state.status_biaya) !== null){
            const message = validation.required(this.state.status_biaya);
            this.openNotification(message, 'Kategori Bayar Harus Diisi')   
        }else if(this.state.status_biaya == 10){
            if(validation.numberRequired(this.state.biaya) !== null){
                const message = validation.numberRequired(this.state.biaya);
                this.openNotification(message, 'Biaya Harus Diisi')
            }
            else if(this.state.bank === '-'){
                this.openNotification('Bank Belum Dipilih', 'Bank Harus Dipilih')
            }else if(validation.numberRequired(this.state.no_rekening) !== null){
                const message = validation.numberRequired(this.state.no_rekening);
                this.openNotification(message, 'Nomor Rekening Harus Diisi')
            }else{
                this.props.next();
                localStorage.setItem('step-2', JSON.stringify(this.state));
            }
        }else{
            this.props.next();
            localStorage.setItem('step-2', JSON.stringify(this.state));
        }   
    }
    onPrev = () => {
        this.props.prev();
        localStorage.setItem('step-2', JSON.stringify(this.state));
    }
  
    render() {

        return ( 
            <BiayaComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                handleStatus={this.handleStatus}
                handleBank={this.handleBank}
             
                onNext={this.onNext}
                onPrev = {this.onPrev}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(BiayaPage);
export default page