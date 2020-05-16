import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailSertifComponent from '../../../modules/admin-panitia/e-certificate/detail-certificate-component';

class DetailSertifPage extends Component {
    state = {
        detailsertifikat : [],
        loading : false,
    }

    componentDidMount(){
        this.getDetailSertifikat(this.props.idSertifikat);
    }
    
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
            <DetailSertifComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                // data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
  ...state.certificate,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailSertifPage);
export default page