import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom'
import './style/dashboard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu, Icon,Avatar,Dropdown } from 'antd';
/*Import Icon */
import { faDesktop,faPen, faCalendarCheck, faHistory, faFile,faUserFriends,faUserCircle, faClipboard, faUserTie, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import ButtonAuth from '../component/button/button-auth'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import { API } from '../../common/api'
import CONSTANS from '../utils/Constants'
/*Import Page */
import DashboardPanitiaPage from '../../app/admin-panitia/dashboard/panitia-page'
import CreateEventPage from '../../app/admin-panitia/dashboard/create-event-page'
import ActiveEventPage from '../../app/admin-panitia/dashboard/active-event-page'
import WaitingCertificatePage from '../../app/admin-panitia/dashboard/waiting-certificate-page'
import ReceivedCertificatePage from '../../app/admin-panitia/dashboard/received-certificate-page'
import HistoryEventPage from '../../app/admin-panitia/dashboard/history-event-page'
import CountRegistEventPage from '../../app/admin-panitia/dashboard/count-regist-event-page'
import ListParticipantPage from '../../app/admin-panitia/dashboard/list-participant-page'
import DetailListParticipantbyEventPage from '../../app/admin-panitia/detail-page/detail-list-participant-byevent-page'
import DetailListParticipantbyHistoryEventPage from '../../app/admin-panitia/detail-page/detail-list-participant-byhistoryevent-page'
import ProfilePage from '../../app/admin-panitia/dashboard/profile-page'
import LoadingContainer from '../../common/component/loading/loading-container'
import DetailEvent from '../../app/admin-panitia/detail-page/detail-event-page'
import DetailHistoryEventPage from '../../app/admin-panitia/detail-page/detail-history-event-page'
import DetailSertifPage from '../../app/admin-panitia/detail-page/detail-sertif-page'
import TemplateSertifPage from '../../app/admin-panitia/dashboard/template-page'
import ListPenandatanganPage from '../../app/admin-panitia/dashboard/list-penandatangan-page'
import CreateBiodataPenandatanganPage from '../../app/admin-panitia/dashboard/create-biodata-penandatangan-page'
import TabAbsentPage from '../../app/admin-panitia/dashboard/tab-absent-page'
import EditEventPage from '../../app/admin-panitia/edit-page/edit-event-page'
import EditProfilePage from '../../app/admin-panitia/edit-page/edit-profile-page'
import EditCertificatePage from '../../app/admin-panitia/edit-page/edit-certificate-page'

const { Header, Sider } = Layout;

class dashboard extends Component {
  state = {
    current: '',
    picture : '',
    nama_panitia : '',
    collapsed: false,
    loading : false,
    username: 'username',
    profile_picture:'',
    no_telepon :'',
    instagram : '',
  };
  
//  async componentWillMount(){
//      const res = await API.get(`/panitia/profile-edit`)
//      console.log(res)
//       const set = await this.setState({
//         nama_panitia : res.data.data.user.panitia.nama_panitia,
//         picture : res.data.data.user.panitia.image_URL,
//         loading: false,
//     })
//     // async function f(){
//     //   const res = await API.get(`/panitia/profile-edit`)
//     //   const set = await this.setState({
//     //     id_panitia : res.data.data.user.panitia.id_panitia,
//     //     nama_panitia : res.data.data.user.panitia.nama_panitia,
//     //     picture : res.data.data.user.panitia.image_URL,
//     //     loading: false,
//     // })
//         // await this.getProfile();
//         // await console.log(res)
//     // }
//     // f();

//   //   (async () => {
//   //     try {
//   //       const res = await API.get(`/panitia/profile-edit`)
//   //     const set = await this.setState({
//   //       id_panitia : res.data.data.user.panitia.id_panitia,
//   //       nama_panitia : res.data.data.user.panitia.nama_panitia,
//   //       picture : res.data.data.user.panitia.image_URL,
//   //       loading: false,
//   //   })
//   //     } catch (e) {
//   //      this.setState({load: false, notify: "error"});
//   //     }
//   //  })();
//     // this.getProfile();
//     // const username = localStorage.getItem("username")
//     // const profile_picture = localStorage.getItem("profile_picture")
//     // this.setState({ username,profile_picture })
//  }

componentDidMount(){
  this.getProfile();
  let pathArray = window.location.pathname.split('/');
  let pathName = pathArray[2];
  pathName === '' ? this.setState({current: '/dashboard'}) : this.setState({current: pathName});
  // window.onbeforeunload = function() {
  //   localStorage.clear();
  // }
}

  getProfile=()=>{
    this.setState({loading: true})
    API.get(`/panitia/profile-edit`)
    .then(res => {
        // console.log('res',res)
        this.setState({
            id_panitia : res.data.data.user.panitia.id_panitia,
            nama_panitia : res.data.data.user.panitia.nama_panitia,
            profile_picture : res.data.data.user.panitia.image_URL,
            no_telepon: res.data.data.user.panitia.no_telepon,
            instagram : res.data.data.user.panitia.instagram,
            loading: false,
        })
    });
}


  handleLogout = e => {
     this.setState({loading: true})
      API.get(`/auth/logout`)
      .then(res => {
          console.log('res',res)
          if(res.status == 200){
              localStorage.clear();
              this.setState({
                loading: false,
              })
              this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
          }
      });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  clickedMenu = e => {
    console.log(e.key)
    this.setState({ current: e.key });
  }

  render() {
    const logo = require(`../../assets/images/logo.png`);
    const logoadmin = require(`../../assets/images/En.png`);
    let hidden = this.state.collapsed ? 'hidden-objek' : 'block-objek'
    const menu = (
      <Menu>
        <Menu.Item key="3">
            <ButtonAuth
                text="Logout"
                className="auth-button-logout"
                style={{borderRadius: '10px',color:'black'}}
                block={true}
                onClick={this.handleLogout}
            />
        </Menu.Item>
      </Menu>
    );
   


    return ( 
     <LoadingContainer loading={this.state.loading}>
        <Layout style={{minHeight: '100vh'}}>    
              <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo">
                  <img src={this.state.collapsed? logoadmin : logo} className={this.state.collapsed ? 'hidden-admin-logo' : 'logo-admin'} alt="EventIn logo" width="100"/>
                </div>
                <div className="menu-dashboard">
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['dashboard-panitia']}
                    selectedKeys={[this.state.current]}
                  >
                      <div className="title-dashboard">
                          <span className="title-desc-dashboard">REPORT</span>
                      </div>              
                      <Menu.Item key="dashboard-panitia" onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/dashboard-panitia">
                          <FontAwesomeIcon
                              icon={faDesktop}
                              style={{marginRight: 10}}
                              className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                          />
                          <span className={hidden} >Dashboard</span>
                        </NavLink>
                      </Menu.Item>
                      <div className="title-dashboard">
                          <hr style={{
                              minHeight: 1,
                              backgroundColor: '#D7D7D7',
                              border: 'none',
                              maxWidth: 200,
                              marginBottom:'10px',
                          }}/>
                      </div>
                      <div className="title-dashboard">
                          <span className="title-desc-dashboard">EVENT</span>
                      </div>  
                      <Menu.Item key="create-event" onClick={this.clickedMenu} style={this.state.no_telepon === 'Silahkan isi' || this.state.instagram === 'Silahkan isi'  ? {display:"none"}:{display:"block"}}>
                        <NavLink to="/dashboard/create-event">
                          <FontAwesomeIcon
                              icon={faPen}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>Create Event</span>
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="active-event" onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/active-event">
                          <FontAwesomeIcon
                              icon={faCalendarCheck}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>Active Event</span>
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="history-event" onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/history-event">
                          <FontAwesomeIcon
                              icon={faHistory}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>History Event</span>
                        </NavLink>
                      </Menu.Item>
                      <div className="title-dashboard">
                          <hr style={{
                              minHeight: 1,
                              backgroundColor: '#D7D7D7',
                              border: 'none',
                              maxWidth: 200,
                              marginBottom:'10px',
                          }}/>
                      </div>

                      <div className="title-dashboard">
                          <span className="title-desc-dashboard">CERTIFICATE</span>
                      </div>  
                      
                      <Menu.Item key="waiting-certificate-event"  onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/waiting-certificate-event">
                          <FontAwesomeIcon
                              icon={faEnvelope}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>Waiting</span>
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="received-certificate-event"  onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/received-certificate-event">
                          <FontAwesomeIcon
                              icon={faEnvelopeOpen}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>Received</span>
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="list-penandatangan" onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/list-penandatangan">
                          <FontAwesomeIcon
                              icon={faUserTie}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>List Signer</span>
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="template-e-certificate" onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/template-e-certificate">
                          <FontAwesomeIcon
                              icon={faClipboard}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>Template</span>
                        </NavLink>
                      </Menu.Item>
                      <div className="title-dashboard">
                          <hr style={{
                              minHeight: 1,
                              backgroundColor: '#D7D7D7',
                              border: 'none',
                              maxWidth: 200,
                          }}/>
                      </div>
                      <div className="title-dashboard">
                          <span className="title-desc-dashboard">PARTICIPANT</span>
                      </div>  
                      <Menu.Item key="list-count-regist" onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/list-count-regist">
                          <FontAwesomeIcon
                              icon={faUserFriends}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>List Participant</span>
                        </NavLink>
                      </Menu.Item>
                      <div className="title-dashboard">
                          <hr style={{
                              minHeight: 1,
                              backgroundColor: '#D7D7D7',
                              border: 'none',
                              maxWidth: 200,
                          }}/>
                      </div>
                      <div className="title-dashboard">
                          <span className="title-desc-dashboard">PROFILE</span>
                      </div> 
                      <Menu.Item key="profile" onClick={this.clickedMenu}>
                        <NavLink to="/dashboard/profile">
                          <FontAwesomeIcon
                              icon={faUserCircle}
                              style={{marginRight: 10}}
                          /> 
                          <span className={hidden}>Profile</span>
                        </NavLink>
                      </Menu.Item>
                  </Menu>
                </div>
              </Sider>
              
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                  <div className= "avatar">
                    <Avatar size={40} icon="user" className="avatars" src={this.state.profile_picture} style={{maxHeight:'100%'}}/>
                        <span className="semi-bold">{this.state.nama_panitia}</span>
                      <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          <Icon type="down" style={{marginLeft:"20px", color:"black", fontSize:"13px"}} />
                        </a>
                      </Dropdown>
                    {/* <p>sa</p> */}
                  </div>
                </Header>
                <Route
                    path='/dashboard/dashboard-panitia'
                    exact
                    render={ (props) => <DashboardPanitiaPage {...props}/> }
                />
                <Route
                    path='/dashboard/create-event'
                    exact
                    render={ (props) => <CreateEventPage {...props}/> }
                />
                <Route
                    path='/dashboard/active-event'
                    exact
                    render={ (props) => <ActiveEventPage {...props}/> }
                />
                <Route
                    path='/dashboard/active-event/detail-list-participant'
                    exact
                    render={ (props) => <DetailListParticipantbyEventPage {...props}/>}
                />
                 <Route
                    path='/dashboard/active-event/participant-event'
                    exact
                    render={ (props) => <TabAbsentPage {...props}/> }
                />
                <Route
                    path='/dashboard/active-event/edit-event'
                    exact
                    render={ (props) => <EditEventPage {...props}/> }
                />
                <Route
                    path='/dashboard/active-event/detail-event'
                    exact
                    render={ (props) => <DetailEvent {...props}/> }
                />
                <Route
                    path='/dashboard/history-event'
                    exact
                    render={ (props) => <HistoryEventPage {...props}/> }
                />
                  <Route
                    path='/dashboard/history-event/detail-event'
                    exact
                    render={ (props) => <DetailHistoryEventPage {...props}/> }
                />
                 <Route
                    path='/dashboard/history-event/detail-list-participant'
                    exact
                    render={ (props) => <DetailListParticipantbyHistoryEventPage {...props}/>}
                />
                <Route
                    path='/dashboard/waiting-certificate-event'
                    exact
                    render={ (props) => <WaitingCertificatePage {...props}/> }
                />
                <Route
                    path='/dashboard/waiting-certificate-event/edit-certificate'
                    exact
                    render={ (props) => <EditCertificatePage {...props}/>}
                />
                 <Route
                    path='/dashboard/received-certificate-event'
                    exact
                    render={ (props) => <ReceivedCertificatePage {...props}/> }
                />
                <Route
                    path='/dashboard/list-penandatangan'
                    exact
                    render={ (props) => <ListPenandatanganPage {...props}/> }
                />
                <Route
                    path='/dashboard/create-biodata-penandatangan'
                    exact
                    render={ (props) => <CreateBiodataPenandatanganPage {...props}/> }
                />
                <Route
                    path='/dashboard/template-e-certificate'
                    exact
                    render={ (props) => <TemplateSertifPage {...props}/> }
                />
                 <Route
                    path='/dashboard/detail-e-certificate'
                    exact
                    render={ (props) => <DetailSertifPage {...props}/> }
                />
                <Route
                    path='/dashboard/list-count-regist'
                    exact
                    render={ (props) => <CountRegistEventPage {...props}/> }
                />
                <Route
                    path='/dashboard/list-participant'
                    exact
                    render={ (props) => <ListParticipantPage {...props}/> }
                />
                <Route
                    path='/dashboard/profile'
                    exact
                    render={ (props) => <ProfilePage {...props}/> }
                />
                 <Route
                    path='/dashboard/edit-profile'
                    exact
                    render={ (props) => <EditProfilePage {...props}/> }
                />
                
              </Layout>
            
        
        </Layout>
       </LoadingContainer>
    );
  }
}

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = (dispatch => ({
    navigate, 
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(dashboard);
export default page