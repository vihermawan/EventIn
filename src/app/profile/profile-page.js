import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { navigate } from '../../common/store/action'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import CONSTANS from '../../common/utils/Constants'
import { API } from '../../common/api'
//import component
import ProfileComponent from '../../modules/profile/component/profile-component';
import ButtonDashboard from '../../common/component/button/button-dashboard';

//import store
import { setIdUsers } from '../../modules/admin-superadmin/user/store/users-action'

class ProfilePage extends Component {
    state = { 
        user : [],
        peserta:[],
        sizeEvent : '',
        eventPeserta : [],
        loadingHome: false,
    }

    componentDidMount(){
        this.getProfile();
        this.getProfileEvent();
    }

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })

    //get data profile dari API
    getProfile=()=>{
        this.setState({loadingHome: true})
        API.get(`/peserta/profile`)
        .then(res => {
            console.log('res',res.data.data.user)
            this.setState({
                user:res.data.data.user,
                loadingHome: false,
            })
        });
    }
    
    //get data tabel dari API
    getProfileEvent=()=>{
      this.setState({loading: true})
      API.get(`/peserta/profile/event`)
      .then(res => {
          console.log('res',res)
          this.setState({
              eventPeserta :res.data.data.user,
              sizeEvent : res.data.size,
              loading : false,
          })
      });
    }

    onEditPeserta = (id_users) => {
      this.props.setIdUsers(id_users)
      this.props.navigate(CONSTANS.EDIT_PROFILE_MENU_KEY)
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
                title: 'Panitia',
                dataIndex: 'panitia',
                key: 'panitia',
            },
            {
                title: 'Sertifikat',
                dataIndex: 'sertifikat',
                key: 'sertifikat',
            },
            {
              title: 'Status Peserta',
              key: 'status',
              dataIndex: 'status',
              render: status => (
                <span>
                  {status.map(tag => {
                    let color = status.length > 5 ? 'geekblue' : '#87d068';
                    if (tag === 'reject') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </span>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                [<ButtonDashboard
                    text="Download"
                    height={20}
                    icon={faUser}
                    borderRadius="5px"
                    background="#070E57"
                    marginRight= "20px"
                />,
                <ButtonDashboard
                    text="Delete"
                    height={20}
                    icon={faUser}
                    borderRadius="5px"
                    background="#FF0303"
                />]
              ),
            },
          ];
        const data = this.state.eventPeserta.map( ({status, event}, index) => ({
            nomor : index+1,
            nama_event : event.nama_event,
            sertifikat : event.sertifikat.sertifikat,
            panitia : event.panitia.nama_panitia,
            status : [status.nama_status],
      }))

          

        const dataProfile =  this.state.user.map( ({id_users, email, peserta}, index) => ({
            id_users : id_users,
            email : email,
            nama_peserta : peserta.nama_peserta,
            tanggal_lahir : peserta.tanggal_lahir,
            jenis_kelamin : peserta.jenis_kelamin,
            pekerjaan : peserta.pekerjaan,
            no_telefon : peserta.no_telefon,
            picture : peserta.image_URL,
        }))

        return ( 
            <ProfileComponent
                navigate={this.props.navigate}
                initialData={this.state}
                columns = {columns}
                data = {data}
                dataProfile = {dataProfile}
                onEditPeserta = {this.onEditPeserta}
                onStartLoadingHome={this.onStartLoadingHome}
                onFinishLoadingHome={this.onFinishLoadingHome}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    setIdUsers,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default page