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
    }

    componentDidMount () {
        this.getEventbyMonth();
    }

    getEventbyMonth = () => {
        this.setState({loading: true})
        API.get(`/admin/count-event`)
        .then(res => {
            console.log('res',res.data.data)
            this.reportChart(res.data.data)
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