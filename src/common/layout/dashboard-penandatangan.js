import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './style/dashboard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu, Icon,Avatar,Dropdown  } from 'antd';
/*Import Icon */
import { faDesktop,faUserCircle, faEnvelope, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import ButtonAuth from '../component/button/button-auth'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import { API } from '../../common/api'
import CONSTANS from '../utils/Constants'
/*Import Page */
import DashboardSignerPage from '../../app/admin-signer/dashboard/signer-page'
import WaitingListPage from '../../app/admin-signer/dashboard/waiting-page'
import EcertificatePage from '../../app/admin-signer/dashboard/ecertificate-page'
import ProfileSignerPage from '../../app/admin-signer/dashboard/profile-page'
import LoadingContainer from '../../common/component/loading/loading-container'
import DetailSertifPage from '../../app/admin-signer/detail-page/detail-sertif-page'
import EditProfilePage from '../../app/admin-signer/edit-page/edit-profile-page'

const { Header, Sider, Content } = Layout;

class signer extends Component {
  state = {
    username:'',
    profile_picture:'',
    collapsed: false,
    loading : false,
  };

  componentDidMount(){
    const username = localStorage.getItem("username")
    const profile_picture = localStorage.getItem("profile_picture")
    this.setState({ username,profile_picture })
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

  render() {
    const logo = require(`../../assets/images/logo.png`);
    const logoadmin = require(`../../assets/images/En.png`);

    let hidden = this.state.collapsed ? 'hidden-objek' : 'block-objek'

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
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
              <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
                  <div className="title-dashboard">
                      <span className="title-desc-dashboard">REPORT</span>
                  </div>              
                
                  <Menu.Item key="dashboard"  >
                    <Link to="/signer/dashboard-signer">
                  
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
                      <span className="title-desc-dashboard">SIGNATURED</span>
                  </div>  
                  <Menu.Item key="waiting-list"  >
                    <Link to="/signer/waiting-list">
                  
                      <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Waiting List</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="e-certificate"  >
                    <Link to="/signer/e-certificate">
      
                      <FontAwesomeIcon
                          icon={faClipboardCheck}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                    <span className={hidden} >E-Certificate</span>
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
                      <span className="title-desc-dashboard">SETTINGS</span>
                  </div>  
                  <Menu.Item key="profile"  >
                    <Link to="/signer/profile">
                  
                      <FontAwesomeIcon
                          icon={faUserCircle}
                          style={{marginRight: 10}}
                          className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                      />
                      <span className={hidden} >Profile</span>
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
                        <Avatar size={40} icon="user" className="avatars" src={this.state.profile_picture}/>
                        <span className="semi-bold">{this.state.username}</span>
                          <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                              <Icon type="down" style={{marginLeft:"20px", color:"black", fontSize:"13px"}} />
                            </a>
                          </Dropdown>
                        {/* <p>sa</p> */}
                      </div>
                  </Header>
                  <Route
                      path='/signer/dashboard-signer'
                      exact
                      render={ (props) => <DashboardSignerPage {...props}/> }
                  />
                  <Route
                      path='/signer/waiting-list'
                      exact
                      render={ (props) => <WaitingListPage {...props}/> }
                  />
                  <Route
                      path='/signer/e-certificate'
                      exact
                      render={ (props) => <EcertificatePage {...props}/> }
                  />
                  <Route
                      path='/signer/detail/e-certificate'
                      exact
                      render={ (props) => <DetailSertifPage {...props}/> }
                  />
                  <Route
                      path='/signer/profile'
                      exact
                      render={ (props) => <ProfileSignerPage {...props}/> }
                  />
                   <Route
                      path='/signer/edit-profile'
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
    
});

const mapDispatchToProps = (dispatch => ({
    navigate, 
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(signer);
export default page