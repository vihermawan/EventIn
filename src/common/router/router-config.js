// import HomePage from './../../app/example/home-page';
// import Landing from '../layout/landing'
import Auth from '../layout/auth'

import HomePage from '../../app/home/home-page'
import EventPage from '../../app/event/event-page'
import RegisteredPage from '../../app/registered/registered-page'

const baseUrl = process.env.PUBLIC_URL;

const routeSources = [
    { component: HomePage, path: `${baseUrl}/`, exact: true },
    { component: EventPage, path: `${baseUrl}/event`, exact: true },
    { component: RegisteredPage, path: `${baseUrl}/organization`, exact: true },
    { component: Auth, path: `${baseUrl}/login`, exact: true },
    // { component: ExamplePage, path: `${baseUrl}/example`, exact: true},
];

export default routeSources;