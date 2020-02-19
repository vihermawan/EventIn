import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, message, Divider } from 'antd'
import CONSTANS from '../../../common/utils/Constants'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import HistoryEventComponent from '../../../modules/admin-panitia/history-event/history-event-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

// import store
import { setIdEvent } from '../../../modules/admin-panitia/active-event/store/active-event-action'

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
      this.props.setIdEvent(id);
      this.props.navigate(CONSTANS.DETAIL_EVENT_PANITIA_MENU_KEY)
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
              sortDirections: ['descend'],
            },
            {
              title: 'Kategori',
              dataIndex: 'kategori',
              key: 'kategori',
              render: kategori => (
                <span>
                  {kategori.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag}
                      </Tag>
                    );
                  })}
                </span>
            ),
            onFilter: (value, record) => record.kategori.indexOf(value) === 0,
            sorter: (a, b) => a.kategori.length - b.kategori.length,
            sortDirections: ['descend'],
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
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonDashboard
                    text="Download"
                    height={20}
                    icon={faUsers}
                    borderRadius="5px"
                    background="#070E57"
                    // marginRight= "20px"
                />,
                <Divider type="vertical" />,
                <ButtonDashboard
                    text="Delete"
                    height={20}
                    icon={faTrash}
                    borderRadius="5px"
                    background="#FF0303"
                    // marginRight= "20px"
                    onClick={ () => this.showDeleteConfirm(data.nomor)}
                />,
                <Divider type="vertical" />,
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

          const data =  this.state.eventPast.map( ({id_event, nama_event, detail_event, kategori}, index) => ({
                    no : index+1,
                    nomor : id_event,
                    nama_event: nama_event,
                    start_event :detail_event.start_event,
                    lokasi : detail_event.lokasi,
                    kategori : [kategori.nama_kategori],
                    peserta : detail_event.limit_participant,
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
    setIdEvent,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(HistoryEventPage);
export default page