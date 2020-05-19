import React, { Component } from 'react';
import { Drawer, Button, Menu,Avatar,Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../common/api'
import CONSTANS from '../utils/Constants'
// style
import './style/navbar-style.css';
// component
import ButtonIcon from '../component/button/button-icon'
import CONSTANTS from '../utils/Constants';
import ButtonAuth from '../component/button/button-auth';

class Navbar extends Component {
	state = {
		current: '',
		username :'username',
		profile_picture : '',
		visible: false,
		isLogin: false,
		loading: false,
		isAuthenticated:'',
	}

	componentDidMount(){
		let pathArray = window.location.pathname.split('/');
		let pathName = pathArray[1];
		pathName === '' ? this.setState({current : 'home'}) : this.setState({current : pathName});

		let token = localStorage.getItem("token");
		let username_peserta = localStorage.getItem("username");
		let profile_picture = localStorage.getItem("profile_picture");
		if (token !== null){
			this.setState({username : username_peserta, profile_picture : profile_picture, isLogin: true })
			this.getProfile();
			this.setTimeOut();
		}
		
		
	}

	setTimeOut = () => {
		setTimeout(function(){localStorage.clear();}, 1000 * 60 * 60 * 24);
	}
		
    //get data profile dari API.
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/peserta/edit-profile`)
        .then(res => {
			let username_peserta = localStorage.getItem("username");
			let profile_picture = localStorage.getItem("profile_picture");
			if ((res.data.data.user.peserta.nama_peserta !== username_peserta) || (res.data.data.user.peserta.image_URL !== profile_picture)){
				localStorage.setItem('username', res.data.data.user.peserta.nama_peserta)
				localStorage.setItem('profile_picture', res.data.data.user.peserta.image_URL)
				let username_peserta = localStorage.getItem("username");
				let profile_picture = localStorage.getItem("profile_picture");
				this.setState({username : username_peserta, profile_picture : profile_picture,isLogin: true })
				}
			});
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

	handleLogout = e => {
		this.props.onStartLoadingHome();
		this.setState({loading: true})
		 API.post(`/auth/logout`)
		 .then(res => {
			 if(res.status === 200){
				 localStorage.clear();
				 this.setState({
				   loading: false,
				 })
				 this.props.navigate(CONSTANS.LOGIN_MENU_KEY)
			 }
			 this.props.onFinishLoadingHome();
		 });
	}

	handleProfile = () =>{
		this.props.navigate(CONSTANS.PROFILE_MENU_KEY);
	}
	
	handleListEvent = () => {
		this.props.navigate(CONSTANS.LIST_EVENT_MENU_KEY);
	}

	handleDoneEvent = () => {

	}

	render() {
		const logo = require(`../../assets/images/logo.png`);
		const menu = (
			<Menu>
			  <Menu.Item key="1">
			  	<ButtonAuth
					  text="Profil"
					  className="auth-button-logout"
					  style={{borderRadius: '10px',color:'black'}}
					  block={true}
					  onClick={this.handleProfile}
				  />
			  </Menu.Item>
			  <Menu.Item key="2">
			  	<ButtonAuth
					  text="Riwayat Event"
					  className="auth-button-logout"
					  style={{borderRadius: '10px',color:'black'}}
					  block={true}
					  onClick={this.handleListEvent}
				  />
			  </Menu.Item>
			  <Menu.Item key="3">
				  <ButtonAuth
					  text="Keluar"
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
                                <Link to='/'> Beranda </Link>
                            </Menu.Item>
                            <Menu.Item key="event" className="ml-30">
                                <Link to='/event'> Event </Link>
                            </Menu.Item>
                            <Menu.Item key="about" className="ml-30">
                                <Link to='/about'> Tentang Kami </Link>
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
							<Avatar size={40} icon="user" className="avatars" src={this.state.profile_picture}/>
								<span className="semi-bold">{this.state.username}</span>
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
						<p><Link to='/'> Beranda </Link></p>
						<p><a href="/event">Event</a></p>
						<p><Link to='/login' className="text-black"> Masuk </Link></p>
					</Drawer>
				</div>
			</nav>
		);
	}
}

export default Navbar;
