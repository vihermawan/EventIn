import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailPesertaComponent from '../../../modules/admin-superadmin/user/peserta/detail-peserta-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class DetailPesertaPage extends Component {
    state = {
        detailPeserta : [],
        loading :false,
    }

    componentDidMount(){
        this.getDetailPeserta(this.props.idPeserta);
    }

    getDetailPeserta=(id)=>{
        // this.setState({loading: true})
        API.get(`/admin/showpeserta/${id}`)
        .then(res => {
          console.log('res',res)
        //   this.setState({
        //     eventPast:res.data.data.event,
        //     loading: false,
        //   })
        });
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
            title: 'Nama Peserta',
            dataIndex: 'nama_peserta',
            key: 'nama_peserta',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Organisasi',
            dataIndex: 'organisasi',
            key: 'organisasi',
        },
        {
            title: 'Jenis Kelamin',
            dataIndex: 'jenis_kelamin',
            key: 'jenis_kelamin',
        },
        {
            title: 'Umur',
            dataIndex: 'umur',
            key: 'umur',
        },
        {
            title: 'Status',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
            <span>
                {/* {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : '#87d068';
                if (tag === 'reject') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                    </Tag>
                );
                })} */}
            </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
            [<ButtonIcon
                text="Approve"
                height={20}
                icon={faCheckCircle}
                borderRadius="5px"
                background="#00C908"
                marginRight= "20px"
            />,
            <ButtonIcon
                text="Reject"
                height={20}
                icon={faWindowClose}
                borderRadius="5px"
                background="#FF0303"
                marginRight= "20px"
            />]
            ),
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
            <DetailPesertaComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                // data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.peserta,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPesertaPage);
export default page