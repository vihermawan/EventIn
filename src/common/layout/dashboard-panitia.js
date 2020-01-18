import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './style/dashboard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu, Icon } from 'antd';
/*Import Icon */
import { faDesktop,faPen, faCalendarCheck, faHistory, faFile,faUserFriends,faUserCircle } from '@fortawesome/free-solid-svg-icons'

/*Import Page */
import DashboardPanitiaPage from '../../app/admin-panitia/dashboard/panitia-page'
import CreateEventPage from '../../app/admin-panitia/dashboard/create-event-page'
import ActiveEventPage from '../../app/admin-panitia/dashboard/active-event-page'
import ECertificatePage from '../../app/admin-panitia/dashboard/e-certificate-page'
import HistoryEventPage from '../../app/admin-panitia/dashboard/history-event-page'
import ListParticipantPage from '../../app/admin-panitia/dashboard/list-participant-page'
import ProfilePage from '../../app/admin-panitia/dashboard/profile-page'

const { Header, Sider, Content } = Layout;

class dashboard extends Component {
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
                  <Link to="/dashboard/dashboard-panitia">
                 
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
                    <span className="title-desc-dashboard">EVENT</span>
                </div>  
                
                <Menu.Item key="create-event">
                  <Link to="/dashboard/create-event">
                    <FontAwesomeIcon
                        icon={faPen}
                        style={{marginRight: 10}}
                    /> 
                    <span className={hidden}>Create Event</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="active-event">
                  <Link to="/dashboard/active-event">
                    <FontAwesomeIcon
                        icon={faCalendarCheck}
                        style={{marginRight: 10}}
                    /> 
                    <span className={hidden}>Active Event</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="history-event">
                  <Link to="/dashboard/history-event">
                    <FontAwesomeIcon
                        icon={faHistory}
                        style={{marginRight: 10}}
                    /> 
                    <span className={hidden}>History Event</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="e-certificate">
                  <Link to="/dashboard/e-certificate">
                    <FontAwesomeIcon
                        icon={faFile}
                        style={{marginRight: 10}}
                    /> 
                    <span className={hidden}>E-certificate</span>
                  </Link>
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
                <Menu.Item key="list-participant">
                  <Link to="/dashboard/list-participant">
                    <FontAwesomeIcon
                        icon={faUserFriends}
                        style={{marginRight: 10}}
                    /> 
                    <span className={hidden}>List Participant</span>
                  </Link>
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
                <Menu.Item key="profile">
                  <Link to="/dashboard/profile">
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        style={{marginRight: 10}}
                    /> 
                    <span className={hidden}>Profile</span>
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
              path='/dashboard/history-event'
              exact
              render={ (props) => <HistoryEventPage {...props}/> }
          />
           <Route
              path='/dashboard/e-certificate'
              exact
              render={ (props) => <ECertificatePage {...props}/> }
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
        </Layout>
      </Layout>
    );
  }
}

export default dashboard