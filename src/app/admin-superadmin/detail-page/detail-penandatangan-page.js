import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import {  faUsers, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailPenandatanganComponent from '../../../modules/admin-superadmin/user/penandatangan/detail-penandatangan-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class DetailPenandatanganPage extends Component {
    state = {
        detail_penandatangan : [],
    }

    componentDidMount(){
        this.getDetailPenandatangan(this.props.idUsers);
        console.log('id users', this.props.idUsers)
    }

    getDetailPenandatangan=(id_users)=>{
        this.setState({loading: true})
        API.get(`/admin/showpenandatangan/${id_users}`)
        .then(res => {
          console.log('res',res)
          this.setState({
            detail_penandatangan:res.data.data.penandatangan,
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
                title: 'Nama Sertifikat',
                dataIndex: 'nama_sertifikat',
                key: 'nama_sertifikat',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Status Sertifikat',
                dataIndex: 'status',
                key: 'status',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Gambar Sertifikat',
                dataIndex: 'gambar',
                key: 'gambar',
            },
          ];

        const dataPenandatangan =  this.state.detail_penandatangan.map( ({id_users, penandatangan}, index) => ({
           nama_penandatangan : penandatangan.nama_penandatangan,
           instansi : penandatangan.instansi,
           nip : penandatangan.nip,
           jabatan : penandatangan.jabatan,
           picture : penandatangan.image_URL,
        }))

        return ( 
            <DetailPenandatanganComponent
                initialData={this.state}
                navigate={this.props.navigate}
                columns={columns}
                dataPenandatangan={dataPenandatangan}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.penandatangan,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPenandatanganPage);
export default page