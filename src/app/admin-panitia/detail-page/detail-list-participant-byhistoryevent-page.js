import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import { Button, Input, Icon  } from 'antd'
import  * as Highlighter from 'react-highlight-words';
import DetailListParticipantbyHistoryEvent from '../../../modules/admin-panitia/detail-list-participant-byEvent/detail-list-participant-byHistoryEvent-component';

class DetailListParticipantbyHistoryEventPage extends Component {
    state = {
        loading :false,
        listParticipant : [],
    }

    componentDidMount(){
        this.getListPesertabyEvent(this.props.idEvent)
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
    getListPesertabyEvent=(id_event)=>{
        this.setState({loading: true})
        API.get(`/panitia/pesertabyEvent/${id_event}`)
        .then(res => {
            this.setState({
                listParticipant:res.data.data.peserta,
                loading: false,
            })
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
                title: 'Pekerjaan',
                dataIndex: 'pekerjaan',
                key: 'pekerjaan',
                ...this.getColumnSearchProps('pekerjaan'),
              }
          ];

        const data =  this.state.listParticipant.map( ({id_peserta, peserta, event}, index) => ({
            no: index+1,
            id_peserta : id_peserta,
            nama_peserta : peserta.nama_peserta,
            organisasi  :peserta.organisasi,
            jenis_kelamin : peserta.jenis_kelamin,
            pekerjaan : peserta.pekerjaan,
            umur : peserta.umur,
            nama_event : event.nama_event,
            email : peserta.users.email,
            telepon : peserta.telepon
        }))
        

        return ( 
            <DetailListParticipantbyHistoryEvent
                initialData={this.state}
                navigate={this.props.navigate}
                columns = {columns}
                data = {data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailListParticipantbyHistoryEventPage);
export default page