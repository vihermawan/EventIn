import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { Modal, message } from 'antd'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import ListPanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/listpanitia-component';
//component
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdPanitia } from '../../../modules/admin-superadmin/user/panitia/store/panitia-action'
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'

const { confirm } = Modal;

class ListPanitiaAdminPage extends Component {
    state = { 
        panitia: [],
        loading: false,
    }

    componentDidMount(){
        this.getPanitia();
    }

    getPanitia=()=>{
        this.setState({loading: true})
        API.get(`/admin/showpanitia`)
        .then(res => {
          this.setState({
            panitia:res.data.data.panitia,
            loading: false,
          })
        });
    }

    //delete panitia
    deletePanitia = (id_panitia) => {   
        console.log(id_panitia)
        API.delete(`/admin/deletepanitia/${id_panitia}`)
        .then(res => {
            // console.log('res',res)
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
                console.log('id ini',id)
                this.deletePanitia(id)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //button detail event
    onDetailPanitia = (id_users,id_panitia) => {
        console.log('id ini',id_users,id_panitia)
        this.props.setIdUsers(id_users)
        this.props.setIdPanitia(id_panitia)
        this.props.navigate(CONSTANS.DETAIL_PANITIA_ADMIN_MENU_KEY)
    }

    onEditPanitia = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PANITIA_ADMIN_MENU_KEY)
    }

    onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
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
                title: 'Nama Panitia',
                dataIndex: 'panitia',
                key: 'panitia',
                render: text => <a>{text}</a>,
                onFilter: (value, record) => record.panitia.indexOf(value) === 0,
                sorter: (a, b) => a.panitia.length - b.panitia.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
                sorter: (a, b) => a.organisasi.length - b.organisasi.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'No Telepon',
                dataIndex: 'no_telepon',
                key: 'no_telepon',
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
                    //     onClick = { () => this.onEditPanitia(data.id_users)}
                    // />,
                    <ButtonDashboard
                        text="Detail"
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        marginRight= "20px"
                        onClick = { () => this.onDetailPanitia(data.id_users,data.id_panitia)}
                    />,
                    <ButtonDashboard
                        text="Delete"
                        height={20}
                        icon={faTrash}
                        borderRadius="5px"
                        background="#FF0303"
                        onClick = { () => this.showDeleteConfirm(data.id_panitia)}
                    />]
              ),
            },
          ];

        const data =  this.state.panitia.map( ({id_users, panitia,email}, index) => ({
            no : index+1,
            id_panitia : panitia.id_panitia,
            id_users : id_users,
            panitia : panitia.nama_panitia,
            email : email,
            organisasi : panitia.organisasi,
            no_telepon : panitia.no_telepon,
        }))
        
        

        return ( 
            <ListPanitiaAdminComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
                onChange={this.onChange()}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdPanitia,
    setIdUsers,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ListPanitiaAdminPage);
export default page