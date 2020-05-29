import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { navigate } from '../../../common/store/action'
import DateTimeComponent from '../../../modules/admin-panitia/create-event/date-time/date-time-component';
import moment from 'moment';

class DateTimePage extends Component {
    state = {
        start_event : moment().format('YYYY-MM-DD'),
        end_event : moment().format('YYYY-MM-DD'),
        time_start : '',
        time_end : '',
        open_registration: moment().format('YYYY-MM-DD'),
        end_registration: moment().format('YYYY-MM-DD'),
    }

    componentDidMount(){
       
    }

    disabledDate(current) {
        return current && current < moment().startOf('day');
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
    }

    onChangeDateEnd = (date, dateString) => {
        this.setState({ 
            end_event: dateString,
        })
    }

    onChangeDateRegisStart = (date, dateString) => {
        this.setState({ 
            open_registration: dateString,
        })
    }

    onChangeDateRegistEnd = (date, dateString) => {
        this.setState({ 
            end_registration: dateString,
        })
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-4'));
        if(data !== null){
            this.setState({
                start_event: data.start_event,
                end_event: data.end_event,
                time_start: data.time_start,
                time_end: data.time_end,
                open_registration: data.open_registration,
                end_registration: data.end_registration,
            })
        }else{
            this.setState({
                start_event: moment().format('YYYY-MM-DD'),
                end_event: moment().format('YYYY-MM-DD'),
                time_start: moment().format('HH:mm'),
                time_end: moment().format('HH:mm'),
                open_registration: moment().format('YYYY-MM-DD'),
                end_registration: moment().format('YYYY-MM-DD'),
            })
        }
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    onNext = () => {
        if(Date.parse(this.state.start_event) > Date.parse(this.state.end_event)){
            this.openNotification('Tanggal Mulai Event harus disesuaikan', 'Tanggal harus disi dengan benar') 
        }else if(Date.parse(this.state.open_registration) > Date.parse(this.state.end_registration)){
            this.openNotification('Tanggal Pendaftaran harus disesuaikan', 'Tanggal harus disi dengan benar')  
        }else if(Date.parse(this.state.start_event) < Date.parse(this.state.end_registration)){
            this.openNotification('Tanggal Pendaftaran harus disesuaikan', 'Tanggal Registrasi harus lebih dulu')
        }else if(Date.parse(this.state.start_event) < Date.parse(this.state.open_registration)){
            this.openNotification('Tanggal Pendaftaran harus disesuaikan', 'Tanggal Registrasi harus lebih dulu')
        }else if(Date.parse(this.state.end_event) < Date.parse(this.state.end_registration)){
            this.openNotification('Tanggal Pendaftaran harus disesuaikan', 'Tanggal Registrasi harus lebih dulu')
        }else if(this.state.time_start === ''){
            this.openNotification('Jam Belum Disisi', 'Jam harus disi dengan benar') 
        }else if(this.state.time_end === ''){
            this.openNotification('Jam Belum Disisi', 'Jam harus disi dengan benar') 
        }
        else{
            this.props.next();
            localStorage.setItem('step-4', JSON.stringify(this.state));
        }
       
    }
    onPrev = () => {
        this.props.prev();
        localStorage.setItem('step-4', JSON.stringify(this.state));
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
                disabledDate = {this.disabledDate}
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