import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, message, Tag, Divider } from 'antd'
import { navigate } from '../../../common/store/action'
import { API } from '../../../common/api'
import ReceivedComponent from '../../../modules/admin-superadmin/e-certificate/received/received-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

const {confirm} = Modal;

class ReceivedPage extends Component {
    state = { 
        received : [],
        loading : false,
     }

    componentDidMount(){
      this.getCertificateReceived();
    }

    getCertificateReceived=()=>{
        this.setState({loading: true})
        API.get(`/admin/sertifikat-signed`)
        .then(res => {
          this.setState({loading: false})
          this.setState({received:res.data.data.sertifikat})
        });
    }

    //function untuk modal.
    showSendConfirm = (id) => {
        confirm({
            title: 'Yakin untuk mengirim file ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               // this.deleteEvent(id)
            },
            onCancel(){
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
                title: 'Dari',
                dataIndex: 'nama_panitia',
                key: 'nama_panitia',
            },
            {
              title: 'Instansi',
              dataIndex: 'organisasi',
              key: 'organisasi',
            },
            {
              title: 'Untuk',
              dataIndex: 'penandatangan',
              key: 'penandatangan',
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
                />]
              ),
            },
          ];
       
        const data =  this.state.received.map( ({id_penandatangan_sertifikat, id_sertifikat,sertifikat,tenggang_waktu,status,penandatangan}, index) => ({
            no : index+1,
            nomor : id_penandatangan_sertifikat,
            id_sertif : id_sertifikat,
            nama_event : sertifikat.event.nama_event,
            nama_panitia : sertifikat.event.panitia.nama_panitia,
            organisasi : sertifikat.event.organisasi,
            penandatangan : penandatangan.nama_penandatangan,
            status : [status.nama_status],
            tenggang_waktu : tenggang_waktu,
        }))

        return ( 
            <ReceivedComponent
                navigate={this.props.navigate}
                data = {data}
                columns = {columns}
                initialData = {this.state}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ReceivedPage);
export default page