import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Tooltip, Button, Input, Icon } from 'antd';
import { faListAlt} from '@fortawesome/free-solid-svg-icons'
import  * as Highlighter from 'react-highlight-words'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import WaitingCertificateComponent from '../../../modules/admin-panitia/e-certificate/waiting-certificate-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
// import store
import { setIdSertifikat } from '../../../modules/admin-panitia/e-certificate/store/e-certificate-action'
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

class WaitingCertificatePage extends Component {
    state = {  
        certificate: [],
        loading: false,
    }

    componentDidMount(){
        this.getCertificateWaiting();
    }

    componentWillReceiveProps(props){
      if(props.activeKey !== this.props.activeKey){
        this.getCertificateWaiting();
      }
    }

    getCertificateWaiting=()=>{
        this.setState({loading: true})
        API.get(`/panitia/count-waiting`)
        .then(res => {
          this.setState({
              certificate:res.data.data.sertifikat,
              loading: false,
            })
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

    //button detail event
    onListCertificateWaiting = (id) => {
      this.props.setIdEvent(id);
      this.props.navigate(CONSTANS.LIST_SERTIF_PANITIA_MENU_KEY)
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
            title: 'Organisasi',
            dataIndex: 'organisasi',
            key: 'organisasi',
            ...this.getColumnSearchProps('organisasi'),
        },
        {
            title: 'Total Sertifikat',
            dataIndex: 'total',
            key: 'total',
            ...this.getColumnSearchProps('total'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
            [
            <Tooltip title="Daftar Sertifikat">,
            <ButtonDashboard
                height={20}
                icon={faListAlt}
                borderRadius="5px"
                background="#0030b5"
                onClick = {() => this.onListCertificateWaiting(data.id_event)}
            />
            </Tooltip>]
            ),
        },
    ];
    
    const data =  this.state.certificate.map( ({id_panitia, id_event,organisasi, nama_event,sertifikat}, index) => ({
        no : index+1,
        id_event : id_event,
        organisasi : organisasi,
        nama_event : nama_event,
        total : sertifikat.penandatanganan_sertifkat[0].total,
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
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingCertificatePage);
export default page