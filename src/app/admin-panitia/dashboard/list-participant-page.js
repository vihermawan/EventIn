import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Tag,Row,Col, message,Button, Input, Icon, Tooltip } from 'antd'
import { faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import  * as Highlighter from 'react-highlight-words'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ListParticipantComponent from '../../../modules/admin-panitia/list-participant/list-participant-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';


const { confirm } = Modal;

class ListParticipantPage extends Component {
    state = { 
        participant: [],
        totalparticipant : [],
        visible:false,
        loading : false,
    }

    componentDidMount(){
        this.getParticipant(this.props.idEvent);
    }

    getParticipant=(id_event)=>{
        this.setState({loading: true})
        API.get(`/panitia/regist-peserta/${id_event}`)
        .then(res => {
          this.setState({
              participant:res.data.data.peserta,
              totalparticipant : res.data.data.total_regis,
              sisa: Number(res.data.data.total_regis[0].detail_event.limit_participant) - res.data.data.total_regis[0].diterima,
              loading: false,
            })
        });
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    //approve peserta
    ApprovePeserta = (id_pesertaevent) => {
        this.setState({visible:true})
        API.put(`/panitia/approvepeserta/${id_pesertaevent}`)
        .then(res => {
            if(res.status === 200){
                this.setState({visible:false})
                message.success('Peserta telah diterima');
                this.componentDidMount();
            }else{
                this.setState({loading: false,visible:false})
            }
        });
    }


    //reject peserta
    rejectPeserta = (id_pesertaevent) => {
        this.setState({visible:true})
        API.put(`/panitia/rejectpeserta/${id_pesertaevent}`)
        .then(res => {
            if(res.status === 200){
                this.setState({visible:false})
                message.success('Peserta telah ditolak');
                this.componentDidMount();
            }else{
                this.setState({loading: false,visible:false})
            }
        });
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
    showAcceptConfirm = (id,nama) => {
        confirm({
            title: `Apakah yakin untuk menerima peserta ${nama}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.ApprovePeserta(id)
            },
            onCancel(){
            }
        });
    }
    
    //function untuk modal
    showRejectConfirm = (id,nama) => {
        confirm({
            title: `Apakah yakin untuk menolak peserta ${nama}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.rejectPeserta(id)
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
            title: 'Status Peserta',
            key: 'status',
            dataIndex: 'status',
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
            title: 'Action',
            key: 'action',
            render: (data) => (
            [
            <Row>
                <div style={this.state.sisa < 1 ? {display:"none"}:{display:"block"}}>
                    <div style={{textAlign:"center"}}>
                        <Col lg={12} md={24} sm={24}>
                            <Tooltip title="Accept">
                                <ButtonDashboard
                                    height={20}
                                    icon={faCheckCircle}
                                    borderRadius="5px"
                                    background="#00C908"
                                    onClick={ () => this.showAcceptConfirm(data.nomor,data.nama_peserta)}
                                />
                            </Tooltip>,
                        </Col>
                        <Col lg={12} md={24} sm={24}>
                            <Tooltip title="Reject">
                                <ButtonDashboard
                                    height={20}
                                    icon={faWindowClose}
                                    borderRadius="5px"
                                    background="#FF0303"
                                    onClick={ () => this.showRejectConfirm(data.nomor,data.nama_peserta)}
                                />
                            </Tooltip>
                        </Col>
                    </div>
                </div>
                <div style={this.state.sisa < 1 ? {display:"block"}:{display:"none"}}>
                    <div style={{textAlign:"center"}}>
                        <Col lg={12} md={24} sm={24}>
                            <Tooltip title="Reject">
                                <ButtonDashboard
                                    height={20}
                                    icon={faWindowClose}
                                    borderRadius="5px"
                                    background="#FF0303"
                                    onClick={ () => this.showRejectConfirm(data.nomor,data.nama_peserta)}
                                />
                            </Tooltip>
                        </Col>
                    </div>
                </div>
            </Row>]
            ),
        },
    ];

    const data =  this.state.participant.map( ({id_peserta_event, peserta, status,event}, index) => ({
        no : index+1,
        nomor : id_peserta_event,
        nama_peserta : peserta.nama_peserta,
        organisasi : peserta.organisasi,
        umur : peserta.umur,
        jenis_kelamin : peserta.jenis_kelamin,
        email : peserta.users.email,
        status : [status.nama_status],
    }))

        return ( 
            <ListParticipantComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                data={data}
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

const page = connect(mapStateToProps, mapDispatchToProps)(ListParticipantPage);
export default page