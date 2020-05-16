import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Button, Input, Icon } from 'antd';
import {  faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import CONSTANS from '../../../common/utils/Constants'
import  * as Highlighter from 'react-highlight-words';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import DetailPesertaComponent from '../../../modules/admin-superadmin/user/peserta/detail-peserta-component';
import ButtonEdit from '../../../common/component/button/button-edit';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

class DetailPesertaPage extends Component {
    state = {
        peserta: [],
        detailPeserta : [],
        eventPeserta : [],
        eventbyPeserta : [],
        loading :false,
    }

    componentDidMount(){
        this.getDetailPeserta(this.props.idUsers);
        this.getEventbyPeserta(this.props.idPeserta);
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

    getDetailPeserta=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta/${id_users}`)
        .then(res => {
          this.setState({
            peserta : res.data.data.peserta,
            detailPeserta:res.data.data.peserta.peserta,
            loading: false,
          })
        });
    }
    
    getEventbyPeserta=(id_peserta)=>{
        this.setState({loading: true})
        API.get(`/admin/showpeserta-event/${id_peserta}`)
        .then(res => {
          this.setState({
            eventbyPeserta : res.data.data.peserta,
            loading: false,
          })
        });
    }

    //button detail event
    onDetailEvent = (id) => {
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_PESERTA_EVENT_MENU_KEY)
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
                title : 'Status Peserta',
                dataIndex : 'status',
                key : 'status',
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
                [<ButtonEdit
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick={ () => this.onDetailEvent(data.id_event)}
                />]
              ),
            },
          ];

     const data =  this.state.eventbyPeserta.map( ({id_event, event, status,kategori}, index) => ({
            no : index+1,
            id_event : id_event,
            nama_event: event.nama_event,
            start_event : moment(event.detail_event.start_event).format("DD MMMM YYYY"),
            end_event : moment(event.detail_event.end_event).format("DD MMMM YYYY"),
            status : [status.nama_status],
            lokasi : event.detail_event.lokasi,
            kategori : [event.kategori.nama_kategori],
        }))


        return ( 
            <DetailPesertaComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.peserta,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPesertaPage);
export default page