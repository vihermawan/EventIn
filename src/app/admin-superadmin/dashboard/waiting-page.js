import React, { Component } from 'react';
import { Modal, message, Select,Button, Input, Icon, Tooltip, Divider} from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import  * as Highlighter from 'react-highlight-words';
import { faPaperPlane, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import WaitingComponent from '../../../modules/admin-superadmin/e-certificate/waiting-list/waiting-list-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';
import ButtonEdit from '../../../common/component/button/button-edit';


const { confirm } = Modal;
const { Option } = Select;
const dateNow = moment().format('YYYY-MM-DD');

class WaitingPage extends Component {
    state = { 
        waitingSertifikat : [],
        penandatangan : [],
        id_sertifikat:'',
        id_penandatangan : undefined,
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
            console.log('res',res)
            this.setState({waitingSertifikat:res.data.data.sertifikat})
        });
    }
    
    handlePenandatangan = (input, option) => {
        console.log('input', input, 'option', option);
        this.setState({ id_penandatangan: input })  
    }

    //function untuk modal
    showAcceptConfirm = (id_sertifikat) => {
        confirm({
            title: 'Apakah yakin untuk mengirim sertifikat ?',
            okText: 'Yes',
            okType: 'success',
            content: 
            <Select
            mode="multiple"
            optionFilterProp="children"
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={(input, option)=>this.handlePenandatangan(input,option)}
          >
            {
                this.state.penandatangan.map( data =>     
                    <Option
                    key={data.penandatangan.nama_penandatangan.toString()}
                    value={data.penandatangan.id_penandatangan}
                    >{data.penandatangan.nama_penandatangan}</Option>
                )
            }
          </Select>
            ,
            cancelText: 'No',
            onOk: () => {
               this.handleSubmit(id_sertifikat,this.state.id_penandatangan)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //function pop up notifikasi
    showSendConfirm = (id_penandatangan_sertifikat,nama_penandatangan,instansi,jabatan) => {
        confirm({
            title: `Apakah Yakin untuk mengirim sertifikat ke ${nama_penandatangan} ${jabatan} ${instansi} ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                console.log(id_penandatangan_sertifikat,nama_penandatangan,instansi,jabatan)
                this.handleSubmit(id_penandatangan_sertifikat)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    handleSubmit = (id_penandatangan_sertifikat) => {
        this.setState({loading: true})
        const params = new FormData()
        params.append("_method", 'PUT')
        API.postEdit(`/admin/send-sertifikat/${id_penandatangan_sertifikat}`,params)
        .then(res => {
            console.log(res)
            if(res.status == 200){
              message.success('Berhasil mengirim sertifikat');
              this.componentDidMount();   
              this.setState({loading: false}) 
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
                title: 'End Registrasi',
                dataIndex: 'end_registration',
                key: 'end_registration',
                ...this.getColumnSearchProps('end_registration'),
            },  
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [
                <div style={data.end_registration < dateNow ? {display:"none"}:{display:"block"}}>
                  <Tooltip title="Detail">
                  <ButtonEdit
                      text="Kirim Sertif"
                      height={20}
                      icon={faPaperPlane}
                      borderRadius="5px"
                      background="#36FF03"
                      onClick = {() => this.showSendConfirm(data.id_penandatangan_sertifikat, data.nama_penandatangan, data.instansi, data.jabatan)}
                  />
                  </Tooltip>
                </div>,
                <div style={{marginTop:"4px", textAlign:"center"}}>
                  <Tooltip title="Detail">
                  <a href={`${data.sertif_URL}`} download>
                  <ButtonDashboard
                      height={20}
                      icon={faInfoCircle}
                      borderRadius="5px"
                      background="#FFA903"
                      marginRight="4px"
                  />
                  </a>
                  </Tooltip>
                  <Divider type="vertical"/>
                  <Tooltip title="Reject">
                  <ButtonDashboard
                      height={20}
                      icon={faTrashAlt}
                      borderRadius="5px"
                      background="#E11212"
                      marginLeft="4px"
                  />
                  </Tooltip>
                </div>
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
            end_registration : moment(sertifikat.event.detail_event.end_registration).format("DD MMMM YYYY"),
            nama_panitia : sertifikat.event.panitia.nama_panitia
        }))
        
        return ( 
            <WaitingComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                data = {data}
                columns = {columns}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingPage);
export default page