import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailPenandatanganComponent from '../../../modules/admin-superadmin/user/penandatangan/detail-penandatangan-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class DetailPenandatanganPage extends Component {
    state = {
        
    }

    componentDidMount(){
        // this.getEventPast();
    }

    // getEventPast=()=>{
    //     this.setState({loading: true})
    //     API.get(`/panitia/eventPast`)
    //     .then(res => {
    //       console.log('res',res.data.data.event)
    //       this.setState({
    //         eventPast:res.data.data.event,
    //         loading: false,
    //       })
    //     });
    // }

    render() { 
          const columns = [
            {
                title: 'No',
                dataIndex: 'nomor',
                key: 'nomor',
                render: text => <a>{text}</a>,
            },
            {
              title: 'Nama Sertifikat',
              dataIndex: 'nama_sertifikat',
              key: 'nama_sertifikat',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Gambar Sertifikat',
              dataIndex: 'gambar',
              key: 'gambar',
            },
          ];
        
          // const data = [
          //   {
          //     key: '1',
          //     Nomor : '1',
          //     Nama_Event: 'UGMTalks',
          //     tanggal_event :'2020-10-11',
          //     tags: ['Done'],
          //   },
          // ];

        //   const data =  this.state.eventPast.map( data => ({
        //     key: data.id_event,
        //             nomor : data.id_event,
        //             nama_event: data.nama_event,
        //             start_event :data.detail_event.start_event,
        //             lokasi : data.detail_event.lokasi,
        //             kategori : data.detail_event.id_kategori,
        //             peserta : data.detail_event.limit_participant,
        //             tags: ['Done'],
        // }))

        return ( 
            <DetailPenandatanganComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                // data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPenandatanganPage);
export default page