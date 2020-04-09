import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './style/dashboard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
/*Import Icon */
import { faDesktop, faEnvelope, faUserTag, faUserTie, faUserFriends, faEnvelopeOpen, faBookOpen, faEyeDropper } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../common/api'
import CONSTANS from '../utils/Constants'
import ButtonAuth from '../component/button/button-auth'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
/*Import Page */
import DashboardAdminPage from '../../app/admin-superadmin/dashboard/admin-page'
import ListPanitiaAdminPage from '../../app/admin-superadmin/dashboard/listpanitia-page'
import ApprovalEventPage from '../../app/admin-superadmin/dashboard/approvalevent-page'
import PesertaAdminPage from '../../app/admin-superadmin/dashboard/peserta-page'
import PenandatanganAdminPage from '../../app/admin-superadmin/dashboard/penandatangan-page'
import WaitingListPage from '../../app/admin-superadmin/dashboard/waiting-page'
import ReceivedPage from '../../app/admin-superadmin/dashboard/received-page'
import StatusMasterPage from '../../app/admin-superadmin/dashboard/status-master-page'
import KategoriMasterPage from '../../app/admin-superadmin/dashboard/kategori-master-page'
import LoadingContainer from '../../common/component/loading/loading-container'
import BiodataPenandatanganPage from '../../app/admin-superadmin/dashboard/biodata-penandatangan-page'
import DetailPesertaAdminPage from '../../app/admin-superadmin/detail-page/detail-peserta-page'
import DetailPanitiaAdminPage from '../../app/admin-superadmin/detail-page/detail-panitia-page'
import DetailPenandatanganAdminPage from '../../app/admin-superadmin/detail-page/detail-penandatangan-page'
import DetailSertifikatAdminPage from '../../app/admin-superadmin/detail-page/detail-sertif-page'
import DetailEventPage from '../../app/admin-superadmin/detail-page/detail-event-page'
import EditPanitiaPage from '../../app/admin-superadmin/edit-page/edit-panitia-page'
import EditPenandatanganPage from '../../app/admin-superadmin/edit-page/edit-penandatangan-page'
import EditPesertaPage from '../../app/admin-superadmin/edit-page/edit-peserta-page'
import ErrorPage from '../../app/error/error-page';

const { Header, Sider} = Layout;
const { SubMenu } = Menu;

