import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip,Button, Input, Icon } from 'antd'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import  * as Highlighter from 'react-highlight-words'
//import component
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import CountRegistEventComponent from '../../../modules/admin-panitia/count-regist-event/count-regist-event-component';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

class CountRegistEventPage extends Component {
    state = {  
        registEvent: [],
        loading: false,
    }
    
    componentDidMount(){
        this.getRegistEvent();
    }

    //get data dari API
    getRegistEvent=()=>{
        this.setState({loading: true})
        API.get(`/panitia/countRegister`)
        .then(res => {
            this.setState({
                registEvent:res.data.data.event,
                loading: false,
            })
        });
    }

    //button detail participant
    onListParticipant = (id_event) => {
        this.props.setIdEvent(id_event);
        this.props.navigate(CONSTANS.LIST_PARTICIPANT_EVENT_MENU_KEY)
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
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
                ...this.getColumnSearchProps('organisasi'),
            },
            {
                title: 'Pendaftar',
                dataIndex: 'pendaftar',
                key: 'pendaftar',
            },
            {
                title: 'Diterima',
                dataIndex: 'diterima',
                key: 'diterima',
            },
            {
                title: 'Kuota',
                dataIndex: 'kuota',
                key: 'kuota',
            },
            {
                title: 'Sisa',
                dataIndex: 'sisa',
                key: 'sisa',
                render: (sisa) => (
                  Number.isNaN(sisa) ? '-' : sisa
                )
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
                    background="#4D5AF2"
                    onClick={ () => this.onListParticipant(data.id_event)}
                />,
                </Tooltip>
                ]
              ),
            },
          ];

          const data =  this.state.registEvent.map( ({id_event, terdaftar, diterima, detail_event,nama_event,organisasi}, index) => ({
            no: index+1,
            id_event : id_event,
            nama_event : nama_event,
            organisasi : organisasi,
            pendaftar : terdaftar,
            diterima : diterima,
            kuota : detail_event.limit_participant,
            sisa : (detail_event.limit_participant) - (diterima)
        }))
        
        return ( 
            <CountRegistEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(CountRegistEventPage);
export default page