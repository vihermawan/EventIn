import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import DateTimeComponent from '../../../modules/admin-panitia/create-event/date-time/date-time-component';

class DateTimePage extends Component {
    state = {
        start_event : '',
        display_start : '',
        end_event : '',
        time_start : '',
        time_end : '',
        open_registration: '',
        end_registration: '',
    }

    componentDidMount(){
       
    }
    

    onChangeTimeStart= (time, timeString) =>{
        this.setState({ 
            time_start: timeString,
        })
    }

    onChangeTimeEnd= (time, timeString) =>{
        this.setState({ 
            time_end: timeString,
        })
    }


    onChangeDateStart = (date, dateString) => {
        this.setState({ 
            start_event: dateString,
        })
        console.log(date, dateString);
    }

    onChangeDateEnd = (date, dateString) => {
        this.setState({ 
            end_event: dateString,
        })
        console.log(date, dateString);
    }

    onChangeDateRegisStart = (date, dateString) => {
        this.setState({ 
            open_registration: dateString,
        })
        console.log(date, dateString);
    }

    onChangeDateRegistEnd = (date, dateString) => {
        this.setState({ 
            end_registration: dateString,
        })
        console.log(date, dateString);
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-4'));
        console.log(data)
        if(data !== null){
            this.setState({
                start_event: data.start_event,
                end_event: data.end_event,
                time_start: data.time_start,
                time_end: data.time_end,
                open_registration: data.open_registration,
                end_registration: data.end_registration,
            })
        }
    }

    onNext = () => {
        this.props.next();
        localStorage.setItem('step-4', JSON.stringify(this.state));
    }
    onPrev = () => {
        this.props.prev();
    }
    
    render() {
        
        return ( 
            <DateTimeComponent
                initialData={this.state}
                navigate={this.props.navigate}
                onChangeTimeStart ={this.onChangeTimeStart}
                onChangeTimeEnd = {this.onChangeTimeEnd}
                onChangeDateStart = {this.onChangeDateStart}
                onChangeDateEnd = {this.onChangeDateEnd}
                onChangeDateRegisStart = {this.onChangeDateRegisStart}
                onChangeDateRegistEnd = {this.onChangeDateRegistEnd}
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