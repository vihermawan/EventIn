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
        this.getAllUser();
        this.getAllPeserta();
        this.getAllPanitia();
        this.getAllPenandatangan();
        this.getAllSertifikat();
        this.getAllEvent();
    }

    getEventbyMonth = () => {
        this.setState({loading: true})
        API.get(`/admin/count-event`)
        .then(res => {
            console.log('res',res.data)
            this.setState({loading:false})
            this.reportChart(res.data)
        });
        
    }

    getAllUser = () => {
        this.setState({loading: true})
        API.get(`/admin/count-user`)
        .then(res => {
            console.log('res',res.data)
            this.setState({loading:false})
            this.pieChart(res.data)
        });
        
    }

    getAllPeserta = () => {
        this.setState({loading: true})
        API.get(`/admin/count-peserta`)
        .then(res => {
            // console.log('res',res.data.data.user)
            this.setState({total_peserta : res.data.data.user,loading : false})
        });
    }

    getAllPanitia = () => {
        this.setState({loading: true})
        API.get(`/admin/count-panitia`)
        .then(res => {
            // console.log('res',res.data.data.user)
            this.setState({total_panitia : res.data.data.user,loading : false})
        });
    }

    getAllPenandatangan = () => {
        this.setState({loading: true})
        API.get(`/admin/count-penandatangan`)
        .then(res => {
            // console.log('res',res.data.data.user)
            this.setState({total_penandatangan : res.data.data.user,loading : false})
        });
    }

    getAllSertifikat = () => {
        this.setState({loading: true})
        API.get(`/admin/count-sertifikat`)
        .then(res => {
            // console.log('res',res.data.data.sertifikat)
            this.setState({total_sertifikat : res.data.data.sertifikat,loading : false})
        });
    }

    getAllEvent = () => {
        this.setState({loading: true})
        API.get(`/admin/count-all-event`)
        .then(res => {
            // console.log('res',res.data.data.event)
            this.setState({total_event : res.data.data.event,loading : false})
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
        chart.innerRadius = am4core.percent(40);
        
        // Add and configure Series.
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        chart.legend = new am4charts.Legend();
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = "user";
    }
    
    reportChart = (data_event_ac) => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();
        chart.legend = new am4charts.Legend();
        let data_event = [];
        console.log(data_event_ac)
       
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