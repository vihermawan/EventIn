import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Menu, Icon } from 'antd';
import { navigate } from '../../../common/store/action'
import VenueComponent from '../../../modules/admin-panitia/create-event/venue/venue-component';

class VenuePage extends Component {
    state = {
       venue:'',
       lokasi : '',
    }

    componentDidMount(){
        
    }
    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-3'));
        console.log(data)
        if(data !== null){
            this.setState({
                venue: data.venue,
                lokasi: data.lokasi,
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
        console.log('venue', value.key);
    }

    onNext = () => {
        this.props.next();
        localStorage.setItem('step-3', JSON.stringify(this.state));
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