class Admin extends Component {
  state = {
    current: '',
    username : '',
    profile_picture:'',
    collapsed: false,
    loading : false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount(){
    let pathArray = window.location.pathname.split('/');
    let pathName = pathArray[2];
    pathName === '' ? this.setState({current: '/admin'}) : this.setState({current: pathName});
  }

  handleLogout = () => {
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
              <Menu mode="inline" defaultSelectedKeys={['dashboard']} selectedKeys={[this.state.current]}>
                  <div className="title-dashboard">
                      <span className="title-desc-dashboard">REPORT</span>
                  </div>                              
                  <Menu.Item key="dashboard-admin"  onClick={this.clickedMenu}>
                    <Link to="/admin/dashboard-admin">
                    
                      <FontAwesomeIcon
                          icon={faDesktop}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Dashboard</span>
                    </Link>
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
                      <span className="title-desc-dashboard">User</span>
                  </div>  
                  <Menu.Item key="admin-peserta"  onClick={this.clickedMenu}>
                    <Link to="/admin/admin-peserta">
                    
                      <FontAwesomeIcon
                          icon={faUserTag}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Peserta</span>
                    </Link>
                  </Menu.Item>
                  <SubMenu
                      key="sub1"
                      title={
                      <span>
                          <FontAwesomeIcon
                              icon={faUserFriends}
                              style={{marginRight: 10}}
                          />
                          <span className={hidden}>Panitia</span>
                      </span>
                      }
                    >
                      <Menu.Item key="list-panitia" onClick={this.clickedMenu}>
                          <Link to="/admin/list-panitia">
                              <span>List Panitia</span>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="approval-event" onClick={this.clickedMenu}>
                          <Link to="/admin/approval-event">
                              <span>Approval Event</span>
                          </Link>
                      </Menu.Item>
                  </SubMenu>
                  <SubMenu
                      key="sub2"
                      title={
                      <span className={hidden}>
                          <FontAwesomeIcon
                              icon={faUserTie}
                              style={{marginRight: 10}}
                              className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                          />
                          <span className={hidden}>Penandatangan</span>
                      </span>
                      }
                    >
                      <Menu.Item key="admin-penandatangan" onClick={this.clickedMenu}>
                          <Link to="/admin/admin-penandatangan">
                              <span>Daftar</span>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="biodata-penandatangan" onClick={this.clickedMenu}>
                          <Link to="/admin/biodata-penandatangan">
                              <span>Biodata</span>
                          </Link>
                      </Menu.Item>
                  </SubMenu>
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
                      <span className="title-desc-dashboard">Certificate</span>
                  </div>  
                  <Menu.Item key="waiting-list"  onClick={this.clickedMenu}>
                    <Link to="/admin/waiting-list">
                    
                      <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Waiting List</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="received"  onClick={this.clickedMenu}>
                    <Link to="/admin/received">
                    
                      <FontAwesomeIcon
                          icon={faEnvelopeOpen}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Received</span>
                    </Link>
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
                      <span className="title-desc-dashboard">Data Master</span>
                  </div>
                  {/* <Menu.Item key="status"  >
                    <Link to="/admin/status-master">
                    
                      <FontAwesomeIcon
                          icon={faEyeDropper}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Status</span>
                    </Link>
                  </Menu.Item> */}
                  <Menu.Item key="kategori-master" onClick={this.clickedMenu}>
                    <Link to="/admin/kategori-master">
                    
                      <FontAwesomeIcon
                          icon={faBookOpen}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Kategori</span>
                    </Link>
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
                    <Avatar size={40} icon="user" className="avatars" />
                    <span className="semi-bold">ADMIN EVENTIN</span>
                      <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          <Icon type="down" style={{marginLeft:"20px", color:"black", fontSize:"13px"}} />
                        </a>
                      </Dropdown>
                  </div>
                </Header>
                <Route
                    path='/admin/dashboard-admin'
                    exact
                    render={ (props) => <DashboardAdminPage {...props}/> }
                />
                <Route
                    path='/admin/admin-peserta'
                    exact
                    render={ (props) => <PesertaAdminPage {...props}/> }
                />
                <Route
                    path='/admin/admin-detail-peserta'
                    exact
                    render={ (props) => <DetailPesertaAdminPage {...props}/> }
                />
                 <Route
                    path='/admin/edit-peserta'
                    exact
                    render={ (props) => <EditPesertaPage {...props}/> }
                />
                <Route
                    path='/admin/list-panitia'
                    exact
                    render={ (props) => <ListPanitiaAdminPage {...props}/> }
                />
                <Route
                    path='/admin/detail-panitia'
                    exact
                    render={ (props) => <DetailPanitiaAdminPage {...props}/> }
                />
                 <Route
                    path='/admin/edit-panitia'
                    exact
                    render={ (props) => <EditPanitiaPage {...props}/> }
                />
                <Route
                    path='/admin/approval-event'
                    exact
                    render={ (props) => <ApprovalEventPage {...props}/> }
                />
                 <Route
                    path='/admin/detail-event'
                    exact
                    render={ (props) => <DetailEventPage {...props}/> }
                />
                <Route
                    path='/admin/admin-penandatangan'
                    exact
                    render={ (props) => <PenandatanganAdminPage {...props}/> }
                />
                 <Route
                    path='/admin/detail-penandatangan'
                    exact
                    render={ (props) => <DetailPenandatanganAdminPage {...props}/> }
                />
                <Route
                  path = '/admin/edit-penandatangan'
                  exact
                  render = { (props) => <EditPenandatanganPage {...props}/>}
                />
                 <Route
                    path='/admin/biodata-penandatangan'
                    exact
                    render={ (props) => <BiodataPenandatanganPage {...props}/> }
                />
                <Route
                    path='/admin/waiting-list'
                    exact
                    render={ (props) => <WaitingListPage {...props}/> }
                />
                <Route
                    path='/admin/received'
                    exact
                    render={ (props) => <ReceivedPage {...props}/> }
                />
                <Route
                    path='/admin/status-master'
                    exact
                    render={ (props) => <StatusMasterPage {...props}/> }
                />
                <Route
                    path='/admin/kategori-master'
                    exact
                    render={ (props) => <KategoriMasterPage {...props}/> }
                />
                {/* <Route
                    render={ (props) => <ErrorPage/> }
                /> */}
              </Layout>
        </Layout>
      </LoadingContainer>
    );
  }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate, 
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(Admin);
export default page