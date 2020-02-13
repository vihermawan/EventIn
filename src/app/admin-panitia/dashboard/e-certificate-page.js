import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faInfoCircle ,faDownload} from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ECertificateComponent from '../../../modules/admin-panitia/e-certificate/e-certificate-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdSertifikat } from '../../../modules/admin-panitia/e-certificate/store/e-certificate-action'

class ECertificatePage extends Component {
    state = {  
        certificate: [],
        loading: false,
    }

    componentDidMount(){
        this.getCertificate();
    }

    getCertificate=()=>{
        this.setState({loading: true})
        API.get(`/panitia/event-sertifikat`)
        .then(res => {
          console.log('res',res.data.data.sertifikat)
          this.setState({
              certificate:res.data.data.sertifikat,
              loading: false,
            })
        });
    }

     //button detail event
     onDetailCertificate = (id) => {
        console.log('id ini',id)
        this.props.setIdSertifikat(id);
        this.props.navigate(CONSTANS.DETAIL_SERTIF_PANITIA_MENU_KEY)
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
            title: 'Penandatangan',
            dataIndex: 'penandatangan',
            key: 'penandatangan',
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
            title: 'Status',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
            <span>
                {/* {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : '#87d068';
                if (tag === 'reject') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                    </Tag>
                );
                })} */}
            </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
            [<ButtonDashboard
                text="Download"
                height={20}
                icon={faDownload}
                borderRadius="5px"
                background="#070E57"
                marginRight= "20px"
              
            />,
            <ButtonDashboard
                text="Detail"
                height={20}
                icon={faInfoCircle}
                borderRadius="5px"
                background="#FFA903"
                marginRight= "20px"
                onClick = {() => this.onDetailCertificate(data.nomor)}
            />]
            ),
        },
    ];
    
    const data =  this.state.certificate.map( data => ({
                nomor : data.id_sertifikat,
                nama_event: data.sertifikat.event.nama_event,
                penandatangan : data.penandatangan.nama_penandatangan,
                sertifikat :data.sertifikat.sertifikat,
               
    }))

        return ( 
            <ECertificateComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ECertificatePage);
export default page