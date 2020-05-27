import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { notification } from 'antd';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import VenueComponent from '../../../modules/admin-panitia/create-event/venue/venue-component';

class VenuePage extends Component {
    state = {
       venue:'',
       lokasi : '',
       provinsi : [],
       kabupaten : [],
       id_kabupaten : '',
       id_provinsi: '',
    }

    componentDidMount(){
        this.getProvinsi();
        if(this.state.id_kabupaten !== ''){
            this.getKabupatenData(this.state.id_kabupaten);
        }
    }

    getProvinsi = () => {
        this.setState({loading: true})
        API.get(`/provinsi`)
        .then(res => {
            this.setState({
                provinsi:res.data.data.provinsi,
                loading: false,
            })
        });
    }

    getKabupatenData = (id_kabupaten) => {
        this.setState({loading: true})
        API.get(`/kabupaten-data/${id_kabupaten}`)
        .then(res => {
            this.setState({
                kabupaten:res.data.data.kabupaten,
                loading: false,
            })
        });
    }

    getKabupaten = (id_provinsi) => {
        this.setState({loading: true})
        API.get(`/kabupaten/${id_provinsi}`)
        .then(res => {
            this.setState({
                kabupaten:res.data.data.kabupaten,
                loading: false,
            })
        });
    }
    
    handleProvinsi = (input, option) => {
        this.setState({ id_provinsi: input })  
        this.getKabupaten(input)
    }

    handleKabupaten = (input, option) => {
        this.setState({ id_kabupaten: input })  
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-3'));
        if(data !== null){
            this.setState({
                venue: data.venue,
                lokasi: data.lokasi,
                id_provinsi : data.id_provinsi,
                id_kabupaten : data.id_kabupaten,
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

    handleTempat = (value) => {
        this.setState({ venue: value.key })
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    onNext = () => {
        if(validation.required(this.state.venue) !== null){
            const message = validation.required(this.state.venue);
            this.openNotification('Harus dipilih', 'Ruangan Harus Dipilih')   
        }else if(validation.required(this.state.id_provinsi) !== null){
            const message = validation.required(this.state.id_provinsi);
            this.openNotification('Harus dipilih', 'Provinsi Harus Dipilih')
        }else if(validation.required(this.state.id_kabupaten) !== null){
            const message = validation.required(this.state.id_kabupaten);
            this.openNotification('Harus dipilih', 'Kabupaten Harus Dipilih')
        }else if(validation.required(this.state.lokasi) !== null){
            const message = validation.required(this.state.lokasi);
            this.openNotification(message, 'Lokasi Harus Diisi')
        }else{
            this.props.next();
            localStorage.setItem('step-3', JSON.stringify(this.state));
        }
    }

    onPrev = () => {
        this.props.prev();
        localStorage.setItem('step-3', JSON.stringify(this.state));
    }
  
    render() {
        return ( 
            <VenueComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                handleTempat = {this.handleTempat}
                onNext={this.onNext}
                onPrev={this.onPrev}
                handleProvinsi = {this.handleProvinsi}
                handleKabupaten = {this.handleKabupaten}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(VenuePage);
export default page