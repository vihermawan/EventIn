import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import { Button, Input, Icon,Modal,message } from 'antd'
import { API } from '../../../common/api'
import  * as Highlighter from 'react-highlight-words';
import BannedPenandatanganComponent from '../../../modules/admin-superadmin/banned-page/banned-penandatangan-component';

//component
import { faBan  } from '@fortawesome/free-solid-svg-icons'
import ButtonEdit from '../../../common/component/button/button-edit';

const {confirm} = Modal;

class BannedPenandatanganPage extends Component {
    state = {
      bannedPenandatangan : [],
      loading : false,
    }

    componentDidMount(){
      this.getBannedPenandatangan();
    }

    getBannedPenandatangan=()=>{
      this.setState({loading: true})
      API.get(`/admin/trash/penandatangan`)
      .then(res => {
        console.log(res)
        this.setState({
          bannedPenandatangan:res.data.data.user,
          loading: false,
        })
      });
    }

    componentWillReceiveProps(props){
      console.log('props',props)
      console.log('this props',this.props)
      if(props.activeKey !== this.props.activeKey){
        this.getBannedPenandatangan();
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

     //function untuk modal
     showUnbannedConfirm = (id,nama_penandatangan) => {
      confirm({
          title: `Apakah yakin untuk melakukan unban terhadap ${nama_penandatangan}?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
             this.UnbannedPenandatangan(id)
          },
          onCancel(){
              console.log('Cancel')
          }
      });
    }

    UnbannedPenandatangan = (id_penandatangan) => {   
      console.log(id_penandatangan)
      this.setState({loading:true})
      API.get(`/admin/unban/penandatangan/${id_penandatangan}`)
      .then(res => {
          console.log('res',res)
          if(res.status == 200){
              message.success('Unbanned Penandatangan Berhasil');
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
                title: 'Nama Penandatangan',
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
                title: 'Action',
                key: 'action',
                render: (data) => (
                    [ 
                    <ButtonEdit
                        text="Unbanned"
                        height={20}
                        icon={faBan}
                        borderRadius="5px"
                        background="#E11212"
                        onClick = {() => this.showUnbannedConfirm(data.id_penandatangan,data.penandatangan)}
                    />]
              ),
            },
          ];


          const data =  this.state.bannedPenandatangan.map(  ({id_users, penandatangan}, index) => ({
            no : index+1,
            id_users : id_users,
            id_penandatangan : penandatangan.id_penandatangan,
            penandatangan : penandatangan.nama_penandatangan,
            instansi : penandatangan.instansi,
            jabatan : penandatangan.jabatan,
            nip : penandatangan.nip,
        }))

        return ( 
            <BannedPenandatanganComponent
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
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(BannedPenandatanganPage);
export default page