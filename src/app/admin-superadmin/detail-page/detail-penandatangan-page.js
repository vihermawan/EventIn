import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import {Button, Input, Icon,Tag,Tooltip} from 'antd'
import  * as Highlighter from 'react-highlight-words';
import { navigate } from '../../../common/store/action'
import DetailPenandatanganComponent from '../../../modules/admin-superadmin/user/penandatangan/detail-penandatangan-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class DetailPenandatanganPage extends Component {
    state = {
        detail_penandatangan : [],
        sertifikat :[],
        url : '',
        visible : false,
    }

    componentDidMount(){
        this.getDetailPenandatangan(this.props.idUsers);
        this.getDetailSertifikat(this.props.idPenandatangan)
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

    getDetailPenandatangan=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/showpenandatangan/${id_users}`)
        .then(res => {
          this.setState({
            detail_penandatangan:res.data.data.penandatangan,
            loading: false,
          })
        });
    }

    getDetailSertifikat=(id_penandatangan)=>{
        this.setState({loading: true})
        API.get(`/admin/show-sertifikat-penandatanan/${id_penandatangan}`)
        .then(res => {
          this.setState({
            sertifikat:res.data.data.sertifikat,
            loading: false,
          })
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

     //button detail certificate
     onDetailCertificate = (sertif_URL) => {
      this.setState({
        visible: true,
        url : sertif_URL,
      });
    }


    render() { 
          const columns = [
            {
                title: 'No',
                dataIndex: 'nomor',
                key: 'nomor',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Nama Sertifikat',
                dataIndex: 'nama_sertifikat',
                key: 'nama_sertifikat',
                ...this.getColumnSearchProps('nama_sertifikat'),
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
                title: 'Status Sertifikat',
                dataIndex: 'status',
                key: 'status',
                ...this.getColumnSearchProps('status'),
                render: status => (
                    <span>
                      {status.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === '"Waiting"') {
                            color = '#0046b8';
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
                <Tooltip title="Detail">
                    <ButtonDashboard
                        height={20}
                        icon={faInfoCircle}
                        borderRadius="5px"
                        background="#FFA903"
                        onClick = {() => this.onDetailCertificate(data.sertif_URL)}
                    />
                </Tooltip>,]
              ),
            },
          ];

        const dataPenandatangan =  this.state.detail_penandatangan.map( ({id_users, penandatangan}, index) => ({
           nama_penandatangan : penandatangan.nama_penandatangan,
           instansi : penandatangan.instansi,
           nip : penandatangan.nip,
           jabatan : penandatangan.jabatan,
           picture : penandatangan.image_URL,
        }))

        const data = this.state.sertifikat.map ( ({nama_event, nama_sertifikat,sertifikat_URL,sertifikat,status}, index) => ({
            nomor : index+1,
            nama_sertifikat : nama_sertifikat,
            nama_event : nama_event,
            status :[status.nama_status],
            nama_panitia : sertifikat.event.panitia.nama_panitia,
            sertif_URL : sertifikat_URL,
         }))

        return ( 
            <DetailPenandatanganComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                dataPenandatangan={dataPenandatangan}
                data ={data}
                handleOk = {this.handleOk}
                handleCancel = {this.handleCancel}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.penandatangan,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPenandatanganPage);
export default page