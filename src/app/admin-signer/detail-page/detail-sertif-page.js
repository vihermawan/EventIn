import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import DetailSertifComponent from '../../../modules/admin-signer/e-certificate/detail-certificate-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class DetailSertifPage extends Component {
    state = {
        detail_certificate: [],
        loading : false,
    }

    componentDidMount(){
      this.getDetailSertifikat(this.props.idSertifikat);
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
              title: 'Gambar Sertifikat',
              dataIndex: 'gambar',
              key: 'gambar',
            },
          ];
        
         

        return ( 
            <DetailSertifComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
                // data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    ...state.signed_e_certificate,
    ...state.e_certificate,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailSertifPage);
export default page