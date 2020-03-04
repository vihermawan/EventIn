import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import { navigate } from '../../../common/store/action'
import DetailPanitiaComponent from '../../../modules/admin-superadmin/user/panitia/detail-panitia-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

class DetailPanitiaPage extends Component {
    state = {
        panitia: [],
        detail_panitia : [],
        event_panitia : [],
        loading :false,
    }

    componentDidMount(){
        this.getDetailPanitia(this.props.idUsers);
        console.log('id users', this.props.idUsers)
        this.getEventPanitia(this.props.idPanitia);
    }

    getDetailPanitia=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/detail-panitia/admin/${id_users}`)
        .then(res => {
          console.log('res',res.data.data.panitia)
          this.setState({
            panitia:res.data.data.panitia,
            detail_panitia: res.data.data.panitia.panitia,
            loading: false,
          })
        });
    }

    getEventPanitia=(id_panitia)=>{
        this.setState({loading:true})
        API.get(`/admin/event-panitia/${id_panitia}`)
        .then(res => {
          console.log('res',res.data.data.event)
          this.setState({
            event_panitia : res.data.data.event,
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
                title : 'Status Event',
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
                    onClick={ () => this.onDetailEvent(data.nomor)}
                />]
              ),
            },
          ];
    
        const data =  this.state.event_panitia.map( ({id_event, nama_event, detail_event, kategori,status_event}, index) => ({
            no : index+1,
            nomor : id_event,
            nama_event: nama_event,
            start_event : moment(detail_event.start_event).format("DD MMMM YYYY"),
            end_event : moment(detail_event.end_event).format("DD MMMM YYYY"),
            status : [status_event.nama_status],
            lokasi : detail_event.lokasi,
            kategori : [kategori.nama_kategori],
            peserta : detail_event.limit_participant,
        }))

        return ( 
            <DetailPanitiaComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.panitia,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPanitiaPage);
export default page