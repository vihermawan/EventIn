import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './style/dashboard-style.css';

import { Layout, Menu, Icon } from 'antd';

import DashboardPanitiaPage from '../../app/admin-panitia/dashboard/panitia-page'
import CreateEventPage from '../../app/admin-panitia/dashboard/create-event-page'
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
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <div className="menu-dashboard">
            <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
                <Menu.Item key="dashboard">
                  <Link to="/dashboard/dashboard-panitia">
                    <Icon type="user" />
                    <span>Dashboard</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="create-event">
                  <Link to="/dashboard/create-event">
                    <Icon type="video-camera" />
                    <span>Create Event</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="active-event">
                  <Link to="/dashboard/active-event">
                    <Icon type="upload" />
                    <span>Active Event</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="history-event">
                  <Link to="/dashboard/history-event">
                    <Icon type="upload" />
                    <span>History Event</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="e-certificate">
                  <Link to="/dashboard/e-certificate">
                    <Icon type="upload" />
                    <span>E-certificate</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="list-participant">
                  <Link to="/dashboard/list-participant">
                    <Icon type="upload" />
                    <span>List Participant</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="profile">
                  <Link to="/dashboard/profile">
                    <Icon type="upload" />
                    <span>Profile</span>
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