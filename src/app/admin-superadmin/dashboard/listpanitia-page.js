import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { Modal } from 'antd'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import ListPanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/listpanitia-component';
//component
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdPanitia } from '../../../modules/admin-superadmin/user/panitia/store/panitia-action'

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
          console.log('res',res.data.data.panitia)
          this.setState({
            panitia:res.data.data.panitia,
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

    //button detail event
    onDetailPanitia = (id) => {
        console.log('id ini',id)
        this.props.setIdPanitia(id);
        this.props.navigate(CONSTANS.DETAIL_PANITIA_ADMIN_MENU_KEY)
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
                title: 'Nama Panitia',
                dataIndex: 'panitia',
                key: 'panitia',
                render: text => <a>{text}</a>,
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
                    [<ButtonDashboard
                        text="Edit"
                        height={20}
                        icon={faPen}
                        borderRadius="5px"
                        background="#005568"
                        marginRight= "20px"
                    />,
                    <ButtonDashboard
                        text="Detail"
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        marginRight= "20px"
                        onClick = { () => this.onDetailPanitia(data.nomor)}
                    />,
                    <ButtonDashboard
                        text="Delete"
                        height={20}
                        icon={faTrash}
                        borderRadius="5px"
                        background="#FF0303"
                        onClick = { () => this.showDeleteConfirm(data.nomor)}
                    />]
              ),
            },
          ];

        const data =  this.state.panitia.map( data => ({
            nomor : data.id_users,
            panitia : data.panitia.nama_panitia,
            email : data.email,
            organisasi : data.panitia.organisasi,
            no_telepon : data.panitia.no_telepon,
        }))
        
        function onChange(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }

        return ( 
            <ListPanitiaAdminComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
                onChange={onChange}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdPanitia,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ListPanitiaAdminPage);
export default page