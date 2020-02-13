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
    PANITIA: {
        link: '/dashboard/dashboard-panitia',
    },
    ADMIN :{
        link : '/admin/dashboard-admin',
    },
    SIGNER: {
        link :'/signer/dashboard-signer',
    },
    ACTIVE_EVENT: {
        link :'/dashboard/active-event/',
    },
    PARTICIPANT_EVENT: {
        link :'/dashboard/participant-event/',
    },
    DETAIL_EVENT_PANITIA: {
        link : '/dashboard/detail-event',
    },
    DETAIL_SERTIF_PANITIA : {
        link : '/dashboard/detail-e-certificate',
    },

    DETAIL_EVENT_ADMIN: {
        link:'/admin/detail-event'
    },

    DETAIL_PESERTA_ADMIN :{
        link: '/admin/admin-detail-peserta'
    },

    DETAIL_PANITIA_ADMIN : {
        link :'/admin/detail-panitia'
    }
};

export default menu;