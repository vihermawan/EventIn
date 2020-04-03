import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Tag, Divider, Tooltip } from 'antd'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
//import component
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import CountRegistEventComponent from '../../../modules/admin-panitia/count-regist-event/count-regist-event-component';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

class CountRegistEventPage extends Component {
    state = {  
        registEvent: [],
        loading: false,
    }
    
    componentDidMount(){
        this.getRegistEvent();
    }

    //get data dari API
    getRegistEvent=()=>{
        this.setState({loading: true})
        API.get(`/panitia/countRegister`)
        .then(res => {
            console.log('res',res)
            this.setState({
                registEvent:res.data.data.event,
                loading: false,
            })
        });
    }


    //button detail participant
    onListParticipant = (id_event) => {
        console.log('id ini',id_event)
        this.props.setIdEvent(id_event);
        this.props.navigate(CONSTANS.LIST_PARTICIPANT_EVENT_MENU_KEY)
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
                title: 'Pendaftar',
                dataIndex: 'pendaftar',
                key: 'pendaftar',
            },
            {
                title: 'Diterima',
                dataIndex: 'diterima',
                key: 'diterima',
            },
            {
                title: 'Kuota',
                dataIndex: 'kuota',
                key: 'kuota',
            },
            {
                title: 'Sisa',
                dataIndex: 'sisa',
                key: 'sisa',
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [
                <Tooltip title="Participant">
                <ButtonDashboard
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#4D5AF2"
                    onClick={ () => this.onListParticipant(data.id_event)}
                />,
                </Tooltip>
                ]
              ),
            },
          ];

          const data =  this.state.registEvent.map( ({id_event, terdaftar, diterima, event}, index) => ({
            no: index+1,
            id_event : id_event,
            nama_event : event.nama_event,
            organisasi : event.organisasi,
            pendaftar : terdaftar,
            diterima : diterima,
            kuota : event.detail_event.limit_participant,
            sisa : (event.detail_event.limit_participant) - (diterima)
        }))
        
        return ( 
            <CountRegistEventComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
            />
            
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(CountRegistEventPage);
export default page