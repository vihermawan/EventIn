import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ActiveEventComponent from '../../../modules/admin-panitia/active-event/active-event-component';

//import component
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'

class ActiveEventPage extends Component {
    state = {  
        activeEvent: [],
        rows: [],
    }

    componentDidMount(){
        this.getEvent();
    }

    getEvent=()=>{
        API.get(`/panitia/event`)
        .then(res => {
            console.log('res',res.data.data.event)
            this.setState({activeEvent:res.data.data.event})
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
                title: 'Tempat',
                dataIndex: 'lokasi',
                key: 'lokasi',
            },
            {
                title: 'Kategori',
                dataIndex: 'kategori',
                key: 'kategori',
            },
            {
                title: 'Tanggal Mulai',
                dataIndex: 'start_event',
                key: 'start_event',
            },
            {
                title: 'Tanggal Selesai',
                dataIndex: 'end_event',
                key: 'end_event',
              },
            {
           
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                [<ButtonIcon
                    text="Participant"
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#4D5AF2"
                    marginRight= "20px"
                />,
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
        
        const data =  this.state.activeEvent.map( data => ({
            key: data.id_event,
                    nomor : data.id_event,
                    nama_event: data.nama_event,
                    start_event :data.detail_event.start_event,
                    lokasi : data.detail_event.lokasi,
                    kategori : data.detail_event.id_kategori,
                    end_event : data.detail_event.end_event,
                    tags: ['Done'],
        }))

        // const data = [
        //     {
        //       key: '1',
        //       Nomor : '1',
        //       Nama_Event: 'UGMTalks',
        //       tanggal_event :'2020-10-11',
        //       tags: ['Done'],
        //     },
        //   ];
    
        return ( 
            <ActiveEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ActiveEventPage);
export default page