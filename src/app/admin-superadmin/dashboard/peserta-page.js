import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message } from 'antd'
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import { navigate } from '../../../common/store/action'
import PesertaAdminComponent from '../../../modules/admin-superadmin/user/peserta/peserta-component';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'
import { setIdPeserta } from '../../../modules/admin-superadmin/user/peserta/store/peserta-action'

const { confirm } = Modal;

class PesertaAdminPage extends Component {
    state = { 
        peserta : [],
        loading: false,
    }

    componentDidMount(){
        this.getPeserta();
    }

    getPeserta=()=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta`)
        .then(res => {
          console.log('res',res.data.data.user)
          this.setState({
            peserta:res.data.data.user,
            loading: false,
          })
        });
    }

    //delete peserta
    deletePeserta = (id_peserta) => {   
        console.log(id_peserta)
        API.delete(`/admin/deletepeserta/${id_peserta}`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('This is a success message');
                this.componentDidMount(); 
            }   
        });
    }

    //button detail event
    onDetailPeserta = (id_users,id_peserta) => {
        console.log('id users ini',id_users,id_peserta)
        this.props.setIdUsers(id_users)
        this.props.setIdPeserta(id_peserta)
        this.props.navigate(CONSTANS.DETAIL_PESERTA_ADMIN_MENU_KEY)
    }

    onEditPeserta = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PROFILE_PESERTA_MENU_KEY)
    }

    //function untuk modal
    showDeleteConfirm = (id) => {
        confirm({
            title: ' Apakah yakin untuk menghapus data ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.deletePeserta(id)
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
                dataIndex: 'peserta',
                key: 'peserta',
                render: text => <a>{text}</a>,
                onFilter: (value, record) => record.peserta.indexOf(value) === 0,
                sorter: (a, b) => a.peserta.length - b.peserta.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'email',
            },
            {
                title: 'Jenis Kelamin',
                dataIndex: 'jenis_kelamin',
                key: 'jenis_kelamin',
            },
            {
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
            },
            {
                title: 'Umur',
                dataIndex: 'umur',
                key: 'umur',
            },
            {
                title: 'Action',
                key: 'action',
                render: (data) => (
                    [<ButtonDashboard
                        text="Edit"
                        height={20}
                        icon={faPen}
                        borderRadius="5px"
                        background="#005568"
                        marginRight= "20px"
                        onClick = { () => this.onEditPeserta(data.id_users)}
                    />,
                    <ButtonDashboard
                        text="Detail"
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        marginRight= "20px"
                        onClick = { () => this.onDetailPeserta(data.id_users,data.id_peserta)}
                    />,
                    <ButtonDashboard
                        text="Delete"
                        height={20}
                        icon={faTrash}
                        borderRadius="5px"
                        background="#FF0303"
                        onClick = { () => this.showDeleteConfirm(data.id_peserta)}
                    />]
              ),
            },
          ];
        const data =  this.state.peserta.map( ({id_users, peserta,email}, index) => ({
            no : index+1,
            id_users : id_users,
            id_peserta : peserta.id_peserta,
            peserta : peserta.nama_peserta,
            email : email,
            organisasi : peserta.organisasi,
            umur : peserta.umur,
            jenis_kelamin : peserta.jenis_kelamin,
        }))
                
        return ( 
            <PesertaAdminComponent
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
    setIdPeserta,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(PesertaAdminPage);
export default page