import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import { Button, Input, Icon,Modal,message } from 'antd'
import { API } from '../../../common/api'
import  * as Highlighter from 'react-highlight-words';
import BannedPesertaComponent from '../../../modules/admin-superadmin/banned-page/banned-peserta-component';

//component
import { faTrashRestore  } from '@fortawesome/free-solid-svg-icons'
import ButtonEdit from '../../../common/component/button/button-edit';

// import store
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'
import { setIdPeserta } from '../../../modules/admin-superadmin/user/peserta/store/peserta-action'

const { confirm } = Modal;

class BannedPesertaPage extends Component {
    state = {
        bannedPeserta : [],
        loading : false,
    }

    componentDidMount(){
        this.getBannedPeserta();
    }

    
    componentWillReceiveProps(props){
      console.log('props',props)
      console.log('this props',this.props)
      if(props.activeKey !== this.props.activeKey){
        this.getBannedPeserta();
      }
    }

    getBannedPeserta=()=>{
      this.setState({loading: true})
      API.get(`/admin/trash/peserta`)
      .then(res => {
        console.log(res)
        this.setState({
          bannedPeserta:res.data.data.user,
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

    //function untuk modal.
    showUnbannedConfirm = (id,nama_peserta) => {
      confirm({
          title: `Apakah yakin untuk melakukan unban terhadap ${nama_peserta}?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
             this.UnbannedPeserta(id)
          },
          onCancel(){
              console.log('Cancel')
          }
      });
    }

    UnbannedPeserta = (id_peserta) => {   
      console.log(id_peserta)
      this.setState({loading:true})
      API.get(`/admin/unban/peserta/${id_peserta}`)
      .then(res => {
          console.log('res',res)
          if(res.status === 200){
              message.success('Unbanned Peserta Berhasil');
              this.componentDidMount(); 
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
                sorter: (a, b) => a.no - b.no,
                sortDirections: ['ascend','descend'],
            },
            {
                title: 'Nama',
                dataIndex: 'peserta',
                key: 'peserta',
                ...this.getColumnSearchProps('peserta'),
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'email',
                ...this.getColumnSearchProps('email'),
            },
            {
                title: 'Jenis Kelamin',
                dataIndex: 'jenis_kelamin',
                key: 'jenis_kelamin',
                ...this.getColumnSearchProps('jenis_kelamin'),
            },
            {
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
                ...this.getColumnSearchProps('organisasi'),
            },
            {
                title: 'Umur',
                dataIndex: 'umur',
                key: 'umur',
                ...this.getColumnSearchProps('umur'),
            },
            {
                title: 'Action',
                key: 'action',
                render: (data) => (
                    [
                    <ButtonEdit
                        text="Kembalikan"
                        height={20}
                        icon={faTrashRestore}
                        borderRadius="5px"
                        background="#32852a"
                        onClick = { () => this.showUnbannedConfirm(data.id_peserta,data.peserta)}
                    />]
              ),
            },
        ];

        const data =  this.state.bannedPeserta.map( ({id_users, peserta,email}, index) => ({
          no : index+1,
          id_users : id_users,
          id_peserta : peserta.id_peserta,
          peserta : peserta.nama_peserta,
          email : email,
          organisasi : peserta.organisasi,
          umur : peserta.umur,
          jenis_kelamin : peserta.jenis_kelamin,
      }))

        return ( 
            <BannedPesertaComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data = {data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdUsers,
    setIdPeserta,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(BannedPesertaPage);
export default page