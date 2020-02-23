import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../../common/store/action'
import TabAbsentComponent from '../../../modules/admin-panitia/tab-absent/tab-absent-component';

class TabAbsentPage extends Component {
    state = {
        
    }

    componentDidMount(){
      
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
            <TabAbsentComponent
                initialData={this.state}
                navigate={this.props.navigate}

                columns={columns}
              
                // data={data}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(TabAbsentPage);
export default page