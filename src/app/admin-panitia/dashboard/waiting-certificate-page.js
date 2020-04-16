import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Divider, Tooltip, } from 'antd';
import { faInfoCircle, faEdit} from '@fortawesome/free-solid-svg-icons'
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
            title: 'Deskripsi',
            dataIndex: 'description',
            key: 'description',
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
            <Tooltip title="Detail">
            <ButtonDashboard
                height={20}
                icon={faInfoCircle}
                borderRadius="5px"
                background="#FFA903"
                onClick = {() => this.getFile(data.nomor,data.sertifikat)}
            />,
            </Tooltip>,
            <Divider type="vertical" />,
            <Tooltip title="Edit">
            <ButtonDashboard
                height={20}
                icon={faEdit}
                borderRadius="5px"
                background="#088C0D"
                onClick = {() => this.onEditCertificate(data.nomor)}
            />,
            </Tooltip>]
            ),
        },
    ];
    
    const data =  this.state.certificate.map( ({id_sertifikat, sertifikat, penandatangan, status}, index) => ({
        no : index+1,
        nomor : id_sertifikat,
        nama_event: sertifikat.event.nama_event,
        description : sertifikat.description,
        sertifikat :sertifikat.sertifikat,
        status : [status.nama_status],        
        sertif_URL : sertifikat.sertif_URL,
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