import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import AdminComponent from '../../../modules/admin-superadmin/dashboard/admin-component';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class AdminPage extends Component {
    state = {  
        januari : [],
        total_peserta: '',
        total_panitia: '',
        total_sertifikat : '',
        total_event :'',
        loading: false,
    }

    componentDidMount () {
        this.getEventbyMonth();
        this.getAllPeserta();
        this.getAllPanitia();
        this.getAllSertifikat();
        this.getAllEvent();
    }

    getEventbyMonth = () => {
        this.setState({loading: true})
        API.get(`/admin/count-event`)
        .then(res => {
            // console.log('res',res.data.data)
            this.setState({loading:false})
            this.reportChart(res.data.data)
        });
        
    }

    getAllPeserta = () => {
        this.setState({loading: true})
        API.get(`/admin/count-peserta`)
        .then(res => {
            console.log('res',res.data.data.user)
            this.setState({total_peserta : res.data.data.user,loading : false})
        });
    }

    getAllPanitia = () => {
        this.setState({loading: true})
        API.get(`/admin/count-panitia`)
        .then(res => {
            console.log('res',res.data.data.user)
            this.setState({total_panitia : res.data.data.user,loading : false})
        });
    }

    getAllSertifikat = () => {
        this.setState({loading: true})
        API.get(`/admin/count-sertifikat`)
        .then(res => {
            console.log('res',res.data.data.sertifikat)
            this.setState({total_sertifikat : res.data.data.sertifikat,loading : false})
        });
    }

    getAllEvent = () => {
        this.setState({loading: true})
        API.get(`/admin/count-all-event`)
        .then(res => {
            console.log('res',res.data.data.event)
            this.setState({total_event : res.data.data.event,loading : false})
        });
    }

    reportChart = (data_event_ac) => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();
        chart.legend = new am4charts.Legend();
        let data_event = [];
        console.log(data_event_ac)
       
        const data = data_event_ac.map( data => {
            data_event.push({
                bulan : data.bulan,
                jumlah: data.total,
            })
        })
        
        // console.log(data_event)

        chart.data = data_event;
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "bulan";
        categoryAxis.title.text = "Bulan";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Jumlah";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "jumlah";
        series.dataFields.categoryX = "bulan";
        series.name = "Jumlah";
        series.columns.template.tooltipText = "Bulan: {categoryX}\nTotal: {valueY}";
        series.columns.template.fill = am4core.color("#104547"); // fill
    }

    render() { 
        return ( 
            <AdminComponent
                navigate={this.props.navigate}
                initialData = {this.state}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(AdminPage);
export default page