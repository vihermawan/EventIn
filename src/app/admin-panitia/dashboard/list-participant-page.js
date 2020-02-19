import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Tag,Divider, message } from 'antd'
import { faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ListParticipantComponent from '../../../modules/admin-panitia/list-participant/list-participant-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';


const { confirm } = Modal;

class ListParticipantPage extends Component {
    state = { 
        participant: [],
        loading : false,
    }

    componentDidMount(){
        this.getParticipant();
    }

    getParticipant=()=>{
        this.setState({loading: true})
        API.get(`/panitia/regist-peserta`)
        .then(res => {
          console.log('res',res.data.data)
          this.setState({
              participant:res.data.data.peserta,
              loading: false,
            })
        });
    }

    //approve peserta
    ApprovePeserta = (id_pesertaevent) => {
        this.setState({loading: true})
        console.log(id_pesertaevent)
        API.put(`/panitia/approvepeserta/${id_pesertaevent}`)
        .then(res => {
            console.log('res',res)
            if(res.status == 200){
                message.success('This is a success message');
                this.componentDidMount();
            }   
        });
    }
    

    //function untuk modal
    showAcceptConfirm = (id) => {
        confirm({
            title: ' Apakah yakin untuk approve peserta ?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
               this.ApprovePeserta(id)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }


    
    //function untuk modal
    showRejectConfirm = (id) => {
        confirm({
            title: ' Apakah yakin untuk menolak peserta ?',
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

    render() { 

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Nama Peserta',
            dataIndex: 'nama_peserta',
            key: 'nama_peserta',
            render: text => <a>{text}</a>,
            onFilter: (value, record) => record.nama_peserta.indexOf(value) === 0,
            sorter: (a, b) => a.nama_peserta.length - b.nama_peserta.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Organisasi',
            dataIndex: 'organisasi',
            key: 'organisasi',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Jenis Kelamin',
            dataIndex: 'jenis_kelamin',
            key: 'jenis_kelamin',
        },
        {
            title: 'Umur',
            dataIndex: 'umur',
            key: 'umur',
        },
        {
            title: 'Status Peserta',
            key: 'status',
            dataIndex: 'status',
            render: status => (
            <span>
                {status.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : '#87d068';
                    if (tag === 'Register') {
                        color = '#f50';
                    }else if (tag === 'Registered'){
                        color = '#87d068';
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
                // text="Accept"
                height={20}
                icon={faCheckCircle}
                borderRadius="5px"
                background="#00C908"
                onClick={ () => this.showAcceptConfirm(data.nomor)}
            />,
            <Divider type="vertical" />,
            <ButtonDashboard
                // text="Reject"
                height={20}
                icon={faWindowClose}
                borderRadius="5px"
                background="#FF0303"
             
                onClick={ () => this.showRejectConfirm(data.nomor)}
            />]
            ),
        },
    ];

    const data =  this.state.participant.map( ({id_peserta_event, peserta, status}, index) => ({
        no : index+1,
        nomor : id_peserta_event,
        nama_peserta : peserta.nama_peserta,
        organisasi : peserta.organisasi,
        umur : peserta.umur,
        jenis_kelamin : peserta.jenis_kelamin,
        email : peserta.users.email,
        status : [status.nama_status],
    }))
    
        return ( 
            <ListParticipantComponent
                initialData={this.state}
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

const page = connect(mapStateToProps, mapDispatchToProps)(ListParticipantPage);
export default page