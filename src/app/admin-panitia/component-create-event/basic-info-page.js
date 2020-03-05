import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon,Menu,message } from 'antd';
import { navigate } from '../../../common/store/action'
import BasicInfoComponent from '../../../modules/admin-panitia/create-event/basic-info/basic-info-component';

class BasicInfoPage extends Component {
    state = {
        name: '',
        description: '',
        organisasi: '',
        batas_peserta: '',
    }

    componentDidMount(){
       
    }
    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-1'));
        this.setState({
            name: data.name,
            description: data.description,
            organisasi: data.organisasi,
            batas_peserta: data.batas_peserta,
        })
    }

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
        this.props.next()
        localStorage.setItem('step-1', JSON.stringify(this.state));
    }
  
    render() {

    const menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">
            <Icon type="user" />
            1st menu item
            </Menu.Item>
            <Menu.Item key="2">
            <Icon type="user" />
            2nd menu item
            </Menu.Item>
            <Menu.Item key="3">
            <Icon type="user" />
            3rd item
            </Menu.Item>
        </Menu>
    );
        return ( 
            <BasicInfoComponent
                initialData={this.state}
                navigate={this.props.navigate}
                menu={menu}
                handleChange={this.handleChange}

                onNext={this.onNext}
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