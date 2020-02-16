import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Tag } from 'antd'
import CONSTANS from '../../../common/utils/Constants'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ECertificateComponent from '../../../modules/admin-signer/e-certificate/e-certificate-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdSertifikat } from '../../../modules/admin-panitia/e-certificate/store/e-certificate-action'


class ECertificatePage extends Component {
    state = {  
        signed_e_certificate: [],
        loading : false,
    }

    //button detail certificate
    onDetailCertificate = (id) => {
      console.log('id ini',id)
      this.props.setIdSertifikat(id);
      this.props.navigate(CONSTANS.DETAIL_SERTIF_SIGNER_MENU_KEY)
    }

    componentDidMount(){
        this.getCertificateAdmin();
    }

    getCertificateAdmin=()=>{
        this.setState({loading: true})
        API.get(`/penandatangan/sertifikat/signed`)
        .then(res => {
          this.setState({loading: false})
          console.log('res',res.data.data.sertifikat)
          this.setState({signed_e_certificate:res.data.data.sertifikat})
        });
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
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Nama Panitia',
                dataIndex: 'nama_panitia',
                key: 'nama_panitia',
            },
            {
                title: 'Organisasi',
                dataIndex: 'organisasi',
                key: 'organisasi',
            },
            {
                title: 'File',
                dataIndex: 'sertifikat',
                key: 'sertifikat',
            },
            {
                title: 'Tenggang Waktu',
                dataIndex: 'tenggang_waktu',
                key: 'tenggang_waktu',
            },
            {
              title: 'Status',
              key: 'status',
              dataIndex: 'status',
              render: status => (
                <span>
                  {status.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : '#87d068';
                    if (tag === 'reject') {
                      color = 'volcano';
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
                [<ButtonDashboard
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick = {() => this.onDetailCertificate(data.id_sertif)}
                />]
              ),
            },
          ];
        
        const data =  this.state.signed_e_certificate.map( ({id_penandatangan_sertifikat, id_sertifikat,sertifikat,tenggang_waktu,status}, index) => ({
            no : index+1,
            nomor : id_penandatangan_sertifikat,
            id_sertif : id_sertifikat,
            nama_event : sertifikat.event.nama_event,
            nama_panitia : sertifikat.event.panitia.nama_panitia,
            organisasi : sertifikat.event.organisasi,
            sertifikat : sertifikat.sertifikat,
            status : [status.nama_status],
            tenggang_waktu : tenggang_waktu,
        }))

        return ( 
            <ECertificateComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ECertificatePage);
export default page