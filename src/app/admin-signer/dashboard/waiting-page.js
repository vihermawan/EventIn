import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Divider, Tooltip,Button, Input, Icon } from 'antd'
import { faInfoCircle , faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import  * as Highlighter from 'react-highlight-words';
import WaitingListComponent from '../../../modules/admin-signer/waiting-list/waiting-list-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import 'moment-timezone';
import 'moment/locale/id';
import moment from 'moment-timezone';

// import store
import { setIdSertifikat } from '../../../modules/admin-panitia/e-certificate/store/e-certificate-action'

const {confirm} = Modal;
let data_id = [];

class WaitingListPage extends Component {
    state = {  
        e_certificate: [],
        id_sertifikat : '', 
        loading:false,
        visible: false,
        visible_loading : false,
    }

    componentDidMount(){
        this.getCertificateAdmin(this.props.idEvent);
        this.setState({id_sertifikat : this.props.idSertifikat});
        data_id = [];
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

    getCertificateAdmin=(id_event)=>{
        this.setState({loading: true})
        API.get(`/penandatangan/sertifikat/waiting/${id_event}`)
        .then(res => {
            this.setState({
                e_certificate:res.data.data.sertifikat,
                loading: false,
            })
        });
    }

    //button detail certificate
    onDetailCertificate = (sertif_URL) => {
      this.setState({
        visible: true,
        url : sertif_URL,
      });
    }

    //function untuk modal
    showSignedConfirm = (id_penandatangan_sertifikat,id_sertifikat) => {
        confirm({
            title: ' Apakah anda yakin untuk menandatangani dokumen ini ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.assignSertifikat(id_penandatangan_sertifikat,id_sertifikat)
            },
            onCancel(){
            }
        });
    }

    //function untuk modal
    showAllSignedConfirm = () => {
      confirm({
          title: ' Apakah anda yakin untuk menandatangani semua dokumen ?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
             this.assignAllSertifikat()
          },
          onCancel(){
          }
      });
    }

    //assign sertifikat
    assignSertifikat = (id_penandatangan_sertifikat,id_sertifikat) => {
        const params = new FormData()
        params.set('passphrase','password')
        params.append("_method", 'PUT')
        this.setState({
          visible_loading :true,
        })
        API.postEdit(`/penandatangan/sertifikat/assign/${id_penandatangan_sertifikat}`, params)
        .then(res => {
            if(res.status === 200){
                this.setState({
                  visible_loading :false,
                })
                message.success('Sertifikat Berhasil ditandantangani');
                this.componentDidMount();
            }else{
              this.setState({
                visible_loading :false,
              })
            }   
        });
    }

    //assign semua sertifikat
    assignAllFunction = (id) => {
      const params = new FormData()
      params.set('passphrase','password')
      params.append("_method", 'PUT')
      
      API.postEdit(`/penandatangan/sertifikat/assign/${id}`, params)
      .then(res => {
          if(res.status === 200){
            return '1';
          }else{
            return '0';
          }   
      });
    }
    assignAllSertifikat = async () => {
      const total_data = data_id.length
      var success = 0;
      this.setState({
        visible_loading :true,
      })
      for(let i=0; i<total_data; i++){
        const id = data_id[i];
        const params = new FormData()
        params.set('passphrase','password')
        params.append("_method", 'PUT')
        
        let response = await API.postEdit(`/penandatangan/sertifikat/assign/${id}`, params)
        .then(res => {
            if(res.status === 200){
              return 1;
            }else{
              this.setState({
                visible_loading :false,
              })
              return 0;
            }
        });
        success += response;

        if(i==total_data-1){
          if(total_data === success){
            this.setState({ visible_loading :false })
            message.success('Semua Sertifikat Berhasil ditandantangani');
          } else {
            message.success('Tidak semua sertifikat berhasil ditandantangani');
          }
        }
      }
      this.componentDidMount();
    }

    showModal2 = () => {
      this.setState({
        visible_loading :true,
      })
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
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
                ...this.getColumnSearchProps('organisasi'),
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
                <Tooltip title="Signed">
                    <ButtonDashboard
                        height={20}
                        icon={faCheckCircle}
                        borderRadius="5px"
                        background="#004A03"
                        onClick = {() => this.showSignedConfirm(data.id_penandatangan_sertifikat,data.id_sertifikat)}
                    />,
                </Tooltip>,
                <Divider type="vertical" />,
                <Tooltip title="Detail">,
                    <ButtonDashboard
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        onClick = {() => this.onDetailCertificate(data.sertif_URL)}
                    />,
                </Tooltip>,]
              ),
            },
        ];

        const data =  this.state.e_certificate.map( ({id_penandatangan_sertifikat, sertifikat_URL, id_sertifikat, nama_sertifikat,sertifikat}, index) => ({
            no : index+1,
            id_penandatangan_sertifikat : id_penandatangan_sertifikat,
            id_sertifikat : id_sertifikat,
            nama_event : sertifikat.event.nama_event,
            nama_panitia : sertifikat.event.panitia.nama_panitia,
            organisasi : sertifikat.event.organisasi,
            sertifikat : nama_sertifikat,
            sertif_URL :sertifikat_URL
        }))

        this.state.e_certificate.map(data => {
          data_id.push(data.id_penandatangan_sertifikat);
        })

        return ( 
            <WaitingListComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                columns={columns}
                data={data}
                data_id={data_id}
                handleCancel= {this.handleCancel}
                handleOk = {this.handleOk}
                assignAllSertifikat = {this.assignAllSertifikat}
                showAllSignedConfirm = {this.showAllSignedConfirm}
                showModal2 ={this.showModal2}
            />
        );
    }
}
 
const mapStateToProps = state => ({
  ...state.activeEvent,
  ...state.certificate,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdSertifikat,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingListPage);
export default page