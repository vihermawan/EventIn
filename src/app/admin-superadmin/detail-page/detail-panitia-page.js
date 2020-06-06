import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag,Button, Input, Icon } from 'antd'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import CONSTANS from '../../../common/utils/Constants'
import  * as Highlighter from 'react-highlight-words';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import { navigate } from '../../../common/store/action'
import DetailPanitiaComponent from '../../../modules/admin-superadmin/user/panitia/detail-panitia-component';
import ButtonEdit from '../../../common/component/button/button-edit';

/// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

class DetailPanitiaPage extends Component {
    state = {
        panitia: [],
        detail_panitia : [],
        event_panitia : [],
        loading :false,
    }

    componentDidMount(){
        this.getDetailPanitia(this.props.idUsers);
        this.getEventPanitia(this.props.idPanitia);
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

    getDetailPanitia=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/detail-panitia/admin/${id_users}`)
        .then(res => {
          this.setState({
            panitia:res.data.data.panitia,
            detail_panitia: res.data.data.panitia.panitia,
            loading: false,
          })
        });
    }

    getEventPanitia=(id_panitia)=>{
        this.setState({loading:true})
        API.get(`/admin/event-panitia/${id_panitia}`)
        .then(res => {
          this.setState({
            event_panitia : res.data.data.event,
            loading: false,
          })
        });
    }

    //button detail event
    onDetailEvent = (id) => {
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_EVENT_ADMIN_MENU_KEY)
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
                title : 'Status Event',
                dataIndex : 'status',
                key : 'status',
                width: '12%',
                ...this.getColumnSearchProps('status'),
                render: status => (
                    <span>
                        {status.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : '#87d068';
                                if (tag === 'Register') {
                                    color = '#f50';
                                }else if (tag === 'Registered'){
                                    color = '#87d068';
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
                title: 'Tanggal Pembuatan',
                dataIndex: 'start_event',
                key: 'start_event',
                width:'15%',
                ...this.getColumnSearchProps('start_event'),
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonEdit
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick={ () => this.onDetailEvent(data.nomor)}
                />]
              ),
            },
          ];
    
        const data =  this.state.event_panitia.map( ({id_event, nama_event, detail_event, kategori,status_event,created_at}, index) => ({
            no : index+1,
            nomor : id_event,
            nama_event: nama_event,
            start_event : moment(created_at).format("DD MMMM YYYY"),
            status : [status_event.nama_status],
            lokasi : detail_event.lokasi,
            kategori : [kategori.nama_kategori],
            peserta : detail_event.limit_participant,
        }))

        return ( 
            <DetailPanitiaComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.panitia,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPanitiaPage);
export default page