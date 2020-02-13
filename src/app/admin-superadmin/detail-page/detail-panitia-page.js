import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailPanitiaComponent from '../../../modules/admin-superadmin/user/panitia/detail-panitia-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class DetailPanitiaPage extends Component {
    state = {
        
    }

    componentDidMount(){
        this.getDetailPanitia(this.props.idPanitia);
    }

    getDetailPanitia=(id)=>{
        //this.setState({loading: true})
        API.get(`/admin/detail-panitia/admin/${id}`)
        .then(res => {
          console.log('res',res)
        //   this.setState({
        //     eventPast:res.data.data.event,
        //     loading: false,
        //   })
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
              render: (data) => (
                [<ButtonDashboard
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                    onClick={ () => this.showDeleteConfirm(data.nomor)}
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
            <DetailPanitiaComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                // data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.panitia,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPanitiaPage);
export default page