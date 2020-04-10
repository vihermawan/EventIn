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
        registEvent: [],
    }

    componentDidMount(){
        this.getProfile();
        this.getCertificate();
        this.getEventPast();
        this.getRegistEvent();
    }

     //get data dari API
     getRegistEvent=()=>{
        this.setState({loading: true})
        API.get(`/panitia/countRegister`)
        .then(res => {
            console.log('res',res.data)
            // this.reportChart(res.data.data.event)
            this.setState({
                registEvent:res.data.data.event,
                loading: false,
            })
            this.reportChart(res.data)
        });
    }

    reportChart = (data_event_ac) => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        
        let data_event = [];
        console.log(data_event_ac)
        for(let i=0; i<data_event_ac.size; i++){
            data_event.push({
                nama_event: data_event_ac.data.event[i].event.nama_event,
                diterima : data_event_ac.data.event[i].diterima,
                litres: 501.9,
                units: 250
            })
        }
        
        console.log(data_event)

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
        series.columns.template.tooltipText = "Daftar: {name}\nEvent: {categoryX}\nValue: {valueY}";
        series.columns.template.fill = am4core.color("#104547"); // fill

        // let series2 = chart.series.push(new am4charts.ColumnSeries());
        // series2.name = "Units";
        // series2.dataFields.valueY = "litres";
        // series2.dataFields.categoryX = "nama_event";
        // series2.dataFields.valueY = "units";
        // series2.dataFields.categoryX = "nama_event";
        // series2.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
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
            if(res.data.data.user.panitia.no_telepon == 'Silahkan isi'){
                this.openNotification('Silahkan lengkapi biodata', 'Agar bisa membuat event!')
            }else if(res.data.data.user.panitia.instagram == 'Silahkan isi'){
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
          console.log('res',res.data.size)
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