import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip,Button, Input, Icon  } from 'antd';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import  * as Highlighter from 'react-highlight-words'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ReceivedCertificateComponent from '../../../modules/admin-panitia/e-certificate/received-certificate-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
// import store
import { setIdSertifikat } from '../../../modules/admin-panitia/e-certificate/store/e-certificate-action'

class ReceivedCertificatePage extends Component {
    state = {  
        certificate: [],
        url : '',
        loading: false,
        visible:false,
    }

    componentDidMount(){
        this.getCertificate();
    }

    getCertificate=()=>{
        this.setState({loading: true})
        API.get(`/panitia/event-sertifikat`)
        .then(res => {
          this.setState({
              certificate:res.data.data.sertifikat,
              loading: false,
            })
        });
    }

    //button detail event
    onDetailCertificate = (sertif_URL) => {
        this.setState({
            visible: true,
            url : sertif_URL,
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
            title: 'Penandatangan',
            dataIndex: 'penandatangan',
            key: 'penandatangan',
            ...this.getColumnSearchProps('penandatangan'),
        },
        {
            title: 'Nomor Induk Pegawai',
            dataIndex: 'nip',
            key: 'nip',
            ...this.getColumnSearchProps('nip'),
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
                    onClick = {() => this.onDetailCertificate(data.sertifikat_URL)}
                />,
            </Tooltip>]
            ),
        },
    ];
    
    const data =  this.state.certificate.map( ({id_sertifikat, sertifikat, penandatangan, status,nama_sertifikat,sertifikat_URL}, index) => ({
        no : index+1,
        nomor : id_sertifikat,
        nama_event: sertifikat.event.nama_event,
        penandatangan : penandatangan.nama_penandatangan,
        nip : penandatangan.nip,
        sertifikat :nama_sertifikat,
        status : [status.nama_status],    
        sertifikat_URL : sertifikat_URL,  
    }))
    
        return ( 
            <ReceivedCertificateComponent
                navigate={this.props.navigate}
                initialData={this.state}
                columns={columns}
                data={data}
                handleCancel= {this.handleCancel}
                handleOk = {this.handleOk}
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

const page = connect(mapStateToProps, mapDispatchToProps)(ReceivedCertificatePage);
export default page