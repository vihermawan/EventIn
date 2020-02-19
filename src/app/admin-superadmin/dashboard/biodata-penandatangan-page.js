import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Tag } from 'antd'
import { API } from '../../../common/api'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { navigate } from '../../../common/store/action'
import BiodataPenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/biodata-penandatangan-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

const {confirm} = Modal;

class BiodataPenandatanganAdminPage extends Component {
    state = { 
        penandatangan: [],
        loading : false,
     }

     componentDidMount(){
         this.getBiodata();
     }

    //get data dari API
    getBiodata=()=>{
        this.setState({loading: true})

        API.get(`/admin/showbiodatapenandatangan`)
        .then(res => {
            console.log('res',res)
            this.setState({
                penandatangan:res.data.data.biodata,
                loading: false,
            })
        });
    }

    //function untuk modal
    showAddConfirm = (id) => {
        confirm({
            title: 'Yakin untuk menambah data ?',
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
                dataIndex: 'nomor',
                key: 'nomor',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Nama Penandatangan',
                dataIndex: 'nama',
                key: 'nama',
                render: text => <a>{text}</a>,
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
                title: 'NIK',
                dataIndex: 'nik',
                key: 'nik',
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                [<ButtonDashboard
                    text="Add"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    marginRight= "20px"
                    onClick= {()=> this.showAddConfirm()}
                />]
              ),
            },
          ];
        
        const data =  this.state.penandatangan.map( data => ({
            nomor : data.id_biodata_penandatangan,
            nama: data.nama,
            instansi : data.instansi,
            jabatan : data.jabatan,
            nik : data.nik,
        }))
    
    
        return ( 
            <BiodataPenandatanganAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(BiodataPenandatanganAdminPage);
export default page