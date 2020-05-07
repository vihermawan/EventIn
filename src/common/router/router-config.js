/**
 * @author spindyzel
 * @since 28 Desember 2019
*/
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
import EditPasswordPage from '../../app/profile/edit-password-page'
import SetPasswordPage from '../../app/set-password/set-password-page'
import ForgotPasswordPage from '../../app/forgot-password/forgot-password-page'
import SetPasswordPenandatanganPage from '../../app/admin-signer/dashboard/set-password-penandatangan-page'

const baseUrl = process.env.PUBLIC_URL;

const routeSources = [
    //user
    { component: HomePage, path: `${baseUrl}/`, exact: true },
    { component: SetPasswordPage, path: `${baseUrl}/set-password`, exact: false },
    { component: ForgotPasswordPage, path: `${baseUrl}/forgot-password`, exact: false },
    { component: AllEventKategoriPage, path: `${baseUrl}/allkategori`, exact: true },
    { component: LoginComponent, path: `${baseUrl}/login`, exact: true },
    { component: PilihanPage, path: `${baseUrl}/choose`, exact: true },
    { component: RegisterPesertaComponent, path: `${baseUrl}/register-peserta`, exact: true },
    { component: RegisterPanitiaComponent, path: `${baseUrl}/register-panitia`, exact: true },
    { component: EventPage, path: `${baseUrl}/event`, exact: true, private: true, role: 3},
    { component: AllEventPage, path: `${baseUrl}/allevent`, exact: true,  private: true, role: 3},
    { component: DetailPage, path: `${baseUrl}/detail`, exact: true,  private: true, role: 3 },
    { component: ProfilePage, path: `${baseUrl}/profile`, exact: true ,private: true, role: 3},
    { component: EditProfilePage, path: `${baseUrl}/edit-profile`, exact: true ,private: true, role: 3},
    { component: SwitchPage, path: `${baseUrl}/list-event`, exact: true ,private: true, role: 3},
    { component: AboutPage, path: `${baseUrl}/about`, exact: false,private: true, role: 3},
    { component: EditPasswordPage, path: `${baseUrl}/edit-password`, exact: false,private: true, role: 3},
    //panitia
    { component: DashboardPanitiaPage, path: `${baseUrl}/dashboard`, exact: false ,private: true, role: 2},
    //penandatangan
    { component: DashboardPenandatanganPage, path: `${baseUrl}/signer`, exact: false ,private: true, role: 4},
    { component: SetPasswordPenandatanganPage, path: `${baseUrl}/set-password-signer`, exact: false },
    //admin
    { component: DashboardAdminPage, path:`${baseUrl}/admin`, exact:false ,private: true, role: 1},
    { component: ErrorPage },
    // { component: ExamplePage, path: `${baseUrl}/example`, exact: true},
];

export default routeSources;