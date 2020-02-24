import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message } from 'antd'
import CONSTANS from '../../../common/utils/Constants'
import { faInfoCircle , faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
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

    getCertificateAdmin=()=>{
        this.setState({loading: true})
        API.get(`/penandatangan/sertifikat/waiting`)
        .then(res => {
          console.log('res',res)
            this.setState({
                e_certificate:res.data.data.sertifikat,
                loading: false,
            })
        });
    }

    //function untuk modal
    showSignedConfirm = (id) => {
        confirm({
            title: ' Apakah anda yakin untuk menandatangani dokumen ini ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               // this.deleteEvent(id)
            },
            onCancel(){
                console.log('Cancel')
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
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonDashboard
                    text="Signed"
                    height={20}
                    icon={faCheckCircle}
                    borderRadius="5px"
                    background="#004A03"
                    marginRight= "20px"
                    onClick = {() => this.showSignedConfirm(data.nomor)}
                />,
                <ButtonDashboard
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick={() => this.onDetailCertificate(data.id_sertif)}
                />]
              ),
            },
          ];
        const data =  this.state.e_certificate.map( ({id_penandatangan_sertifikat, id_sertifikat, sertifikat,tenggang_waktu}, index) => ({
            no : index+1,
            nomor : id_penandatangan_sertifikat,
            id_sertif : id_sertifikat,
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