import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon,Menu,message } from 'antd';
import { navigate } from '../../../common/store/action'
import BasicInfoComponent from '../../../modules/admin-panitia/create-event/basic-info/basic-info-component';

class BasicInfoPage extends Component {
    state = {
        nama: '',
        description: '',
        organisasi: '',
        batas_peserta: '',
        kategori: '',
    }

    componentDidMount(){
       
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
        this.setState({ kategori: value.key })
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