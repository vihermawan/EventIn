import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Button, Input, Icon } from 'antd'
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import { navigate } from '../../../common/store/action'
import PesertaAdminComponent from '../../../modules/admin-superadmin/user/peserta/peserta-component';
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonEdit from '../../../common/component/button/button-edit';
import  * as Highlighter from 'react-highlight-words';
// import store
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'
import { setIdPeserta } from '../../../modules/admin-superadmin/user/peserta/store/peserta-action'

const { confirm } = Modal;

class PesertaAdminPage extends Component {
    state = { 
        peserta : [],
        loading: false,
    }

    componentDidMount(){
        this.getPeserta();
    }

    componentWillReceiveProps(props){
      console.log('props',props)
      console.log('this props',this.props)
      if(props.activeKey !== this.props.activeKey){
        this.getPeserta();
      }
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

    getPeserta=()=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta`)
        .then(res => {
          console.log('res',res.data.data.user)
          this.setState({
            peserta:res.data.data.user,
            loading: false,
          })
        });
    }

    //delete peserta
    bannedPeserta = (id_peserta) => {   
        console.log(id_peserta)
        this.setState({loading:true})
        API.delete(`/admin/ban/peserta/${id_peserta}`)
        .then(res => {
            console.log('res',res)
            if(res.status === 200){
                message.success('Banned Peserta Berhasil');
                this.componentDidMount(); 
            }   
        });
    }

    //button detail event
    onDetailPeserta = (id_users,id_peserta) => {
        console.log('id users ini',id_users,id_peserta)
        this.props.setIdUsers(id_users)
        this.props.setIdPeserta(id_peserta)
        this.props.navigate(CONSTANS.DETAIL_PESERTA_ADMIN_MENU_KEY)
    }

    onEditPeserta = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PROFILE_PESERTA_MENU_KEY)
    }

    //function untuk modal
    showBannedConfirm = (id,nama_peserta) => {
        confirm({
            title: `Apakah yakin untuk membanned  ${nama_peserta}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.bannedPeserta(id)
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
                sorter: (a, b) => a.no - b.no,
                sortDirections: ['ascend','descend'],
            },
            {
                title: 'Nama',
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
                        text="Blokir"
                        height={20}
                        icon={faBan}
                        borderRadius="5px"
                        background="#FF0303"
                        onClick = { () => this.showBannedConfirm(data.id_peserta, data.peserta)}
                    />]
              ),
            },
        ];
        
        const data =  this.state.peserta.map( ({id_users, peserta,email}, index) => ({
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
            <PesertaAdminComponent
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
    setIdUsers,
    setIdPeserta,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(PesertaAdminPage);
export default page