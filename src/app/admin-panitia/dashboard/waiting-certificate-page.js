import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Tooltip, Button, Input, Icon } from 'antd';
import { faInfoCircle, faEdit} from '@fortawesome/free-solid-svg-icons'
import  * as Highlighter from 'react-highlight-words'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import WaitingCertificateComponent from '../../../modules/admin-panitia/e-certificate/waiting-certificate-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
// import store
import { setIdSertifikat } from '../../../modules/admin-panitia/e-certificate/store/e-certificate-action'

class WaitingCertificatePage extends Component {
    state = {  
        certificate: [],
        loading: false,
    }

    componentDidMount(){
        this.getCertificate();
    }

    getCertificate=()=>{
        this.setState({loading: true})
        API.get(`/panitia/event-received-sertifikat`)
        .then(res => {
          console.log('res',res)
          this.setState({
              certificate:res.data.data.sertifikat,
              loading: false,
            })
        });
    }

    getFile=(id,sertifikat)=>{
        API.get(`/panitia/detail-sertifikat/${id}`)
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

    //button edit sertifikat
    onEditCertificate = (id) => {
        console.log('id ini',id)
        this.props.setIdSertifikat(id);
        this.props.navigate(CONSTANS.EDIT_SERTIF_PANITIA_MENU_KEY)
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
            <Tooltip title="Detail">
            <ButtonDashboard
                height={20}
                icon={faInfoCircle}
                borderRadius="5px"
                background="#FFA903"
                onClick = {() => this.getFile(data.id_sertifikat,data.sertifikat)}
            />,
            </Tooltip>,
            <Divider type="vertical" />,
            <Tooltip title="Edit">
            <ButtonDashboard
                height={20}
                icon={faEdit}
                borderRadius="5px"
                background="#088C0D"
                onClick = {() => this.onEditCertificate(data.id_sertifikat)}
            />,
            </Tooltip>]
            ),
        },
    ];
    
    const data =  this.state.certificate.map( ({id_penandatangan_sertifikat, id_sertifikat, sertifikat,penandatangan}, index) => ({
        no : index+1,
        id_sertifikat:id_sertifikat,
        id_penandatangan_sertifikat : id_penandatangan_sertifikat,
        nama_event : sertifikat.event.nama_event,
        nama_penandatangan : penandatangan.nama_penandatangan,
        instansi : penandatangan.instansi,
        jabatan : penandatangan.jabatan,
        sertifikat : sertifikat.sertifikat,
        // nama_sertifikat : sertifikat.nama_sertifikat
    }))
    
        return ( 
            <WaitingCertificateComponent
                navigate={this.props.navigate}
                initialData={this.state}
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

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingCertificatePage);
export default page