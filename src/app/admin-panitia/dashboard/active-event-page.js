import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Tag } from 'antd'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ActiveEventComponent from '../../../modules/admin-panitia/active-event/active-event-component';
import CONSTANS from '../../../common/utils/Constants'

//import component
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons' 
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { getData, setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

const { confirm } = Modal;

class ActiveEventPage extends Component {
    state = {  
        activeEvent: [],
        loading: false,
    }
    
    componentDidMount(){
        this.getEvent();
    }

    //get data dari API
    getEvent=()=>{
        this.setState({loading: true})
        API.get(`/panitia/event`)
        .then(res => {
            console.log('res',res.data.data.event)
            this.setState({
                activeEvent:res.data.data.event,
                loading: false,
            })
        });
    }

    //delete event
    deleteEvent = (id) => {
        console.log(id)
        API.delete(`/panitia/deleteevent/${id}`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('This is a success message');
                window.location.reload(); 
            }   
        });
    }

    //function untuk modal
    showDeleteConfirm = (id) => {
        confirm({
            title: 'Yakin untuk mendelete ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.deleteEvent(id)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //button detail participant
    onDetailParticipant = (id) => {
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.PARTICIPANT_EVENT_MENU_KEY)
    }

    //button detail event
    onDetailEvent = (id) => {
        console.log('id ini',id)
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_PANITIA_MENU_KEY)
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
                    text="Participant"
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#4D5AF2"
                    marginRight= "20px"
                    onClick={ () => this.onDetailParticipant(data.nomor)}
                />,
                <ButtonDashboard
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
        
        const data =  this.state.activeEvent.map( data => ({
                    nomor : data.id_event,
                    nama_event: data.nama_event,
                    start_event :data.detail_event.start_event,
                    lokasi : data.detail_event.lokasi,
                    kategori : [data.kategori.nama_kategori],
                    end_event : data.detail_event.end_event,
        }))
    
        return ( 
            <ActiveEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ActiveEventPage);
export default page