import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message } from 'antd'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
//component
import PenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/penandatangan-component';
import { faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

//import store
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'

const {confirm} = Modal;


class PenandatanganAdminPage extends Component {
    state = { 
        penandatangan: [],
        loading: false,
     }

     componentDidMount(){
        this.getPenandatangan();
    }

    

    getPenandatangan=()=>{
        this.setState({loading: true})
        API.get(`/admin/showpenandatangan`)
        .then(res => {
          console.log('res',res.data.data.penandatangan)
          this.setState({
            penandatangan:res.data.data.penandatangan,
            loading: false,
          })
        });
    }

     //delete penandatangan
     deletePenandatangan = (id_penandatangan) => {   
        console.log(id_penandatangan)
        API.delete(`/admin/deletepenandatangan/${id_penandatangan}`)
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
            title: ' Apakah yakin untuk menghapus data ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                console.log('id ini', id)
                this.deletePenandatangan(id)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //detail Penandatangan
    onDetailPenandatangan = (id_users) => {
        this.props.setIdUsers(id_users)
        console.log('id users',id_users)
        this.props.navigate(CONSTANS.DETAIL_PENANDATANGAN_ADMIN_MENU_KEY)
    }

    //edit penandatangan.
    onEditPenandatangan = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PENANDATANGAN_ADMIN_MENU_KEY)
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
                title: 'Nama Penandatangan',
                dataIndex: 'penandatangan',
                key: 'penandatangan',
                render: text => <a>{text}</a>,
            },
            {
                title: 'NIP',
                dataIndex: 'nip',
                key: 'nip',
            },
            {
                title: 'Instansi',
                dataIndex: 'instansi',
                key: 'instansi',
            },
            {
                title: 'Jabatan',
                dataIndex: 'jabatan',
                key: 'jabatan',
            },
            {
                title: 'Action',
                key: 'action',
                render: (data) => (
                    [ 
                    // <ButtonDashboard
                    //     text="Edit"
                    //     height={20}
                    //     icon={faPen}
                    //     borderRadius="5px"
                    //     background="#005568"
                    //     marginRight= "20px"
                    //     onClick = { () => this.onEditPenandatangan(data.id_users)}
                    // />,
                    <ButtonDashboard
                        text="Detail"
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        marginRight= "20px"
                        onClick = { () => this.onDetailPenandatangan(data.id_users)}
                    />,
                    <ButtonDashboard
                        text="Delete"
                        height={20}
                        icon={faTrash}
                        borderRadius="5px"
                        background="#E11212"
                        onClick = {() => this.showDeleteConfirm(data.id_penandatangan)}
                    />]
              ),
            },
          ];

        const data =  this.state.penandatangan.map(  ({id_users, penandatangan}, index) => ({
            no : index+1,
            id_users : id_users,
            id_penandatangan : penandatangan.id_penandatangan,
            penandatangan : penandatangan.nama_penandatangan,
            instansi : penandatangan.instansi,
            jabatan : penandatangan.jabatan,
            nip : penandatangan.nip,
        }))

        return ( 
            <PenandatanganAdminComponent
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
    setIdUsers,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(PenandatanganAdminPage);
export default page