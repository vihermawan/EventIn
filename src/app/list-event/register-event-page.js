import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import { API } from '../../common/api'
import { Divider, Tooltip } from 'antd';
import { faInfoCircle, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import RegisterEventComponent from '../../modules/list-event/component/register-event-component';
import ButtonDashboard from '../../common/component/button/button-dashboard';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';

class RegisterEventPage extends Component {
    state = {
        loadingHome :false,
        registerEvent : [],
    }

    componentDidMount(){
        this.getEventRegister();
    }

    //get data dari API
    getEventRegister=()=>{
        this.setState({loadingHome: true})
        API.get(`/peserta/register-event`)
        .then(res => {
            console.log('res',res)
            this.setState({
                registerEvent:res.data.data.event,
                loadingHome: false,
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
                sorter: (a, b) => a.no - b.no,
                sortDirections: ['ascend','descend'],
            },
            {
                title: 'Nama Event',
                dataIndex: 'nama_event',
                key: 'nama_event',
            },
            {
                title: 'Panitia',
                dataIndex: 'nama_panitia',
                key: 'nama_panitia',
            },
            {
                title: 'Tempat',
                dataIndex: 'lokasi',
                key: 'lokasi',
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
                [
                <Tooltip title="Cancel Register">
                <ButtonDashboard
                    height={20}
                    icon={faUserCheck}
                    borderRadius="5px"
                    background="#4D5AF2"
                    onClick={ () => this.onAbsentParticipant(data.nomor)}
                />,
                </Tooltip>,
                <Divider type="vertical" />,
                <Tooltip title="Detail Event">
                    <ButtonDashboard
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        onClick={ () => this.onDetailEvent(data.id_event)}
                    />,
                </Tooltip>,
                ]
              ),
            },
        ];

        const data =  this.state.registerEvent.map( ({id_peserta, id_event, event}, index) => ({
            no: index+1,
            id_peserta : id_peserta,
            id_event : id_event,
            nama_event : event.nama_event,
            lokasi : event.detail_event.lokasi,
            nama_panitia : event.panitia.nama_panitia,
            organisasi : event.organisasi,
            start_event :  moment(event.detail_event.start_event).format("DD MMMM YYYY"),
            end_event : moment(event.detail_event.end_event).format("DD MMMM YYYY"),
        }))

        return ( 
            <RegisterEventComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data = {data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(RegisterEventPage);
export default page