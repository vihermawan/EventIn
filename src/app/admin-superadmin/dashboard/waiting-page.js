import React, { Component } from 'react';
import { Modal, message, Select,Button, Input, Icon, Tooltip, Divider, Row, Col} from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import  * as Highlighter from 'react-highlight-words';
import { faPaperPlane,faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import WaitingComponent from '../../../modules/admin-superadmin/e-certificate/waiting-list/waiting-list-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import ButtonEdit from '../../../common/component/button/button-edit';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

const { confirm } = Modal;
const { Option } = Select;
const dateNow = moment().format('YYYY-MM-DD');

class WaitingPage extends Component {

    state = { 
        waitingSertifikat : [],
        penandatangan : [],
        id_sertifikat:'',
        id_penandatangan : undefined,
        link_sertif : '',
        start_event: '',
        end_event: '',
        end_regis: '',
        nama_event: '',
        loading : false,
        visible : false,
    }

    componentDidMount(){
        this.getCertificateAdmin();
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

    getCertificateAdmin=()=>{
        this.setState({loading: true})
        API.get(`/admin/sertifikat-waiting`)
        .then(res => {
            this.setState({loading: false})
            this.setState({waitingSertifikat:res.data.data.sertifikat})
        });
    }
    
    handlePenandatangan = (input, option) => {
        this.setState({ id_penandatangan: input })  
    }

    //function pop up notifikasi
    showSendConfirm = (id_penandatangan_sertifikat,nama_penandatangan,instansi,jabatan) => {
        confirm({
            title: `Apakah Yakin untuk mengirim sertifikat ke ${nama_penandatangan} ${jabatan} ${instansi} ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.handleSubmit(id_penandatangan_sertifikat)
            },
            onCancel(){
             
            }
        });
    }

    //function pop up notifikasi
    showRejectConfirm = (id_penandatangan_sertifikat,nama_panitia) => {
      confirm({
          title: `Apakah Yakin untuk menolak sertifikat dari ${nama_panitia} ?`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
              this.rejectSertifikat(id_penandatangan_sertifikat)
          },
          onCancel(){

          }
      });
    }

    handleSubmit = (id_penandatangan_sertifikat) => {
        this.setState({loading: true})
        const params = new FormData()
        params.append("_method", 'PUT')
        API.postEdit(`/admin/send-sertifikat/${id_penandatangan_sertifikat}`,params)
        .then(res => {
          // console.log(res)
            if(res.status === 200){
              if(res.data.status === 'Success'){
                message.success('Berhasil mengirim sertifikat');
                this.componentDidMount();    
              }else{
                message.error(res.data.status);
                this.setState({loading: false});
              }
            }
        });
    }

    rejectSertifikat = (id_penandatangan_sertifikat) => {
        this.setState({loading: true})
        API.delete(`/admin/reject-sertifikat/${id_penandatangan_sertifikat}`)
        .then(res => {
            if(res.status === 200){
              if(res.data.status === 'Success'){
                message.success('Berhasil mengirim sertifikat');
                this.componentDidMount();   
                this.setState({loading: false}) 
              }else{
                message.error(res.data.status);
                this.setState({loading: false})
            }
          }
        });
    }

    onDetailSertifikat = (link,end_regis,start_event,end_event,nama_event) => {
      this.setState({
        visible: true,
        link_sertif : link,
        end_regis : end_regis,
        start_event :start_event,
        end_event: end_event,
        nama_event : nama_event,
      });
    }
  
    handleOk = e => {
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      this.setState({
        visible: false,
      });
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
                title: 'Nama Panitia',
                dataIndex: 'nama_panitia',
                key: 'nama_panitia',
                ...this.getColumnSearchProps('nama_panitia'),
            },
            {
                title: 'Nama Penandatangan',
                dataIndex: 'nama_penandatangan',
                key: 'nama_penandatangan',
                ...this.getColumnSearchProps('nama_penandatangan'),
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
                title: 'File',
                dataIndex: 'sertifikat',
                key: 'sertifikat',
                ...this.getColumnSearchProps('sertifikat'),
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [
                <Row>
                    <div style={data.start <= Date.parse(dateNow) ? {display:"none"}:{display:"block"}}>
                      <div style={{textAlign:"center"}}>
                        <Col lg={12} md={24} sm={24}>
                            <Tooltip title="Detail">,
                                <ButtonDashboard
                                    height={20}
                                    icon={faInfoCircle}
                                    borderRadius="5px"
                                    background="#FFA903"
                                    width = {80}
                                    onClick={() => this.onDetailSertifikat(data.sertif_URL,data.end_registration,data.start_event,data.end_event,data.nama_event)}
                                />
                            </Tooltip>
                        </Col>
                        <Col lg={12} md={24} sm={24}>
                            <Tooltip title="Tolak">,
                              <ButtonDashboard
                                  height={20}
                                  width = {80}
                                  icon={faWindowClose}
                                  borderRadius="5px"
                                  background="#E11212"
                                  onClick = { () => this.showRejectConfirm(data.id_penandatangan_sertifikat,data.nama_panitia)}
                              />
                            </Tooltip>
                        </Col>
                      </div> 
                    </div>
                    <div style={data.start <= Date.parse(dateNow) ? {display:"block"}:{display:"none"}}> 
                      <div style={{textAlign:"center"}}>
                        <Col lg={8} md={24} sm={24} >
                          <Tooltip title="Kirim">,
                              <ButtonDashboard
                                  height={20}
                                  icon={faPaperPlane}
                                  borderRadius="5px"
                                  background="#32852a"
                                  onClick = {() => this.showSendConfirm(data.id_penandatangan_sertifikat, data.nama_penandatangan, data.instansi, data.jabatan)}
                              />
                          </Tooltip>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Tooltip title="Detail">,
                                <ButtonDashboard
                                    height={20}
                                    icon={faInfoCircle}
                                    borderRadius="5px"
                                    background="#FFA903"
                                    onClick={() => this.onDetailSertifikat(data.sertif_URL,data.end_registration,data.start_event,data.end_event,data.nama_event)}
                                />
                            </Tooltip>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Tooltip title="Tolak">,
                              <ButtonDashboard
                                  height={20}
                                  icon={faWindowClose}
                                  borderRadius="5px"
                                  background="#E11212"
                                  onClick = { () => this.showRejectConfirm(data.id_penandatangan_sertifikat,data.nama_panitia)}
                              />
                            </Tooltip>
                        </Col>
                      </div>
                    </div>
                  </Row>
                ]
              ),
            },
        ];

        const data =  this.state.waitingSertifikat.map( ({id_penandatangan_sertifikat, id_sertifikat, sertifikat,penandatangan}, index) => ({
            no : index+1,
            id_penandatangan_sertifikat : id_penandatangan_sertifikat,
            id_sertifikat : id_sertifikat,
            sertif_URL : sertifikat.sertif_URL,
            nama_event : sertifikat.event.nama_event,
            nama_penandatangan : penandatangan.nama_penandatangan,
            instansi : penandatangan.instansi,
            jabatan : penandatangan.jabatan,
            sertifikat : sertifikat.sertifikat,
            start_event : moment(sertifikat.event.detail_event.start_event).format("DD MMMM YYYY"),
            end_event : moment(sertifikat.event.detail_event.end_event).format("DD MMMM YYYY"),
            nama_panitia : sertifikat.event.panitia.nama_panitia,
            dateNow : moment().format('YYYY-MM-DD'),
            start : Date.parse(sertifikat.event.detail_event.start_event),
            close : Date.parse(sertifikat.event.detail_event.end_registration),
        }))
        
        return ( 
            <WaitingComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                data = {data}
                columns = {columns}
                handleOk = {this.handleOk}
                handleCancel={this.handleCancel}
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

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingPage);
export default page