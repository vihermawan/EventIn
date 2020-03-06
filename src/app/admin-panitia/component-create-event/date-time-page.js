import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import DateTimeComponent from '../../../modules/admin-panitia/create-event/date-time/date-time-component';

class DateTimePage extends Component {
    state = {

    }

    componentDidMount(){
       
    }

    onChange =(date, dateString) => {
        console.log(date, dateString);
    }
    onNext = () => {
        this.props.next();
        localStorage.setItem('step-3', JSON.stringify(this.state));
    }
    onPrev = () => {
        this.props.prev();
    }
    
    render() {
        
        return ( 
            <DateTimeComponent
                initialData={this.state}
                navigate={this.props.navigate}
                onChange = {this.onChange}

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

const page = connect(mapStateToProps, mapDispatchToProps)(DateTimePage);
export default page