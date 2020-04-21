import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Divider, Tooltip,Button, Input, Icon } from 'antd'
import CONSTANS from '../../../common/utils/Constants'
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

class WaitingListPage extends Component {
    state = {  
        e_certificate: [],
        loading:false
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
        API.get(`/penandatangan/sertifikat/waiting`)
        .then(res => {
          console.log('res',res.data.data.sertifikat)
            this.setState({
                e_certificate:res.data.data.sertifikat,
                loading: false,
            })
        });
    }

    getFile=(id,sertifikat)=>{
        API.get(`/penandatangan/detail-sertifikat/${id}`)
        .then(res => {
          console.log('res',res)
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${sertifikat}`); 
          document.body.appendChild(link);
          link.click();
        });
    }

    //function untuk modal
    showSignedConfirm = (id_sertifikat) => {
        confirm({
            title: ' Apakah anda yakin untuk menandatangani dokumen ini ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.assignSertifikat(id_sertifikat)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //assign sertifikat
    assignSertifikat = (id_sertifikat) => {
        console.log(id_sertifikat)
        API.post(`/penandatangan/sertifikat/assign/${id_sertifikat}`)
        .then(res => {
            console.log('res',res)
            if(res.status === 200){
                message.success('Sertifikat Berhasil ditandantangani');
                window.location.reload(); 
            }   
        });
    }

    //button detail certificate
    onDetailCertificate = (id) => {
        console.log('id ini',id)
        this.props.setIdSertifikat(id);
        this.props.navigate(CONSTANS.DETAIL_SERTIF_SIGNER_MENU_KEY)
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
                        onClick = {() => this.showSignedConfirm(data.id_sertifikat)}
                    />,
                </Tooltip>,
                <Divider type="vertical" />,
                <Tooltip title="Detail">,
                    <ButtonDashboard
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        onClick={() => this.getFile(data.id_sertifikat,data.sertifikat)}
                    />,
                </Tooltip>,]
              ),
            },
          ];

        const data =  this.state.e_certificate.map( ({id_penandatangan_sertifikat, id_sertifikat, sertifikat,tenggang_waktu}, index) => ({
            no : index+1,
            nomor : id_penandatangan_sertifikat,
            id_sertifikat : id_sertifikat,
            nama_event : sertifikat.event.nama_event,
            nama_panitia : sertifikat.event.panitia.nama_panitia,
            organisasi : sertifikat.event.organisasi,
            sertifikat : sertifikat.sertifikat,
            tenggang_waktu : moment(tenggang_waktu).format("DD MMMM YYYY"),
        }))

        return ( 
            <WaitingListComponent
                navigate={this.props.navigate}
                initialData = {this.state}
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
    setIdSertifikat,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingListPage);
export default page