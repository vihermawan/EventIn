import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag,Modal,message,Button, Input, Icon  } from 'antd';
import CONSTANS from '../../../common/utils/Constants'
import {  faUsers} from '@fortawesome/free-solid-svg-icons'
import  * as Highlighter from 'react-highlight-words';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailParticipantComponent from '../../../modules/admin-panitia/active-event/participant-absent-component';
import ButtonEdit from '../../../common/component/button/button-edit';

// import store
import { setIdPeserta } from '../../../modules/admin-superadmin/user/peserta/store/peserta-action'

const {confirm} = Modal;

class DetailParticipantPage extends Component {
    state = {
        listParticipant: [],
        loading: false,
    }

    componentDidMount(){
        this.getParticipantEvent(this.props.idEvent)
    }

    componentWillReceiveProps(props){
      if(props.activeKey !== this.props.activeKey){
        this.getParticipantEvent(this.props.idEvent);
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

    getParticipantEvent=(id) => {
        this.setState({loading: true})
        API.get(`/panitia/event/${id}/peserta`)
        .then(res => {
            if(res.status === 200){
                this.setState({
                    listParticipant:res.data.data.peserta,
                })
            }
            this.setState({loading:false})
        });
    }

    //button detail peserta
    onDetailPeserta = (id) => {
        this.props.setIdPeserta(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_PESERTA_MENU_KEY)
    }

    //approve peserta
    AbsentPeserta = (id_pesertaevent) => {
        this.setState({loading: true})
        API.put(`/panitia/ubahAbsensi/${id_pesertaevent}`)
        .then(res => {
            if(res.status === 200){
                message.success('Peserta berhasil absent');
                this.componentDidMount();
            }   
        });
    }

    //function untuk modal
    showAbsenConfirm = (id) => {
        confirm({
            title: 'Apakah peserta ini sudah datang ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.AbsentPeserta(id);
            },
            onCancel(){
             
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
                title: 'Nama Peserta',
                dataIndex: 'nama_peserta',
                key: 'nama_peserta',
                ...this.getColumnSearchProps('nama_peserta'),
            },
            {
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
                ...this.getColumnSearchProps('organisasi'),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                ...this.getColumnSearchProps('email'),
            },
            {
                title: 'Jenis Kelamin',
                dataIndex: 'jenis_kelamin',
                key: 'jenis_kelamin',
                ...this.getColumnSearchProps('jenis_kelamin'),
            },
            {
                title: 'Umur',
                dataIndex: 'umur',
                key: 'umur',
                ...this.getColumnSearchProps('umur'),
            },
            {
                title: 'Status Absensi',
                dataIndex: 'status',
                key: 'status',
                render: status => (
                    <span>
                      {status.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                          color = 'volcano';
                        }
                        return (
                          <Tag color={color} key={tag}>
                            {tag}
                          </Tag>
                        );
                      })}
                    </span>
                ),
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonEdit
                    text="Absen"
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#070E57"
                    marginRight= "20px"
                    onClick = {() => this.showAbsenConfirm(data.id_peserta_event)}
                />]
              ),
            },
          ];

        const data =  this.state.listParticipant.map( ({id_event, peserta, status, id_peserta_event}, index) => ({
            no : index+1,
            id_peserta_event : id_peserta_event,
            nomor : id_event,
            nama_peserta: peserta.nama_peserta,
            organisasi : peserta.organisasi,
            email : peserta.users.email,
            jenis_kelamin : peserta.jenis_kelamin,
            umur : peserta.umur,
            status : [status.nama_status],
        }))

        return ( 
            <DetailParticipantComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
                componentDidMount={this.componentDidMount}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdPeserta,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailParticipantPage);
export default page