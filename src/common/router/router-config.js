// import HomePage from './../../app/example/home-page';
// import Landing from '../layout/landing'
import Auth from '../layout/auth'

import HomePage from '../../app/home/home-page'
import EventPage from '../../app/event/event-page'
<<<<<<< HEAD
import RegisteredPage from '../../app/registered/registered-page'
import LoginPage from '../../app/auth/login-page'
import DetailPage from '../../app/detail/detail-page'
=======

import LoginComponent from '../../app/auth/authlogin-page'
import RegisterComponent from '../../app/auth/authregister-page'

>>>>>>> 8f8b474fa978333f13958a2ba490f058bd0c345f

const baseUrl = process.env.PUBLIC_URL;

const routeSources = [
    { component: HomePage, path: `${baseUrl}/`, exact: true },
    { component: EventPage, path: `${baseUrl}/event`, exact: true },
<<<<<<< HEAD
    { component: RegisteredPage, path: `${baseUrl}/organization`, exact: true },
    { component: LoginPage, path: `${baseUrl}/login`, exact: true },
    { component: DetailPage, path: `${baseUrl}/detail`, exact: true },
=======
    { component: LoginComponent, path: `${baseUrl}/login`, exact: true },
    { component: RegisterComponent, path: `${baseUrl}/register`, exact: true },
>>>>>>> 8f8b474fa978333f13958a2ba490f058bd0c345f
    // { component: ExamplePage, path: `${baseUrl}/example`, exact: true},
];

export default routeSources;