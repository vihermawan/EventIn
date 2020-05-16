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
        total_penandatangan: '',
        total_sertifikat : '',
        total_event :'',
        loading: false,
    }

    componentDidMount () {
        this.getEventbyMonth();
        this.getUserbyRole();
        this.getBiodataPenandatangan();
        this.getApprovalEvent();
        this.getWaitingSertifikat();
        this.getAllSertifikat();
        this.getAllEvent();
        this.getAllUser();
    }

    getEventbyMonth = () => {
        this.setState({loading: true})
        API.get(`/admin/count-event`)
        .then(res => {
            this.setState({loading:false})
            this.reportChart(res.data)
        });
        
    }

    getUserbyRole = () => {
        this.setState({loading: true})
        API.get(`/admin/count-user`)
        .then(res => {
            this.setState({loading:false})
            this.pieChart(res.data)
        });
        
    }

    getBiodataPenandatangan = () => {
        this.setState({loading: true})
        API.get(`/admin/showbiodatapenandatangan`)
        .then(res => {
            this.setState({total_biodata : res.data.size,loading : false})
        });
    }

    getApprovalEvent = () => {
        this.setState({loading: true})
        API.get(`/admin/approve/event`)
        .then(res => {
            this.setState({total_approval : res.data.size,loading : false})
        });
    }

    getWaitingSertifikat = () => {
        this.setState({loading: true})
        API.get(`/admin/sertifikat-waiting`)
        .then(res => {
            this.setState({total_waitingSertifikat : res.data.size,loading : false})
        });
    }

    getAllSertifikat = () => {
        this.setState({loading: true})
        API.get(`/admin/count-all-sertifikat`)
        .then(res => {
            this.setState({total_certificate : res.data.data.sertifikat,loading : false})
        });
    }

    getAllEvent = () => {
        this.setState({loading: true})
        API.get(`/admin/count-all-event`)
        .then(res => {
            this.setState({total_event : res.data.data.event,loading : false})
        });
    }

    getAllUser = () => {
        this.setState({loading: true})
        API.get(`/admin/count-all-user`)
        .then(res => {
            this.setState({total_user : res.data.data.user,loading : false})
        });
    }

    pieChart = (data_users) => {
    
        let chart = am4core.create("chartpiediv", am4charts.PieChart);
        let data_user = [];
        for(let i=0; i<data_users.size; i++){
            data_user.push({
                user: data_users.data.user[i],
                total : data_users.data.data[i]
            })
        }
        chart.data = data_user;
        
        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        chart.legend = new am4charts.Legend();
        chart.legend.maxWidth = undefined;
        chart.legend.position = "absolute";
        chart.legend.valueLabels.template.align = "right"
        chart.legend.valueLabels.template.textAlign = "end"
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = "user";
    }
    
    reportChart = (data_event_ac) => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();
        chart.legend = new am4charts.Legend();
        let data_event = [];
       
        for(let i=0; i<data_event_ac.size; i++){
            data_event.push({
                bulan: data_event_ac.data.bulan[i],
                jumlah : data_event_ac.data.data[i]
            })
        }

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