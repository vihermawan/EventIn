import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import { Button, Input, Icon, Divider } from 'antd'
import  * as Highlighter from 'react-highlight-words';
import BannedPesertaComponent from '../../../modules/admin-superadmin/banned-page/banned-peserta-component';

//component
import { faInfoCircle,faBan  } from '@fortawesome/free-solid-svg-icons'
import ButtonEdit from '../../../common/component/button/button-edit';

class BannedPesertaPage extends Component {
    state = {
        
    }

    componentDidMount(){
      
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
                title: 'Nama Peserta',
                dataIndex: 'peserta',
                key: 'peserta',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'email',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
                title: 'Jenis Kelamin',
                dataIndex: 'jenis_kelamin',
                key: 'jenis_kelamin',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
                title: 'Umur',
                dataIndex: 'umur',
                key: 'umur',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
                title: 'Action',
                key: 'action',
                render: (data) => (
                    [
                    <ButtonEdit
                        text="Detail"
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        marginRight= "20px"
                        onClick = { () => this.onDetailPeserta(data.id_users,data.id_peserta)}
                    />,
                    <ButtonEdit
                        text="Banned"
                        height={20}
                        icon={faBan}
                        borderRadius="5px"
                        background="#FF0303"
                        onClick = { () => this.showDeleteConfirm(data.id_peserta)}
                    />]
              ),
            },
        ];

        return ( 
            <BannedPesertaComponent
                initialData={this.state}
                navigate={this.props.navigate}
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

const page = connect(mapStateToProps, mapDispatchToProps)(BannedPesertaPage);
export default page