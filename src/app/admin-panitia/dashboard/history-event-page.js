import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import HistoryEventComponent from '../../../modules/admin-panitia/history-event/history-event-component';

class HistoryEventPage extends Component {
    state = {
        eventPast: [],
    }

    componentDidMount(){
        this.getEventPast();
    }

    getEventPast=()=>{
        API.get(`/panitia/eventPast`)
        .then(res => {
          console.log('res',res.data.data.event)
          this.setState({eventPast:res.data.data.event})
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
              title: 'Kategori',
              dataIndex: 'kategori',
              key: 'kategori',
            },
            {
                title: 'Tempat',
                dataIndex: 'lokasi',
                key: 'lokasi',
            },
            {
              title: 'Peserta',
              dataIndex: 'peserta',
              key: 'peserta',
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
                    text="Download"
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#070E57"
                    marginRight= "20px"
                />,
                <ButtonIcon
                    text="Delete"
                    height={20}
                    icon={faTrash}
                    borderRadius="5px"
                    background="#FF0303"
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
        
          // const data = [
          //   {
          //     key: '1',
          //     Nomor : '1',
          //     Nama_Event: 'UGMTalks',
          //     tanggal_event :'2020-10-11',
          //     tags: ['Done'],
          //   },
          // ];

          const data =  this.state.eventPast.map( data => ({
            key: data.id_event,
                    nomor : data.id_event,
                    nama_event: data.nama_event,
                    start_event :data.detail_event.start_event,
                    lokasi : data.detail_event.lokasi,
                    kategori : data.detail_event.id_kategori,
                    peserta : data.detail_event.limit_participant,
                    tags: ['Done'],
        }))

        return ( 
            <HistoryEventComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(HistoryEventPage);
export default page