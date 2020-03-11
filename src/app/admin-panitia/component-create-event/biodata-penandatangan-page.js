import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon,Menu,message } from 'antd';
import { navigate } from '../../../common/store/action'
import BiodataPenandatanganComponent from '../../../modules/admin-panitia/create-event/biodata-penandatangan/biodata-component';

class BiodataPenandatanganPage extends Component {
    state = {
        nama_penandatangan : '',
        instansi : '',
        jabatan : '',
        nip : '',
     }

    componentDidMount(){
       
    }


    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-7'));
        console.log(data)
        if(data !== null){
            this.setState({
                nama_penandatangan: data.nama_penandatangan,
                instansi: data.instansi,
                jabatan: data.jabatan,
                nip : data.nip,
            })
        }
  }

    onDone = () => {
        // this.props.next();
        localStorage.setItem('step-7', JSON.stringify(this.state));
    }
    onPrev = () => {
        this.props.prev();
    }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }
  
    render() {
        return ( 
            <BiodataPenandatanganComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
                onDone={this.onDone}
                onPrev={this.onPrev}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(BiodataPenandatanganPage);
export default page