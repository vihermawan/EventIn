import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailParticipantComponent from '../../../modules/admin-panitia/active-event/participant-active-event-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class DetailParticipantPage extends Component {
    state = {
        eventPast: [],
        loading: false,
    }

    componentDidMount(){
        this.getParticipantEvent(this.props.idEvent)
    }

    getParticipantEvent = (id) => {
        API.get(`/panitia/event/${id}/peserta`)
        .then(res => {
          console.log('res',res)
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
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Jenis Kelamin',
                dataIndex: 'jenis_Kelamin',
                key: 'jenis_kelamin',
            },
            {
                title: 'Umur',
                dataIndex: 'umur',
                key: 'umur',
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                [<ButtonDashboard
                    text="Download"
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#070E57"
                    marginRight= "20px"
                />,
                <ButtonDashboard
                    text="Delete"
                    height={20}
                    icon={faTrash}
                    borderRadius="5px"
                    background="#FF0303"
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

        //   const data =  this.state.eventPast.map( data => ({
        //     key: data.id_event,
        //             nomor : data.id_event,
        //             nama_event: data.nama_event,
        //             start_event :data.detail_event.start_event,
        //             lokasi : data.detail_event.lokasi,
        //             kategori : data.detail_event.id_kategori,
        //             peserta : data.detail_event.limit_participant,
        //             tags: ['Done'],
        // }))

        return ( 
            <DetailParticipantComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                // data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailParticipantPage);
export default page