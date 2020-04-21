import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Button, Input, Icon, Divider} from 'antd'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import  * as Highlighter from 'react-highlight-words';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { navigate } from '../../../common/store/action'
import BiodataPenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/biodata-penandatangan-component';
import ButtonEdit from '../../../common/component/button/button-edit';

const {confirm} = Modal;

class BiodataPenandatanganAdminPage extends Component {
    state = { 
        penandatangan: [],
        loading : false,
    }

    componentDidMount(){
         this.getBiodata();
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

    //add penandatangan
    addPenandatangan = (id_biodata_penandatangan) => {
        console.log(id_biodata_penandatangan)
        this.setState({loading: true})
        API.post(`/admin/addpenandatangan`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('Event berhasil di approve');
                this.componentDidMount(); 
            }   
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
                console.log("ini id", id)
                this.addPenandatangan(id)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //add penandatangan
    addPenandatangan = (id) => {
        // e.preventDefault();

        const params = {
            id_biodata_penandatangan: id,  
        }
        console.log('params',params)
        this.setState({loading: true})
        API.post(`/admin/addpenandatangan`,params)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('Berhasil menambahkan penandatangan');
                // this.componentDidMount(); 
                this.props.navigate(CONSTANS.BIODATA_PENANDATANGAN_ADMIN_KEY)
            }  
            this.setState({loading: false}) 
        });
    }


    render() {  
        const columns = [
            {
                title: 'No',
                dataIndex: 'nomor',
                key: 'nomor',
                render: text => <a>{text}</a>,
                sorter: (a, b) => a.no - b.no,
                sortDirections: ['ascend','descend'],
            },
            {
                title: 'Nama Penandatangan',
                dataIndex: 'nama',
                key: 'nama',
                ...this.getColumnSearchProps('nama'),
            },
            {
                title: 'Instansi',
                dataIndex: 'instansi',
                key: 'instansi',
                ...this.getColumnSearchProps('instansi'),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                ...this.getColumnSearchProps('email'),
            },
            {
                title: 'Jabatan',
                dataIndex: 'jabatan',
                key: 'jabatan',
                ...this.getColumnSearchProps('jabatan'),
            },
            {
                title: 'NIP',
                dataIndex: 'nip',
                key: 'nip',
                ...this.getColumnSearchProps('nip'),
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonEdit
                    text="Add"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick= {()=> this.showAddConfirm(data.nomor)}
                />,
                <Divider type="vertical" />,
                <ButtonEdit
                    text="Reject"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FF0303"
                    marginRight= "20px"
                    onClick= {()=> this.showAddConfirm(data.nomor)}
                />]
              ),
            },
        ];
        
        const data =  this.state.penandatangan.map( ({id_biodata_penandatangan, nama, instansi, jabatan,email,nip}, index) => ({
            no : index+1,
            nomor : id_biodata_penandatangan,
            nama: nama,
            email : email,
            instansi : instansi,
            jabatan : jabatan,
            nip : nip,
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