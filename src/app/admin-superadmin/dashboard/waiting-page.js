import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import WaitingComponent from '../../../modules/admin-superadmin/e-certificate/waiting-list/waiting-list-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class WaitingPage extends Component {
    state = { 
        waitingSertifikat : [],
        loading : false,
    }

    componentDidMount(){
        this.getCertificateAdmin();
    }

    getCertificateAdmin=()=>{
        this.setState({loading: true})
        API.get(`/admin/sertifikat-waiting`)
        .then(res => {
            this.setState({loading: false})
            console.log('res',res.data.data.sertifikat)
            this.setState({waitingSertifikat:res.data.data.sertifikat})
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
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'File',
                dataIndex: 'sertifikat',
                key: 'sertifikat',
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonDashboard
                    text="Send"
                    height={20}
                    icon={faPaperPlane}
                    borderRadius="5px"
                    background="#36FF03"
                    marginRight= "20px"
                />,
                <ButtonDashboard
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                />]
              ),
            },
          ];
        const data =  this.state.waitingSertifikat.map( ({id_sertifikat, event,description, sertifikat}, index) => ({
            no : index+1,
            nomor : id_sertifikat,
            nama_event : event.nama_event,
            nama_panitia : event.panitia.nama_panitia,
            organisasi : event.organisasi,
            description : description,
            sertifikat : sertifikat,
        }))
        

        return ( 
            <WaitingComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                data = {data}
                columns = {columns}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingPage);
export default page