import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
//component
import PenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/penandatangan-component';
import { faUsers, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

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

    render() { 
        const columns = [
            {
                title: 'No',
                dataIndex: 'nomor',
                key: 'nomor',
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
                title: 'Jenis Kelamin',
                dataIndex: 'jenis_kelamin',
                key: 'jenis_kelamin',
            },
            {
                title: 'Action',
                key: 'action',
                render: () => (
                    [<ButtonDashboard
                        text="Detail"
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        marginRight= "20px"
                    />,
                    <ButtonDashboard
                        text="Delete"
                        height={20}
                        icon={faTrash}
                        borderRadius="5px"
                        background="#E11212"
                    />]
              ),
            },
          ];

        const data =  this.state.penandatangan.map( data => ({
            nomor : data.id_users,
            penandatangan : data.penandatangan.nama_penandatangan,
            instansi : data.penandatangan.instansi,
            jabatan : data.penandatangan.jabatan,
            nik : data.penandatangan.nik,
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