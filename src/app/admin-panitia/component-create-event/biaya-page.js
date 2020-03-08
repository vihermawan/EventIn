import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { navigate } from '../../../common/store/action'
import BiayaComponent from '../../../modules/admin-panitia/create-event/biaya/biaya-component';

class BiayaPage extends Component {
    state = {
        nama: '',
        description: '',
        organisasi: '',
        batas_peserta: '',
    }

    componentDidMount(){
       
    }

    // componentWillMount(){
    //     const data = JSON.parse(localStorage.getItem('step-1'));
    //     this.setState({
    //         nama: data.nama,
    //         description: data.description,
    //         organisasi: data.organisasi,
    //         batas_peserta: data.batas_peserta,
    //     })
    // }

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
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
        this.props.next();
        localStorage.setItem('step-2', JSON.stringify(this.state));
    }
    onPrev = () => {
        this.props.prev();
    }
  
    render() {

        return ( 
            <BiayaComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleChange={this.handleChange}
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