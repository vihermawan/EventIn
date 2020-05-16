import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { Modal, message, Button, Input, Icon, Divider } from 'antd'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import ListPanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/listpanitia-component';
import  * as Highlighter from 'react-highlight-words';
//component
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonEdit from '../../../common/component/button/button-edit';

// import store
import { setIdPanitia } from '../../../modules/admin-superadmin/user/panitia/store/panitia-action'
import { setIdUsers } from '../../../modules/admin-superadmin/user/store/users-action'

const { confirm } = Modal;

class ListPanitiaAdminPage extends Component {
    state = { 
        panitia: [],
        loading: false,
    }

    componentDidMount(){
        this.getPanitia();
    }
    componentWillReceiveProps(props){
      if(props.activeKey !== this.props.activeKey){
        this.getPanitia();
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

    getPanitia=()=>{
        this.setState({loading: true})
        API.get(`/admin/showpanitia`)
        .then(res => {
          this.setState({
            panitia:res.data.data.panitia,
            loading: false,
          })
        });
    }

    //function untuk modal
    showBannedConfirm = (id,nama_panitia) => {
        confirm({
            title: `Apakah yakin untuk memblokir ${nama_panitia} ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.bannedPanitia(id,nama_panitia)
            },
            onCancel(){
              
            }
        });
    }

    //banned panitia
    bannedPanitia = (id_panitia,nama_panitia) => { 
      API.delete(`/admin/ban/panitia/${id_panitia}`)
      .then(res => {
          if(res.status === 200){
              message.success(`Berhasil Blokir Panitia ${nama_panitia}`);
              this.componentDidMount();
          }   
      });
    }

    //button detail event
    onDetailPanitia = (id_users,id_panitia) => {
        this.props.setIdUsers(id_users)
        this.props.setIdPanitia(id_panitia)
        this.props.navigate(CONSTANS.DETAIL_PANITIA_ADMIN_MENU_KEY)
    }

    onEditPanitia = (id_users) => {
        this.props.setIdUsers(id_users)
        this.props.navigate(CONSTANS.EDIT_PANITIA_ADMIN_MENU_KEY)
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
                dataIndex: 'panitia',
                key: 'panitia',
                ...this.getColumnSearchProps('panitia'),
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              ...this.getColumnSearchProps('email'),
            },
            {
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
                ...this.getColumnSearchProps('organisasi'),
            },
            {
                title: 'No Telepon',
                dataIndex: 'no_telepon',
                key: 'no_telepon',
                ...this.getColumnSearchProps('no_telepon'),
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
                        onClick = { () => this.onDetailPanitia(data.id_users,data.id_panitia)}
                    />,
                    <Divider type="vertical" />,
                    <ButtonEdit
                        text="Blokir"
                        height={20}
                        icon={faBan}
                        borderRadius="5px"
                        background="#FF0303"
                        onClick = { () => this.showBannedConfirm(data.id_panitia, data.panitia)}
                    />]
              ),
            },
          ];

        const data =  this.state.panitia.map( ({id_users, panitia,email}, index) => ({
            no : index+1,
            id_panitia : panitia.id_panitia,
            id_users : id_users,
            panitia : panitia.nama_panitia,
            email : email,
            organisasi : panitia.organisasi,
            no_telepon : panitia.telepon,
        }))
        
        return ( 
            <ListPanitiaAdminComponent
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
    setIdPanitia,
    setIdUsers,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ListPanitiaAdminPage);
export default page