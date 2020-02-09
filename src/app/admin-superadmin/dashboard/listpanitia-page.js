import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import ListPanitiaAdminComponent from '../../../modules/admin-superadmin/user/panitia/listpanitia-component';
//component
import { faUsers, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonDashboard from '../../../common/component/button/button-dashboard';

class ListPanitiaAdminPage extends Component {
    state = { 
        panitia: [],
        loading: false,
    }

    componentDidMount(){
        this.getPanitia();
    }

    getPanitia=()=>{
        this.setState({loading: true})
        API.get(`/admin/showpanitia`)
        .then(res => {
          console.log('res',res.data.data.panitia)
          this.setState({
            panitia:res.data.data.panitia,
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
                title: 'Nama Panitia',
                dataIndex: 'panitia',
                key: 'panitia',
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
                title: 'No Telepon',
                dataIndex: 'no_telepon',
                key: 'no_telepon',
            },
            {
                title: 'Action',
                key: 'action',
                render: () => (
                    [<ButtonDashboard
                        text="Edit"
                        height={20}
                        icon={faPen}
                        borderRadius="5px"
                        background="#005568"
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

        const data =  this.state.panitia.map( data => ({
            nomor : data.id_users,
            panitia : data.panitia.nama_panitia,
            email : data.email,
            organisasi : data.panitia.organisasi,
        }))
        
        return ( 
            <ListPanitiaAdminComponent
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

const page = connect(mapStateToProps, mapDispatchToProps)(ListPanitiaAdminPage);
export default page