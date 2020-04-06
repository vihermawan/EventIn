import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import {  Tooltip } from 'antd'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons' 
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import DetailListParticipantbyHistoryEvent from '../../../modules/admin-panitia/detail-list-participant-byEvent/detail-list-participant-byHistoryEvent-component';

class DetailListParticipantbyHistoryEventPage extends Component {
    state = {
        loading :false,
        listParticipant : [],
    }

    componentDidMount(){
        this.getListPesertabyEvent(this.props.idEvent)
    }

    //get data dari API
    getListPesertabyEvent=(id_event)=>{
        this.setState({loading: true})
        API.get(`/panitia/pesertabyEvent/${id_event}`)
        .then(res => {
            console.log('res',res.data.data.peserta)
            this.setState({
                listParticipant:res.data.data.peserta,
                loading: false,
            })
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
                onFilter: (value, record) => record.nama_event.indexOf(value) === 0,
                sorter: (a, b) => a.nama_event.length - b.nama_event.length,
                sortDirections: ['descend'],
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
                title: 'Pekerjaan',
                dataIndex: 'pekerjaan',
                key: 'pekerjaan',
              },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [
                <Tooltip title="Detail">
                <ButtonDashboard
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick={ () => this.onAbsentParticipant(data.nomor)}
                />,
                </Tooltip>,]
              ),
            },
          ];

        const data =  this.state.listParticipant.map( ({id_peserta, peserta, event}, index) => ({
            no: index+1,
            id_peserta : id_peserta,
            nama_peserta : peserta.nama_peserta,
            organisasi  :peserta.organisasi,
            jenis_kelamin : peserta.jenis_kelamin,
            pekerjaan : peserta.pekerjaan,
            umur : peserta.umur,
            nama_event : event.nama_event,
            email : peserta.users.email,
            no_telefon : peserta.no_telefon
        }))
        

        return ( 
            <DetailListParticipantbyHistoryEvent
                initialData={this.state}
                navigate={this.props.navigate}
                columns = {columns}
                data = {data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailListParticipantbyHistoryEventPage);
export default page