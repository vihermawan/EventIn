/**
 * @author spindyzel
 * @since 28 Desember 2019
*/

const menu = {
    HOME: {
        link: '/',
    },
    LOGIN: {
        link: '/login',
    },
    CHOOSE :{
        link : '/choose'
    },
    DETAIL_EVENT: {
        link : '/detail'
    },
    ALL_EVENT: {
        link : '/allevent'
    },
    ALL_KATEGORI: {
        link : '/allkategori'
    },
    LIST_EVENT : {
        link : '/list-event'
    },
    PROFILE:{
        link : '/profile'
    },
    EDIT_PROFILE : {
        link : '/edit-profile'
    },
    EDIT_PASSWORD : {
        link : '/edit-password'
    },
    REGISTER_PESERTA : {
        link : '/register-peserta'
    },
    REGISTER_PANITIA : {
        link : '/register-panitia'
    },
    FORGET_PASSWORD : {
        link : '/forgot-password'
    },

    //Link panitia
    PANITIA: {
        link: '/dashboard/dashboard-panitia',
    },
    PROFILE_ADMIN_PANITIA : {
        link : '/dashboard/profile/',
    },
    
    //active event
    ACTIVE_EVENT: {
        link :'/dashboard/active-event/',
    },
    PARTICIPANT_EVENT: {
        link :'/dashboard/active-event/participant-event/',
    },
    DETAIL_LIST_PARTICIPANT_EVENT: {
        link : '/dashboard/active-event/detail-list-participant',
    },
    DETAIL_EVENT_PANITIA: {
        link : '/dashboard/active-event/detail-event',
    },
    EDIT_EVENT_PANITIA: {
        link : '/dashboard/active-event/edit-event',
    },

    //history event
    DETAIL_LIST_PARTICIPANT_HISTORY_EVENT: {
        link : '/dashboard/history-event/detail-list-participant',
    },
    DETAIL_HISTORY_EVENT_PANITIA: {
        link : '/dashboard/history-event/detail-event',
    },

    LIST_PARTICIPANT_EVENT: {
        link : '/dashboard/list-count-regist/list-participant',
    },
   
    LIST_BIODATA_PENANDATANGAN : {
        link : '/dashboard/list-penandatangan/',
    },
    CREATE_BIODATA_PENANDATNAGAN: {
        link : '/dashboard/list-penandatangan/create-biodata-penandatangan',
    },
    EDIT_PROFILE_PANITIA : {
        link : '/dashboard/profile/edit-profile',
    },
    EDIT_PASSWORD_PANITIA : {
        link : '/dashboard/profile/edit-password'
    },
   
    DETAIL_EVENT_PARTICIPANT_PANITIA : {
        link : '/dashboard/participant/detail-event'
    },    
    DETAIL_SERTIF_PANITIA : {
        link : '/dashboard/detail-e-certificate',
    },
    //sertifikat panitia
    WAITING_SERTIF_PANITIA : {
        link : '/dashboard/waiting-certificate-event/',
    },
    PENGAJUAN_SERTIF_PANITIA : {
        link : '/dashboard/upload-sertifikat',
    },
    EDIT_SERTIF_PANITIA : {
        link : '/dashboard/waiting-certificate-event/edit-certificate',
    },
    LIST_SERTIF_PANITIA : {
        link : '/dashboard/waiting-certificate-event/list-waiting-certificate',
    },

    //link admin
    ADMIN :{
        link : '/admin/dashboard-admin',
    },
    BIODATA_PENANDATANGAN_ADMIN : {
        link :'/admin/admin-penandatangan',
    },  
    EDIT_PROFILE_PESERTA: {
        link : '/admin/edit-peserta',
    },
    DETAIL_LIST_ALL_EVENT : {
        link : '/admin/detail-list-all-event'
    },
    DETAIL_APPROVAL_EVENT : {
        link : '/admin/approval-event/detail-approval-event'
    },
    DETAIL_EVENT_ADMIN: {
        link:'/admin/detail-event'
    },
    DETAIL_PENANDATANGAN_ADMIN : {
        link :'/admin/detail-penandatangan'
    },
    DETAIL_PESERTA_ADMIN :{
        link: '/admin/list-peserta/detail-peserta'
    },
    DETAIL_PESERTA_EVENT : {
        link :'/admin/list-peserta/detail-event'
    },
    DETAIL_PANITIA_ADMIN : {
        link :'/admin/list-panitia/detail-panitia'
    },
    DETAIL_WAITING_SERTIFIKAT_EVENT : {
        link : '/admin/waiting-list/detail-waiting-list'
    },
    EDIT_PANITIA_ADMIN : {
        link : '/admin/edit-panitia'
    },
    EDIT_PENANDATANGAN_ADMIN : {
        link : '/admin/edit-penandatangan'
    },
    DAFTAR_PENANDATANGAN : {
        link : '/admin/admin-penandatangan/'
    },

    //penandatangan
    SIGNER: {
        link :'/signer/dashboard-signer',
    },
    LIST_WAITING_SERTIFIKAT_ADMIN : {
        link : '/signer/total-waiting-list/waiting-list',
    },
    PROFILE_SIGNER : {
        link : '/signer/profile',
    },
    DETAIL_SERTIF_SIGNER: {
        link : '/signer/detail/e-certificate'
    },
    EDIT_PROFILE_SIGNER : {
        link : '/signer/profile/edit-profile'
    },
    EDIT_PASSWORD_SIGNER : {
        link : '/signer/profile/edit-password'
    }
   
};

export default menu;