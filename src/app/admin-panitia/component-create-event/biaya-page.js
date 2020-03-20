import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { navigate } from '../../../common/store/action'
import BiayaComponent from '../../../modules/admin-panitia/create-event/biaya/biaya-component';

class BiayaPage extends Component {
    state = {
        status_biaya: '',
        bank: '',
        no_rekening: '',
    }

    componentDidMount(){
       
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-2'));
        console.log(data)
        if(data !== null){
            this.setState({
                status_biaya: data.status_biaya,
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
        console.log('status', value.key);
    }


    handleBank = (value) => {
        this.setState({ bank: value.key })
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