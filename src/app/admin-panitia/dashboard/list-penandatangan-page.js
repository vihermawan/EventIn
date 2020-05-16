import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Icon } from 'antd'
import  * as Highlighter from 'react-highlight-words'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ListPenandatanganComponent from '../../../modules/admin-panitia/list-penandatangan/list-penandatangan-component';

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
          this.setState({
              penandatangan:res.data.data.penandatangan,
              loading: false,
            })
        });
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
            sorter: (a, b) => a.no - b.no,
            sortDirections: ['ascend','descend'],
        },
        {
            title: 'Nama Penandatangan',
            dataIndex: 'nama_penandatangan',
            key: 'nama_penandatangan',
            ...this.getColumnSearchProps('nama_penandatangan'),
        },
        {
            title: 'Instansi',
            dataIndex: 'instansi',
            key: 'instansi',
            ...this.getColumnSearchProps('instansi'),
        },
        {
            title: 'Jabatan',
            dataIndex: 'jabatan',
            key: 'jabatan',
            ...this.getColumnSearchProps('jabatan'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...this.getColumnSearchProps('email'),
        },
        {
            title: 'Nomor Induk Pegawai',
            dataIndex: 'nip',
            key: 'nip',
            ...this.getColumnSearchProps('nip'),
        },
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