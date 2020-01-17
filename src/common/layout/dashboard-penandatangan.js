import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './style/dashboard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu, Icon } from 'antd';
/*Import Icon */
import { faDesktop,faUserCircle, faEnvelope, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

/*Import Page */
import DashboardSignerPage from '../../app/admin-signer/dashboard/signer-page'
import WaitingListPage from '../../app/admin-signer/dashboard/waiting-page'
import EcertificatePage from '../../app/admin-signer/dashboard/ecertificate-page'
import ProfileSignerPage from '../../app/admin-signer/dashboard/profile-page'

const { Header, Sider, Content } = Layout;

class signer extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const logo = require(`../../assets/images/logo.png`);
    const logoadmin = require(`../../assets/images/En.png`);

    let hidden = this.state.collapsed ? 'hidden-objek' : 'block-objek'


    return (
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
              path='/signer/profile'
              exact
              render={ (props) => <ProfileSignerPage {...props}/> }
          />
        </Layout>
      </Layout>
    );
  }
}

export default signer