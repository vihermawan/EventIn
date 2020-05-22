import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, message, Divider,Tooltip,Input, Icon, Button  } from 'antd'
import  * as Highlighter from 'react-highlight-words';
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import HistoryEventComponent from '../../../modules/admin-panitia/history-event/history-event-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

const { confirm } = Modal;

class HistoryEventPage extends Component {
    state = {
        eventPast: [],
        loading: false,
    }

    componentDidMount(){
        this.getEventPast();
    }

    getEventPast=()=>{
        this.setState({loading: true})
        API.get(`/panitia/eventPast`)
        .then(res => {
          this.setState({
            eventPast:res.data.data.event,
            loading: false,
          })
        });
    }

    //function untuk modal
    showDeleteConfirm = (id) => {
      confirm({
          title: 'Apakah Yakin untuk menghapus Data ?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
              this.deleteEvent(id)
          },
          onCancel(){
          }
      });
    }

    //button detail participant
    onDetailParticipant = (id) => {
      this.props.setIdEvent(id);
      this.props.navigate(CONSTANS.DETAIL_LIST_PARTICIPANT_HISTORY_EVENT_MENU_KEY)
    }

    //delete event
    deleteEvent = (id) => {
      this.setState({loading:true})
      API.delete(`/panitia/deleteevent/${id}`)
      .then(res => {
          if(res.status === 200){
              message.success('Data Berhasil dihapus');
              this.componentDidMount(); 
          }   
      });
    }

    //button detail event
    onDetailEvent = (id) => {
      this.props.setIdEvent(id);
      this.props.navigate(CONSTANS.DETAIL_HISTORY_EVENT_PANITIA_MENU_KEY)
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
                title: 'Nama Event',
                dataIndex: 'nama_event',
                key: 'nama_event',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
              title: 'Kategori',
              dataIndex: 'kategori',
              key: 'kategori',
              ...this.getColumnSearchProps('kategori'),
              render: kategori => (
                <span>
                  {kategori.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Budaya') {
                      color = '#0046b8';
                    }else if(tag === 'Musik'){
                      color ='#018f52'
                    }else if(tag === 'Olahraga'){
                      color ='#8f1601'
                    }else if(tag === 'Game'){
                      color ='#016e8f'
                    }else if(tag === 'Seni'){
                      color ='#8f8f01'
                    }else if(tag === 'Teknologi'){
                      color ='#018f52'
                    }else if(tag === 'Pendidikan'){
                      color ='#8f0120'
                    }else if(tag === 'Agama'){
                      color ='#018f77'
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
                title: 'Tempat',
                dataIndex: 'lokasi',
                key: 'lokasi',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
                title: 'Total Peserta',
                dataIndex: 'peserta',
                key: 'peserta',
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [
                <Tooltip title="Participant">
                  <ButtonDashboard
                      height={20}
                      icon={faUsers}
                      borderRadius="5px"
                      background="#070E57"
                      onClick={() =>this.onDetailParticipant(data.nomor)}
                  />,
                </Tooltip>,
                <Divider type="vertical" />,
                <Tooltip title="Delete">
                  <ButtonDashboard
                      height={20}
                      icon={faTrash}
                      borderRadius="5px"
                      background="#FF0303"
                      onClick={ () => this.showDeleteConfirm(data.nomor)}
                  />,
                </Tooltip>,
                <Divider type="vertical" />,
                <Tooltip title="Detail">
                  <ButtonDashboard
                      height={20}
                      icon={faInfoCircle}
                      borderRadius="5px"
                      background="#FFA903"
                      onClick={ () => this.onDetailEvent(data.nomor)}
                  />,
                 </Tooltip>,
                ]
              ),
            },
          ];

          const data =  this.state.eventPast.map( ({id_event, nama_event, detail_event, kategori, peserta_event_count}, index) => ({
                    no : index+1,
                    nomor : id_event,
                    nama_event: nama_event,
                    start_event :detail_event.start_event,
                    lokasi : detail_event.lokasi,
                    kategori : [kategori.nama_kategori],
                    peserta : peserta_event_count,
        }))

        return ( 
            <HistoryEventComponent
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
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(HistoryEventPage);
export default page