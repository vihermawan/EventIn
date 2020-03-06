import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import DetailPesertaComponent from '../../../modules/admin-superadmin/user/peserta/detail-peserta-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

class DetailPesertaPage extends Component {
    state = {
        peserta: [],
        detailPeserta : [],
        eventPeserta : [],
        eventbyPeserta : [],
        loading :false,
    }

    componentDidMount(){
        this.getDetailPeserta(this.props.idUsers);
        this.getEventbyPeserta(this.props.idPeserta);
    }

    getDetailPeserta=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta/${id_users}`)
        .then(res => {
          console.log('res',res)
          this.setState({
            peserta : res.data.data.peserta,
            detailPeserta:res.data.data.peserta.peserta,
            loading: false,
          })
        });
    }
    
    getEventbyPeserta=(id_peserta)=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta-event/${id_peserta}`)
        .then(res => {
          console.log('res',res)
          this.setState({
            eventbyPeserta : res.data.data.peserta,
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
                dataIndex: 'no',
                key: 'no',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Nama Event',
                dataIndex: 'nama_event',
                key: 'nama_event',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Tempat',
                dataIndex: 'lokasi',
                key: 'lokasi',
            },
            {
                title: 'Kategori',
                dataIndex: 'kategori',
                key: 'kategori',
                render: kategori => (
                    <span>
                      {kategori.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                          color = 'volcano';
                        }
                        return (
                          <Tag color={color} key={tag}>
                            {tag}
                          </Tag>
                        );
                      })}
                    </span>
                ),
                onFilter: (value, record) => record.nama_event.indexOf(value) === 0,
                sorter: (a, b) => a.kategori.length - b.kategori.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title : 'Status Peserta',
                dataIndex : 'status',
                key : 'status',
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
                onFilter: (value, record) => record.status.indexOf(value) === 0,
                sorter: (a, b) => a.status.length - b.status.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Tanggal Mulai',
                dataIndex: 'start_event',
                key: 'start_event',
            },
            {
                title: 'Tanggal Selesai',
                dataIndex: 'end_event',
                key: 'end_event',
              },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonDashboard
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick={ () => this.onDetailEvent(data.id_event)}
                />]
              ),
            },
          ];

     const data =  this.state.eventbyPeserta.map( ({id_event, event, status,kategori}, index) => ({
            no : index+1,
            id_event : id_event,
            nama_event: event.nama_event,
            start_event : moment(event.detail_event.start_event).format("DD MMMM YYYY"),
            end_event : moment(event.detail_event.end_event).format("DD MMMM YYYY"),
            status : [status.nama_status],
            lokasi : event.detail_event.lokasi,
            kategori : [event.kategori.nama_kategori],
        }))


        return ( 
            <DetailPesertaComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.peserta,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPesertaPage);
export default page