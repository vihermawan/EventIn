import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import { navigate } from '../../../common/store/action'
import DetailPesertaComponent from '../../../modules/admin-superadmin/user/peserta/detail-peserta-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class DetailPesertaPage extends Component {
    state = {
        peserta : [],
        detailPeserta : [],
        event_peserta :[],
        loading :false,
    }

    componentDidMount(){
        this.getDetailPeserta(this.props.idUsers);
        console.log('id users', this.props.idUsers)
        this.getEventPeserta(this.props.idPeserta);
    }

    getDetailPeserta=(id)=>{
        this.setState({loading: true})
        API.get(`/admin/detail-peserta/${id_users}`)
        .then(res => {
          console.log('res',res.data.data.peserta)
          this.setState({
            peserta:res.data.data.peserta,
            detail_peserta: res.data.data.peserta.peserta,
            loading: false,
          })
        });
    }

    getEventPeserta=(id_peserta)=>{
        this.setState({loading:true})
        API.get(`/admin/event-peserta/${id_peserta}`)
        .then(res => {
          console.log('res',res.data.data.event)
          this.setState({
            event_peserta : res.data.data.event,
            loading: false,
          })
        });
    }

    //button detail event
    onDetailEvent = (id) => {
        console.log('id ini',id)
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_ADMIN_MENU_KEY)
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
            render: status => (
                <span>
                    {status.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : '#87d068';
                            if (tag === 'Register') {
                                color = '#f50';
                            }else if (tag === 'Registered'){
                                color = '#87d068';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag}
                                </Tag>
                            );
                    })}
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