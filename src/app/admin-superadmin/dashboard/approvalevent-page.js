import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { Modal, Tag, Divider,message} from 'antd'
import CONSTANS from '../../../common/utils/Constants'
import { faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { navigate } from '../../../common/store/action'
import ApprovalEventComponent from '../../../modules/admin-superadmin/user/panitia/approval-event-component';

// import store
import {  setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

const { confirm } = Modal;

class ApprovalEventPage extends Component {
    state = {
        approvalevent : [],
        loading : false,
    }

    componentDidMount(){
        this.getApprovalEvent();
    }

    getApprovalEvent = () => {
         this.setState({loading: true})
         API.get(`/admin/approve/event`)
         .then(res => {
           console.log('res',res)
           this.setState({
             approvalevent:res.data.data.event,
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

    //delete event
    approveEvent = (id_event) => {
        console.log(id_event)
        this.setState({loading: true})
        API.put(`/admin/approvalevent/${id_event}/acc`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('Event berhasil di approve');
                this.componentDidMount(); 
            }   
        });
    }
    
    //function untuk modal
    showAcceptConfirm = (id) => {
        confirm({
            title: ' Apakah yakin untuk approve event ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.approveEvent(id)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }
    
    //function untuk modal
    showRejectConfirm = (id) => {
        confirm({
            title: ' Apakah yakin untuk menolak peserta ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               // this.deleteEvent(id)
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
                title: 'Nama Event',
                dataIndex: 'nama_event',
                key: 'nama_event',
                render: text => <a>{text}</a>,
                onFilter: (value, record) => record.nama_event.indexOf(value) === 0,
                sorter: (a, b) => a.nama_event.length - b.nama_event.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Panitia',
                dataIndex: 'panitia',
                key: 'panitia',
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
                    // text="Approve"
                    height={20}
                    icon={faCheckCircle}
                    borderRadius="5px"
                    background="#00C908"
                    onClick = { () => this.showAcceptConfirm(data.nomor)}
                />,
                <Divider type="vertical" />,
                <ButtonDashboard
                    // text="Reject"
                    height={20}
                    icon={faWindowClose}
                    borderRadius="5px"
                    background="#FF0303"
                    onClick = { () => this.showRejectConfirm(data.nomor)}
                />, <Divider type="vertical" />,
                <ButtonDashboard
                    // text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick = { () => this.onDetailEvent(data.nomor)}
                
                />]
              ),
            },
          ];
       
           
        const data =  this.state.approvalevent.map( ({id_event, nama_event,detail_event,kategori,panitia}, index) => ({
            no : index+1,
            nomor : id_event,
            nama_event: nama_event,
            panitia : panitia.nama_panitia,
            start_event :detail_event.start_event,
            lokasi : detail_event.lokasi,
            kategori : [kategori.nama_kategori],
            end_event : detail_event.end_event,
        }))

        return ( 
            <ApprovalEventComponent
                navigate={this.props.navigate}
                initialData={this.state}
                data={data}
                columns={columns}
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

const page = connect(mapStateToProps, mapDispatchToProps)(ApprovalEventPage);
export default page