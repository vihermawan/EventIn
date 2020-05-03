import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal, message,Button, Input, Icon,notification,Divider } from 'antd'
import { API } from '../../../common/api'
import  * as Highlighter from 'react-highlight-words';
import ButtonEdit from '../../../common/component/button/button-edit';
import { navigate } from '../../../common/store/action'
import * as validation from '../../../common/utils/validation'
import KategoriMasterComponent from '../../../modules/admin-superadmin/data-master/kategori-component';

const {confirm} = Modal;

class KategoriMasterPage extends Component {
    state = {  
        kategori: [],
        nama_kategori : '',
        edit_kategori : '',
        id_kategori : '',
        loading : false,
        visible: false,
        show : false,
    }

    componentDidMount(){
        this.getKategori();
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

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

    showModal = () => {
        this.setState({
          visible: true,
        });
    };

    showModal2 = (id,nama) => {
        console.log(id,nama)
        this.setState({
          show: true,
          edit_kategori : nama,
          id_kategori : id,
        });
    };

    handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }
    
    handleOk = e => {
        e.preventDefault();
        const params = new FormData()
        params.set('nama_kategori', this.state.nama_kategori)

        if(validation.required(this.state.nama_kategori) != null ){
            const message = validation.required(this.state.nama_kategori);
            this.openNotification(message, 'Nama Kategori harus ditulis')
        }else{
            this.setState({loading: true})
            API.post(`/admin/addkategori`, params)
        .then(res => {
            console.log('res',res)
            if(res.status == 201){
                message.success('Kategori Berhasil Ditambahkan');
                this.setState({
                    visible: false,
                });
                this.setState({loading: false})
                this.componentDidMount();
            }else{
                this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                this.setState({loading: false})
            }
        });
        }
       
    };

    handleEdit = () => {
        console.log(this.state.id_kategori)
            const params = new FormData()
            params.append('_method','PUT')
            params.set('nama_kategori', this.state.edit_kategori)

            if(validation.required(this.state.edit_kategori) != null ){
                const message = validation.required(this.state.edit_kategori);
                this.openNotification(message, 'Nama Kategori harus ditulis')
            }else{
                this.setState({loading: true})
                API.postEdit(`/admin/editkategori/${this.state.id_kategori}`, params)
            .then(res => {
                console.log('res',res)
                if(res.status == 200){
                    message.success('Kategori Berhasil Diubah');
                    this.setState({
                        show: false,
                    });
                    this.setState({loading: false})
                    this.componentDidMount();
                }else{
                    this.openNotification('Data Salah', 'Silahkan isi data dengan benar')
                    this.setState({loading: false})
                }
            });
        }
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            show:false,
        });
    };
    
    //delete kategori
    deleteKategori = (id) => {   
        console.log(id)
        this.setState({loading:true})
        API.delete(`/admin/deletekategori/${id}`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('Berhasil Menghapus Kategori');
                this.componentDidMount();
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

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    render() { 
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                key: 'no',
                render: text => <a>{text}</a>,
                sorter: (a, b) => a.no - b.no,
                sortDirections: ['ascend','descend'],
            },
            {
                title: 'Nama Kategori',
                dataIndex: 'nama_kategori',
                key: 'nama_kategori',
                ...this.getColumnSearchProps('nama_kategori'),
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonEdit
                    text="Edit"
                    height={20}
                    icon={faPen}
                    borderRadius="5px"
                    background="#005568"
                    onClick = { () => this.showModal2(data.nomor,data.nama_kategori)}
                />,
                <Divider type="vertical" />,
                <ButtonEdit
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
                handleCancel = {this.handleCancel}
                handleOk = {this.handleOk}
                showModal = {this.showModal}
                handleChange={this.handleChange}
                handleEdit = {this.handleEdit}
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