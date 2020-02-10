import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, message } from 'antd'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import HistoryEventComponent from '../../../modules/admin-panitia/history-event/history-event-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

const { confirm } = Modal;

class HistoryEventPage extends Component {
    state = {
        eventPast: [],
        loading: false,
    }

    componentDidMount(){
        this.getEventPast();
    }

    getEventPast=()=>{
        this.setState({loading: true})
        API.get(`/panitia/eventPast`)
        .then(res => {
          console.log('res',res.data.data.event)
          this.setState({
            eventPast:res.data.data.event,
            loading: false,
          })
        });
    }

     //function untuk modal
     showDeleteConfirm = (id) => {
      confirm({
          title: 'Apakah Yakin untuk menghapus Data ?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
              this.deleteEvent(id)
          },
          onCancel(){
              console.log('Cancel')
          }
      });
    }

    //delete event
    deleteEvent = (id) => {
      console.log(id)
      API.delete(`/panitia/deleteevent/${id}`)
      .then(res => {
          console.log('res',res)
          if(res.status == 200){
              message.success('Data Berhasil dihapus');
              window.location.reload(); 
          }   
      });
  }

    //button detail event
     onDetailEvent = (id) => {
      console.log('id ini',id)
      this.props.navigate(CONSTANS.DETAIL_EVENT_PANITIA_MENU_KEY)
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
              render: (data) => (
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
                    onClick={ () => this.showDeleteConfirm(data.nomor)}
                />,
                <ButtonDashboard
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick={ () => this.onDetailEvent(data.nomor)}
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