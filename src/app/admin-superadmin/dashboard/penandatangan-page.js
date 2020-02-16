import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message } from 'antd'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
//component
import PenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/penandatangan-component';
import { faUsers, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

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
                title: 'NIK',
                dataIndex: 'nik',
                key: 'nik',
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
                render: () => (
                    [<ButtonDashboard
                        text="Edit"
                        height={20}
                        icon={faPen}
                        borderRadius="5px"
                        background="#005568"
                        marginRight= "20px"
                    />,
                    <ButtonDashboard
                        text="Delete"
                        height={20}
                        icon={faTrash}
                        borderRadius="5px"
                        background="#E11212"
                        onClick = {() => this.showDeleteConfirm()}
                    />]
              ),
            },
          ];

        const data =  this.state.penandatangan.map(  ({id_users, penandatangan}, index) => ({
            no : index+1,
            nomor : id_users,
            penandatangan : penandatangan.nama_penandatangan,
            instansi : penandatangan.instansi,
            jabatan : penandatangan.jabatan,
            nik : penandatangan.nik,
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
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(PenandatanganAdminPage);
export default page