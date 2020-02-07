import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ListParticipantComponent from '../../../modules/admin-panitia/list-participant/list-participant-component';

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

    render() { 

    const columns = [
        {
            title: 'No',
            dataIndex: 'nomor',
            key: 'nomor',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Nama Peserta',
            dataIndex: 'nama_peserta',
            key: 'nama_peserta',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Organisasi',
            dataIndex: 'organisasi',
            key: 'organisasi',
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
            render: () => (
            [<ButtonIcon
                text="Approve"
                height={20}
                icon={faCheckCircle}
                borderRadius="5px"
                background="#00C908"
                marginRight= "20px"
            />,
            <ButtonIcon
                text="Reject"
                height={20}
                icon={faWindowClose}
                borderRadius="5px"
                background="#FF0303"
                marginRight= "20px"
            />]
            ),
        },
    ];

    const data =  this.state.participant.map( data => ({
        nomor : data.id_peserta_event,
        nama_peserta : data.peserta.nama_peserta,
        organisasi : data.peserta.organisasi,
        umur : data.peserta.umur,
                tags: ['Done'],
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