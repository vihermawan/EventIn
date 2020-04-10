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
		picture:'',
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
		if (token != null){
			this.getProfile();
		}
		window.onunload = () => {
			// Clear the local storage
			localStorage.clear();
		}
		
	}
	

	
    //get data profile dari API.
    getProfile=()=>{
        this.setState({loading: true})
        API.get(`/peserta/edit-profile`)
        .then(res => {
            // console.log('res',res.data.data.user)
            this.setState({
                username : res.data.data.user.peserta.nama_peserta,
                picture:res.data.data.user.peserta.image_URL,
				loading: false,
				isLogin: true,
            })
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
			 this.props.onFinishLoadingHome();
		 });
	}

	handleProfile = () =>{
		this.props.navigate(CONSTANS.PROFILE_MENU_KEY);
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
			  {/* <Menu.Divider /> */}
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
							<Avatar size={40} icon="user" className="avatars" scr={this.state.picture}/>
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
