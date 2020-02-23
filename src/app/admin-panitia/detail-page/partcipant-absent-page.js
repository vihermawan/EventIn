import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag,Modal,message } from 'antd';
import CONSTANS from '../../../common/utils/Constants'
import {  faUsers} from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailParticipantComponent from '../../../modules/admin-panitia/active-event/participant-absent-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdPeserta } from '../../../modules/admin-superadmin/user/peserta/store/peserta-action'

const {confirm} = Modal;

class DetailParticipantPage extends Component {
    state = {
        listParticipant: [],
        loading: false,
    }

    componentDidMount(){
        this.getParticipantEvent(this.props.idEvent)
    }

    getParticipantEvent=(id) => {
        this.setState({loading: true})
        API.get(`/panitia/event/${id}/peserta`)
        .then(res => {
            console.log('res',res)
            if(res.status === 200){
                this.setState({
                    listParticipant:res.data.data.peserta,
                })
            }
            this.setState({loading:false})
        });
    }

    //button detail peserta
    onDetailPeserta = (id) => {
        console.log('id ini',id)
        this.props.setIdPeserta(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_PESERTA_MENU_KEY)
    }

    //approve peserta
    AbsentPeserta = (id_pesertaevent) => {
        console.log(id_pesertaevent)
        API.put(`/panitia/ubahAbsensi/${id_pesertaevent}`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('This is a success message');
                this.componentDidMount();
            }   
        });
    }

    //function untuk modal
    showAbsenConfirm = (id) => {
        confirm({
            title: 'Apakah peserta ini sudah datang ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.AbsentPeserta(id);
            },
            onCancel(){
                console.log('Cancel')
            }
        });
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
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
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
                title: 'Status Absensi',
                dataIndex: 'status',
                key: 'status',
                render: status => (
                    <span>
                      {status.map(tag => {
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
            },
            
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonDashboard
                    text="Absen"
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#070E57"
                    marginRight= "20px"
                    onClick = {() => this.showAbsenConfirm(data.id_peserta_event)}
                />]
              ),
            },
          ];

        const data =  this.state.listParticipant.map( ({id_event, peserta, status, id_peserta_event}, index) => ({
            no : index+1,
            id_peserta_event : id_peserta_event,
            nomor : id_event,
            nama_peserta: peserta.nama_peserta,
            organisasi : peserta.organisasi,
            email : peserta.users.email,
            jenis_kelamin : peserta.jenis_kelamin,
            umur : peserta.umur,
            status : [status.nama_status],
        }))

        return ( 
            <DetailParticipantComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdPeserta,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailParticipantPage);
export default page