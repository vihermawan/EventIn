import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faInfoCircle ,faDownload,faUsers, faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import WaitingListComponent from '../../../modules/admin-signer/waiting-list/waiting-list-component';

class WaitingListPage extends Component {
    state = {  
        e_certificate: [],
    }

    componentDidMount(){
        this.getCertificateAdmin();
    }

    getCertificateAdmin=()=>{
        API.get(`/penandatangan/sertifikat/waiting`)
        .then(res => {
          console.log('res',res.data.data.sertifikat)
          this.setState({e_certificate:res.data.data.sertifikat})
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
                title: 'Nama Event',
                dataIndex: 'nama_event',
                key: 'nama_event',
                render: text => <a>{text}</a>,
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
                dataIndex: 'tanggal_event',
                key: 'tanggal_event',
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                [<ButtonIcon
                    text="Signed"
                    height={20}
                    icon={faCheckCircle}
                    borderRadius="5px"
                    background="#004A03"
                    marginRight= "20px"
                />,
                // <ButtonIcon
                //     text="Reject"
                //     height={20}
                //     icon={faWindowClose}
                //     borderRadius="5px"
                //     background="#FF0303"
                //     marginRight= "20px"
                // />,
                <ButtonIcon
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                />]
              ),
            },
          ];
        const data =  this.state.e_certificate.map( data => ({
            nomor : data.id_penandatangan_sertifikat,
            tags: ['Done'],
        }))

        return ( 
            <WaitingListComponent
                navigate={this.props.navigate}
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
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingListPage);
export default page