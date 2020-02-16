import React, { Component } from 'react';
import { Drawer, Button, Menu,Avatar,Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons'
// style
import './style/navbar-style.css';
// component
import ButtonIcon from '../component/button/button-icon'
import CONSTANTS from '../utils/Constants';
import ButtonAuth from '../component/button/button-auth';

class Navbar extends Component {
	state = {
		current: '',
		visible: false,
		isLogin: false,
	}

	
	componentDidMount(){
		let pathArray = window.location.pathname.split('/');
		let pathName = pathArray[1];
		pathName === '' ? this.setState({current : 'home'}) : this.setState({current : pathName});
		let token = localStorage.getItem("token");
		if (token != null){
			this.setState({isLogin: true})
		}
	}

	handleClick = e => {
		this.setState({ current: e.key });
	};
	showDrawer = () => {
		this.setState({ visible: true });
	};
	onClose = () => {
		this.setState({ visible: false });
	};

	render() {
		const logo = require(`../../assets/images/logo.png`);
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
			<nav className="menuBar">
				<div className="logo-navbar">
					<img src={logo} className="" alt="EventIn logo" width="100"/>
				</div>
				<div className="menuCon">
					<div className="leftMenu ml-50">
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            className="pt-15"
                        >
                            <Menu.Item key="home" className="ml-30">
                                <Link to='/'> Home </Link>
                            </Menu.Item>
                            <Menu.Item key="event" className="ml-30">
                                <Link to='/event'> Event </Link>
                            </Menu.Item>
                            <Menu.Item key="about" className="ml-30">
                                <Link to='/about'> About Us </Link>
                            </Menu.Item>
                        </Menu>
					</div>
					<div className="rightMenu mt-20">
						<ButtonIcon
							text="Login"
							height={20}
							navigate={this.props.navigate}
							target={CONSTANTS.LOGIN_MENU_KEY}
							icon={faUser}
							display={this.state.isLogin ? 'none' : 'block'}
						/>
						 <div className= "avatar"
						 	style={{
								display:`${this.state.isLogin ? 'block' : 'none'}`
							 }}
						 >
							<Avatar size={40} icon="user" className="avatars" />
								<span className="semi-bold">PPSMB PALAPA</span>
								<Dropdown overlay={menu} trigger={['click']}>
									<a className="ant-dropdown-link" href="#">
									<Icon type="down" style={{marginLeft:"20px", color:"black", fontSize:"13px"}} />
									</a>
								</Dropdown>
						</div>
					</div>
					<Button className="barsMenu" type="primary" onClick={this.showDrawer}>
						<span className="barsBtn"></span>
					</Button>
					<Drawer
						title="Menu"
						placement="right"
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}
					>
						<p><Link to='/'> Home </Link></p>
						<p><a href="/event">Event</a></p>
						<p><Link to='/login' className="text-black"> Login </Link></p>
					</Drawer>
				</div>
			</nav>
		);
	}
}

export default Navbar;
