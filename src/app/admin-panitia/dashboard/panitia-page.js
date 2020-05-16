import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import PanitiaComponent from '../../../modules/admin-panitia/dashboard-panitia/panitia-component';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class PanitiaPage extends Component {
    state = {
        id_panitia : '',
        no_telepon :'',
        instagram : '',
        total_event : '',
        total_certificate : '',
        total_regis : '',
        registEvent: [],
    }

    componentDidMount(){
        this.getProfile();
        this.getCertificate();
        this.getEventPast();
        this.getRegistEvent();
        this.getEventRegistbyToday();
    }

     //get data dari API
    getRegistEvent=()=>{
        this.setState({loading: true})
        API.get(`/panitia/countRegister`)
        .then(res => {
            this.setState({
                registEvent:res.data.data.event,
                loading: false,
            })
            this.reportChart(res.data)
        });
    }

    reportChart = (data_event_ac) => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();
        chart.legend = new am4charts.Legend();

        let data_event = [];
        for(let i=0; i<data_event_ac.size; i++){
            data_event.push({
                nama_event: data_event_ac.data.event[i].nama_event,
                diterima : data_event_ac.data.event[i].diterima,
            })
        }
        
        chart.data = data_event;
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "nama_event";
        categoryAxis.title.text = "Event";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Peserta";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "diterima";
        series.dataFields.categoryX = "nama_event";
        series.name = "Peserta";
        series.columns.template.tooltipText = "Event: {categoryX}\nTotal: {valueY}";
        series.columns.template.fill = am4core.color("#104547"); // fill
    }

    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/panitia/profile-edit`)
        .then(res => {
            this.setState({
                id_panitia : res.data.data.user.panitia.id_panitia,
                no_telepon: res.data.data.user.panitia.no_telepon,
                instagram : res.data.data.user.panitia.instagram,
                loading: false,
            })
            if(res.data.data.user.panitia.no_telepon === 'Silahkan isi'){
                this.openNotification('Silahkan lengkapi biodata', 'Agar bisa membuat event!')
            }else if(res.data.data.user.panitia.instagram === 'Silahkan isi'){
                this.openNotification('Silahkan lengkapi biodata', 'Agar bisa membuat event!')
            }
        });
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    getCertificate=()=>{
        this.setState({loading: true})
        API.get(`/panitia/event-sertifikat`)
        .then(res => {
            this.setState({total_certificate : res.data.size})
        });
    }

    getEventPast=()=>{
        this.setState({loading: true})
        API.get(`/panitia/eventPast`)
        .then(res => {
          this.setState({
            total_event:res.data.size,
            loading: false,
          })
        });
    }

    getEventRegistbyToday = () =>{
        this.setState({loading: true})
        API.get(`/panitia/count-regis-byToday`)
        .then(res => {
          this.setState({
            total_regis:res.data.data.peserta,
            loading: false,
          })
        });
    }
    
    render() {
        return ( 
            <PanitiaComponent
                initialData={this.state}
                navigate={this.props.navigate}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(PanitiaPage);
export default page