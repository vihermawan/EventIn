/**
 * @author spindyzel
 * @since 28 Desember 2019
*/

import Auth from '../layout/auth'
import ErrorPage from '../../app/error/error-page'
import HomePage from '../../app/home/home-page'
import PilihanPage from '../../app/pilihan/pilihan-page'
import EventPage from '../../app/event/event-page'
import AllEventPage from '../../app/event/allevent-page'
import AllEventKategoriPage from '../../app/event/alleventkategori-page'
import DetailPage from '../../app/detail/detail-page'
import ProfilePage from '../../app/profile/profile-page'
import EditProfilePage from '../../app/profile/edit-profile-page'
import DashboardPanitiaPage from '../../common/layout/dashboard-panitia'
import LoginComponent from '../../app/auth/authlogin-page'
import RegisterPesertaComponent from '../../app/auth/authregister-page'
import RegisterPanitiaComponent from '../../app/auth/authregisterpanitia-page'
import AboutPage from '../../app/about/about-page'
import SwitchPage from '../../app/list-event/switch-event-page'
import DashboardAdminPage from '../../common/layout/dashboard-admin'
import DashboardPenandatanganPage from '../../common/layout/dashboard-penandatangan'

const baseUrl = process.env.PUBLIC_URL;

const routeSources = [
    { component: HomePage, path: `${baseUrl}/`, exact: true },
    { component: AllEventKategoriPage, path: `${baseUrl}/allkategori`, exact: true },
    { component: EventPage, path: `${baseUrl}/event`, exact: true, private: true },
    { component: AllEventPage, path: `${baseUrl}/allevent`, exact: true,  private: true},
    { component: DetailPage, path: `${baseUrl}/detail`, exact: true,  private: true },
    { component: LoginComponent, path: `${baseUrl}/login`, exact: true },
    { component: PilihanPage, path: `${baseUrl}/choose`, exact: true },
    { component: RegisterPesertaComponent, path: `${baseUrl}/register-peserta`, exact: true },
    { component: RegisterPanitiaComponent, path: `${baseUrl}/register-panitia`, exact: true },
    { component: ProfilePage, path: `${baseUrl}/profile`, exact: true ,private: true},
    { component: EditProfilePage, path: `${baseUrl}/edit-profile`, exact: true ,private: true},
    { component: SwitchPage, path: `${baseUrl}/list-event`, exact: true ,private: true},
    { component: AboutPage, path: `${baseUrl}/about`, exact: false,private: true ,private: true},
    { component: DashboardPanitiaPage, path: `${baseUrl}/dashboard`, exact: false ,private: true},
    { component: DashboardPenandatanganPage, path: `${baseUrl}/signer`, exact: false ,private: true},
    { component: DashboardAdminPage, path:`${baseUrl}/admin`, exact:false ,private: true},
    { component: ErrorPage },
    // { component: ExamplePage, path: `${baseUrl}/example`, exact: true},
];

export default routeSources;