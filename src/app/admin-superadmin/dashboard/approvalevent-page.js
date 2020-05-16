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
import ApprovalEventComponent from '../../../modules/admin-superadmin/user/panitia/approval-event-component';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';

// import store
import {  setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

const { confirm } = Modal;

class ApprovalEventPage extends Component {
    state = {
        approvalevent : [],
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
         API.get(`/admin/approve/event`)
         .then(res => {
           this.setState({
             approvalevent:res.data.data.event,
             loading: false,
           })
         });
    }

    //button detail event
    onDetailEvent = (id) => {
        this.props.setIdEvent(id);
        this.props.navigate(CONSTANS.DETAIL_APPROVAL_EVENT_MENU_KEY)
    }

    //approve event
    approveEvent = (id_event) => {
        this.setState({loading: true})
        API.put(`/admin/approvalevent/${id_event}/acc`)
        .then(res => {
            if(res.status === 200){
                message.success('Event berhasil di terima');
                this.componentDidMount(); 
            }   
        });
    }

    //reject event
    rejectEvent = (id_event) => {
      this.setState({loading: true})
      API.put(`/admin/approvalevent/${id_event}/reject`)
      .then(res => {
          if(res.status === 200){
              message.success('Event berhasil di tolak');
              this.componentDidMount(); 
          }   
      });
    }
    
    //function untuk modal
    showAcceptConfirm = (id,nama,panitia) => {
        confirm({
            title: `Apakah yakin untuk menerima event ${nama} dari ${panitia} ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.approveEvent(id)
            },
            onCancel(){
            }
        });
    }
    
    //function untuk modal
    showRejectConfirm = (id,nama,panitia) => {
        confirm({
            title: `Apakah yakin untuk menolak event ${nama} dari ${panitia} ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.rejectEvent(id)
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
                <Tooltip title="Terima">,
                    <ButtonDashboard
                        height={20}
                        icon={faCheckCircle}
                        borderRadius="5px"
                        background="#32852a"
                        onClick = { () => this.showAcceptConfirm(data.nomor,data.nama_event,data.panitia)}
                    />
                 </Tooltip>,
                <Divider type="vertical" />,
                <Tooltip title="Detail">,
                    <ButtonDashboard
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        onClick = { () => this.onDetailEvent(data.nomor)}
                    />
                </Tooltip>,
                <Divider type="vertical" />,
                <Tooltip title="Tolak">,
                    <ButtonDashboard
                        height={20}
                        icon={faWindowClose}
                        borderRadius="5px"
                        background="#FF0303"
                        onClick = { () => this.showRejectConfirm(data.nomor,data.nama_event,data.panitia)}
                    />
                </Tooltip>,
                ]
              ),
            },
        ];
       
        const data =  this.state.approvalevent.map( ({id_event, nama_event,detail_event,kategori,panitia}, index) => ({
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
            <ApprovalEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ApprovalEventPage);
export default page