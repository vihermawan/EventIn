import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal, message } from 'antd'
import { API } from '../../../common/api'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { navigate } from '../../../common/store/action'
import KategoriMasterComponent from '../../../modules/admin-superadmin/data-master/kategori-component';

const {confirm} = Modal;

class KategoriMasterPage extends Component {
    state = {  
        kategori: [],
        loading : false,
    }

    componentDidMount(){
        this.getKategori();
    }

    //get data dari API
    getKategori=()=>{
      this.setState({loading: true})

      API.get(`/admin/kategori`)
      .then(res => {
          console.log('res',res)
          this.setState({
              kategori:res.data.data.kategori,
              loading: false,
          })
      });
    }

    
    //delete kategori
    deleteKategori = (id) => {   
        console.log(id)
        API.delete(`/admin/deletekategori/${id}`)
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
               this.deleteKategori(id)
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
              title: 'Nama Kategori',
              dataIndex: 'nama_kategori',
              key: 'nama_kategori',
              render: text => <a>{text}</a>,
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
                    text="Delete"
                    height={20}
                    icon={faTrash}
                    borderRadius="5px"
                    background="#E11212"
                    onClick = { () => this.showDeleteConfirm(data.nomor)}
                />]
              ),
            },
          ];

        const data =  this.state.kategori.map( ({id_kategori, nama_kategori}, index) => ({
            no : index+1,
            nomor : id_kategori,
            nama_kategori: nama_kategori,
        }))

        return ( 
            <KategoriMasterComponent
                navigate={this.props.navigate}
                initialData={this.state}
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