import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Tag,Divider, message } from 'antd'
import { faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ListPenandatanganComponent from '../../../modules/admin-panitia/list-penandatangan/list-penandatangan-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';


const { confirm } = Modal;

class ListPenandatanganPage extends Component {
    state = { 
        penandatangan: [],
        loading : false,
    }

    componentDidMount(){
        this.getPenandatangan();
    }

    getPenandatangan=()=>{
        this.setState({loading: true})
        API.get(`/panitia/list-penandatangan`)
        .then(res => {
          console.log('res',res.data.data)
          this.setState({
              penandatangan:res.data.data.penandatangan,
              loading: false,
            })
        });
    }

    onCreatePenandatangan = () => {
        this.props.navigate(CONSTANS.CREATE_BIODATA_PENANDATNAGAN_MENU_KEY)
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
            dataIndex: 'nama_penandatangan',
            key: 'nama_penandatangan',
            render: text => <a>{text}</a>,
            onFilter: (value, record) => record.nama_peserta.indexOf(value) === 0,
            sorter: (a, b) => a.nama_peserta.length - b.nama_peserta.length,
            sortDirections: ['descend'],
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nomor Induk Pegawai',
            dataIndex: 'nip',
            key: 'nip',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (data) => (
        //     [<ButtonDashboard
        //         text="Detail"
        //         height={20}
        //         icon={faCheckCircle}
        //         borderRadius="5px"
        //         background="#00C908"
        //         onClick={ () => this.showAcceptConfirm(data.nomor)}
        //     />]
        //     ),
        // },
    ];

    const data =  this.state.penandatangan.map( ({id_users, penandatangan,email}, index) => ({
        no : index+1,
        id_users : id_users,
        nama_penandatangan : penandatangan.nama_penandatangan,
        email : email,
        instansi : penandatangan.instansi,
        nip : penandatangan.nip,
        jabatan : penandatangan.jabatan,
    }))
    
        return ( 
            <ListPenandatanganComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
                onCreatePenandatangan = {this.onCreatePenandatangan}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ListPenandatanganPage);
export default page