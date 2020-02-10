import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message } from 'antd'
import { faUsers, faTrash, faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { navigate } from '../../../common/store/action'
import ApprovalEventComponent from '../../../modules/admin-superadmin/user/panitia/approval-event-component';

const { confirm } = Modal;

class ApprovalEventPage extends Component {
    state = {  }

    //function untuk modal
    showDeleteConfirm = (id) => {
        confirm({
            title: ' Apakah yakin untuk menghapus data ?',
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

    
    //function untuk modal
    showAcceptConfirm = (id) => {
        confirm({
            title: ' Apakah yakin untuk approve peserta ?',
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
                dataIndex: 'Nomor',
                key: 'Nomor',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Nama Event',
                dataIndex: 'Nama_Event',
                key: 'Nama_Event',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Tempat',
                dataIndex: 'tanggal_event',
                key: 'tanggal_event',
            },
            {
                title: 'Jabatan',
                dataIndex: 'tanggal_event',
                key: 'tanggal_event',
            },
            {
                title: 'Jenis Kelamin',
                dataIndex: 'tanggal_event',
                key: 'tanggal_event',
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                [<ButtonDashboard
                    text="Approve"
                    height={20}
                    icon={faCheckCircle}
                    borderRadius="5px"
                    background="#00C908"
                    marginRight= "20px"
                    onClick = { () => this.showAcceptConfirm()}
                />,
                <ButtonDashboard
                    text="Reject"
                    height={20}
                    icon={faWindowClose}
                    borderRadius="5px"
                    background="#FF0303"
                    marginRight= "20px"
                    onClick = { () => this.showRejectConfirm()}
                />,
                <ButtonDashboard
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                
                />]
              ),
            },
          ];
        const data = [
            {
              key: '1',
              Nomor : '1',
              Nama_Event: 'UGMTalks',
              tanggal_event :'2020-10-11',
            },
          ];

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
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ApprovalEventPage);
export default page