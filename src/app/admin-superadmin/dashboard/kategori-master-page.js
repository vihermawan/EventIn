import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal, message } from 'antd'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { navigate } from '../../../common/store/action'
import KategoriMasterComponent from '../../../modules/admin-superadmin/data-master/kategori-component';

const {confirm} = Modal;

class KategoriMasterPage extends Component {
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


    render() { 
        const columns = [
            {
                title: 'No',
                dataIndex: 'Nomor',
                key: 'Nomor',
                render: text => <a>{text}</a>,
            },
            {
              title: 'Nama Kategori',
              dataIndex: 'nama_kategori',
              key: 'nama_kategori',
              render: text => <a>{text}</a>,
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
                    onClick = { () => this.showDeleteConfirm()}
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
            <KategoriMasterComponent
                navigate={this.props.navigate}
                columns={columns}
                data ={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(KategoriMasterPage);
export default page