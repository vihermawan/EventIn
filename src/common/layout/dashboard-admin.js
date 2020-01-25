import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './style/dashboard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu, Icon } from 'antd';
/*Import Icon */
import { faDesktop,faUserCircle, faEnvelope, faClipboardCheck, faUserTag, faUserTie, faUserFriends, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

/*Import Page */
import DashboardAdminPage from '../../app/admin-superadmin/dashboard/admin-page'
import ListPanitiaAdminPage from '../../app/admin-superadmin/dashboard/listpanitia-page'
import ApprovalEventPage from '../../app/admin-superadmin/dashboard/approvalevent-page'
import PesertaAdminPage from '../../app/admin-superadmin/dashboard/peserta-page'
import PenandatanganAdminPage from '../../app/admin-superadmin/dashboard/penandatangan-page'
import WaitingListPage from '../../app/admin-superadmin/dashboard/waiting-page'
import ReceivedPage from '../../app/admin-superadmin/dashboard/received-page'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
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
                <Menu.Item key="peserta"  >
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
                    <span className={hidden}>
                        <FontAwesomeIcon
                            icon={faUserFriends}
                            style={{marginRight: 10}}
                            className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                        />
                        Panitia
                    </span>
                    }
                  >
                    <Menu.Item key="list-panitia">
                        <Link to="/admin/list-panitia">
                            <span>List Panitia</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="approval-event">
                        <Link to="/admin/approval-event">
                            <span>Approval Event</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="penandatangan"  >
                  <Link to="/admin/admin-penandatangan">
                    <FontAwesomeIcon
                        icon={faUserTie}
                        style={{marginRight: 10}}
                        className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                    />
                    <span className={hidden} >Penandatangan</span>
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
                    <span className="title-desc-dashboard">Certificate</span>
                </div>  
                <Menu.Item key="waiting-list"  >
                  <Link to="/admin/waiting-list">
                 
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{marginRight: 10}}
                        className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                    />
                    <span className={hidden} >Waiting List</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="received"  >
                  <Link to="/admin/received">
                 
                    <FontAwesomeIcon
                        icon={faEnvelopeOpen}
                        style={{marginRight: 10}}
                        className={this.state.collapsed ? 'hidden-logo' : 'block-logo'}
                    />
                    <span className={hidden} >Received</span>
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
              path='/admin/list-panitia'
              exact
              render={ (props) => <ListPanitiaAdminPage {...props}/> }
          />
           <Route
              path='/admin/approval-event'
              exact
              render={ (props) => <ApprovalEventPage {...props}/> }
          />
          <Route
              path='/admin/admin-penandatangan'
              exact
              render={ (props) => <PenandatanganAdminPage {...props}/> }
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
        </Layout>
      </Layout>
    );
  }
}

export default signer