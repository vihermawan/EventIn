import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../../common/component/button/button-icon'
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ECertificateComponent from '../../../modules/admin-signer/e-certificate/e-certificate-component';

class ECertificatePage extends Component {
    state = {  
        e_certificate: [],
    }

    componentDidMount(){
        this.getCertificateAdmin();
    }

    getCertificateAdmin=()=>{
        API.get(`/penandatangan/sertifikat/waiting`)
        .then(res => {
          console.log('res',res)
        //   this.setState({certificate:res.data.data.sertifikat})
        });
    }

    render() { 

        const columns = [
            {
                title: 'No',
                dataIndex: 'Nomor',
                key: 'Nomor',
                render: text => <a>{text}</a>,
            },
            {
              title: 'Nama Event',
              dataIndex: 'Nama_Event',
              key: 'Nama_Event',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Tempat',
              dataIndex: 'tanggal_event',
              key: 'tanggal_event',
            },
            {
              title: 'Kategori',
              dataIndex: 'tanggal_event',
              key: 'tanggal_event',
            },
            {
              title: 'Tanggal Mulai',
              dataIndex: 'tanggal_event',
              key: 'tanggal_event',
            },
            {
                title: 'Tanggal Selesai',
                dataIndex: 'tanggal_event',
                key: 'tanggal_event',
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
        const data = [
            {
              key: '1',
              Nomor : '1',
              Nama_Event: 'UGMTalks',
              tanggal_event :'2020-10-11',
              tags: ['Done'],
            },
          ];

        return ( 
            <ECertificateComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ECertificatePage);
export default page