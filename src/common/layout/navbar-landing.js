import React, { Component } from 'react';
import { Drawer, Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons'
// style
import './style/navbar-style.css';
// component
import ButtonIcon from '../component/button/button-icon'
import CONSTANTS from '../utils/Constants';

class Navbar extends Component {
	state = {
		current: '',
		visible: false
	}

	componentDidMount(){
		let pathArray = window.location.pathname.split('/');
		let pathName = pathArray[1];
		pathName === '' ? this.setState({current : 'home'}) : this.setState({current : pathName});
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
                            <Menu.Item key="category" className="ml-30">
                                <Link to='/category'> Category </Link>
                            </Menu.Item>
                            <Menu.Item key="organization" className="ml-30">
                                <Link to='/organization'> Organization </Link>
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
						/>
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
