import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { Modal, Tag, Divider,message,Button, Input, Icon, Tooltip} from 'antd'
import CONSTANS from '../../../common/utils/Constants'
import  * as Highlighter from 'react-highlight-words';
import { faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { navigate } from '../../../common/store/action'
import ListAllEventComponent from '../../../modules/admin-superadmin/user/panitia/list-all-event-component';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';

// import store
import {  setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

const { confirm } = Modal;

class ListAllEventPage extends Component {
    state = {
        listevent : [],
        loading : false,
    }

    componentDidMount(){
        this.getApprovalEvent();
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

    getApprovalEvent = () => {
         this.setState({loading: true})
         API.get(`/admin/showevent`)
         .then(res => {
           console.log('res',res)
           this.setState({
             listevent:res.data.data.event,
             loading: false,
           })
         });
    }

    //button detail event
    onDetailEvent = (id) => {
        console.log('id ini',id)
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_LIST_ALL_EVENT_MENU_KEY)
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
                title: 'Nama Event',
                dataIndex: 'nama_event',
                key: 'nama_event',
                ...this.getColumnSearchProps('nama_event'),
            },
            {
                title: 'Panitia',
                dataIndex: 'panitia',
                key: 'panitia',
                ...this.getColumnSearchProps('panitia'),
            },
            {
                title: 'Tempat',
                dataIndex: 'lokasi',
                key: 'lokasi',
                ...this.getColumnSearchProps('lokasi'),
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
                title: 'Tanggal Mulai',
                dataIndex: 'start_event',
                key: 'start_event',
                ...this.getColumnSearchProps('start_event'),
            },
            {
                title: 'Tanggal Selesai',
                dataIndex: 'end_event',
                key: 'end_event',
                ...this.getColumnSearchProps('end_event'),
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [
                <Tooltip title="Detail">
                    <ButtonDashboard
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        onClick = { () => this.onDetailEvent(data.nomor)}
                    />
                </Tooltip>,]
              ),
            },
        ];
       
        const data =  this.state.listevent.map( ({id_event, nama_event,detail_event,kategori,panitia}, index) => ({
            no : index+1,
            nomor : id_event,
            nama_event: nama_event,
            panitia : panitia.nama_panitia,
            start_event : moment(detail_event.start_event).format("DD MMMM YYYY"),
            lokasi : detail_event.lokasi,
            kategori : [kategori.nama_kategori],
            end_event : moment(detail_event.end_event).format("DD MMMM YYYY"),
        }))

        return ( 
            <ListAllEventComponent
                navigate={this.props.navigate}
                initialData={this.state}
                data={data}
                columns={columns}
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

const page = connect(mapStateToProps, mapDispatchToProps)(ListAllEventPage);
export default page