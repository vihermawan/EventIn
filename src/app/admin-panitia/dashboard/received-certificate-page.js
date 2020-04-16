import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Divider, Tooltip, } from 'antd';
import { faInfoCircle ,faDownload} from '@fortawesome/free-solid-svg-icons'
import CONSTANS from '../../../common/utils/Constants'
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
          console.log('res',res)
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
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
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
        },
        {
            title: 'Nama Event',
            dataIndex: 'nama_event',
            key: 'nama_event',
            render: text => <a>{text}</a>,
            onFilter: (value, record) => record.nama_event.indexOf(value) === 0,
            sorter: (a, b) => a.nama_event.length - b.nama_event.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Penandatangan',
            dataIndex: 'penandatangan',
            key: 'penandatangan',
        },
        {
            title: 'Nomor Induk Pegawai',
            dataIndex: 'nip',
            key: 'nip',
        },
        {
            title: 'File',
            dataIndex: 'sertifikat',
            key: 'sertifikat',
        },
        {
            title: 'Status Sertifikat',
            key: 'status',
            dataIndex: 'status',
            render: sertifikat => (
            <span>
                {sertifikat.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : '#87d068';
                if (tag === 'reject') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                    </Tag>
                );
                })}
            </span>
            ),
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
            [
            <Tooltip title="Download">
                <ButtonDashboard
                    height={20}
                    icon={faDownload}
                    borderRadius="5px"
                    background="#070E57"
                />,
            </Tooltip>,
            <Divider type="vertical" />,
            <Tooltip title="Detail">
                <ButtonDashboard
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick = {() => this.onDetailCertificate(data.sertif_URL)}
                />,
            </Tooltip>]
            ),
        },
    ];
    
    const data =  this.state.certificate.map( ({id_sertifikat, sertifikat, penandatangan, status}, index) => ({
        no : index+1,
        nomor : id_sertifikat,
        nama_event: sertifikat.event.nama_event,
        penandatangan : penandatangan.nama_penandatangan,
        nip : penandatangan.nip,
        sertifikat :sertifikat.sertifikat,
        status : [status.nama_status],    
        sertif_URL :sertifikat.sertif_URL,    
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