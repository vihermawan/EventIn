import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Button, Input, Icon, Divider, Tooltip  } from 'antd'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import  * as Highlighter from 'react-highlight-words';
//component
import PenandatanganAdminComponent from '../../../modules/admin-superadmin/user/penandatangan/penandatangan-component';
import { faBan, faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
//import store.
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'
import { setIdPenandatangan } from '../../../modules/admin-superadmin/user/penandatangan/store/penandatangan-action'

const {confirm} = Modal;

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

    componentWillReceiveProps(props){
      console.log('props',props)
      console.log('this props',this.props)
      if(props.activeKey !== this.props.activeKey){
        this.getPenandatangan();
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

    //delete penandatangan
    bannedPenandatangan = (id_penandatangan) => {   
        console.log(id_penandatangan)
        this.setState({loading: true})
        API.delete(`/admin/ban/penandatangan/${id_penandatangan}`)
        .then(res => {
            console.log('res',res)
            if(res.status === 200){
                message.success('Blokir Penandatangan Berhasil');
                this.componentDidMount();
            }   
        });
    }
    
    //function untuk modal.
    showBannedConfirm = (id,nama_penandatangan) => {
        confirm({
            title: `Apakah yakin untuk memblokir ${nama_penandatangan}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                console.log('id ini', id)
                this.bannedPenandatangan(id)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //detail Penandatangan
    onDetailPenandatangan = (id_users,id_penandatangan) => {
        this.props.setIdUsers(id_users)
        this.props.setIdPenandatangan(id_penandatangan)
        console.log('id users',id_users)
        this.props.navigate(CONSTANS.DETAIL_PENANDATANGAN_ADMIN_MENU_KEY)
    }

    //edit penandatangan.
    onEditPenandatangan = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PENANDATANGAN_ADMIN_MENU_KEY)
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
                dataIndex: 'penandatangan',
                key: 'penandatangan',
                ...this.getColumnSearchProps('penandatangan'),
            },
            {
                title: 'NIP',
                dataIndex: 'nip',
                key: 'nip',
                ...this.getColumnSearchProps('nip'),
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
                title: 'Action',
                key: 'action',
                render: (data) => (
                    [ 
                    <Tooltip title="Edit">,
                    <ButtonDashboard
                        height={20}
                        icon={faPen}
                        borderRadius="5px"
                        background="#005568"
                        onClick = { () => this.onEditPenandatangan(data.id_users)}
                    />,
                    </Tooltip>,
                    <Divider type="vertical" />,
                    <Tooltip title="Detail">,
                    <ButtonDashboard
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        onClick = { () => this.onDetailPenandatangan(data.id_users,data.id_penandatangan)}
                    />,
                    </Tooltip>,
                    <Divider type="vertical" />,
                    <Tooltip title="Blokir">,
                    <ButtonDashboard
                        height={20}
                        icon={faBan}
                        borderRadius="5px"
                        background="#E11212"
                        onClick = {() => this.showBannedConfirm(data.id_penandatangan,data.penandatangan)}
                    />
                    </Tooltip>,
                    ]
              ),
            },
          ];

        const data =  this.state.penandatangan.map(  ({id_users, penandatangan,email}, index) => ({
            no : index+1,
            id_users : id_users,
            id_penandatangan : penandatangan.id_penandatangan,
            penandatangan : penandatangan.nama_penandatangan,
            instansi : penandatangan.instansi,
            jabatan : penandatangan.jabatan,
            nip : penandatangan.nip,
            email: email,

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
    setIdUsers,
    setIdPenandatangan,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(PenandatanganAdminPage);
export default page