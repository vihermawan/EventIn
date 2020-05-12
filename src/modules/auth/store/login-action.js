import { API } from '../../../common/api'
import { notification } from 'antd'
import * as actionType from './login-action-type';

const startGetDataParticipant = () => ({
    type: actionType.START_GET_DATA,
});
const finishGetDataParticipant = () => ({
    type: actionType.FINISH_GET_DATA,
});
const setDataParticipant = payload => ({
    type: actionType.SET_DATA,
    payload,
});

const setNamaDataUser = payload => ({
    type : actionType.SET_NAMA_USER,
    payload,
})

const getNamaDataUser = payload => ({
    type : actionType.GET_NAMA_USER,
    payload,
})

export const getData = (service, params) => (dispatch) => {
    dispatch(startGetDataParticipant());
    API.get(service, params)
    .then( (res) => {
        console.log(res)
        dispatch(setDataParticipant(res.data));
        dispatch(finishGetDataParticipant());
    })
};

export const setNamaUser = (service, params) => (dispatch) => {
    dispatch(setNamaDataUser());
    API.get(`/panitia/profile-edit`)
    .then(res => {
       console.log(res)
       dispatch(setNamaDataUser(res.data.data.user.panitia.nama_panitia));
    });
}

export const getUserData = () => (dispatch) => {
    // dispatch(getNamaDataUser());
    API.get(`/panitia/profile-edit`)
    .then( (res) => {
        console.log(res)
        dispatch(getNamaDataUser(res.data.data.user.panitia.nama_panitia));
    })
};

const setDataUser = payload => ({
    type : actionType.SET_DATA_USER,
    payload,
})
const successNotification = (message, description) => {
    notification.success({
        message,
        description,
    });
};

export const onLogin = (params) => (dispatch) => {
    console.log(params)
    API.post(`/auth/login`, params)
    .then(res => {
        console.log('res',res )
        if(res.status === 200){
            if(res.data.id_role === 2){
                
            }
            else if(res.data.id_role === 1) {
                
            }
            else if(res.data.id_role === 3) {
                console.log('peserta')
                dispatch(setDataUser(res.data))
                successNotification('message', 'description')
            }
            else if(res.data.id_role === 4) {
                
            }
        }else if(res.data.status === 'Banned'){
            alert('Login salah')
            // this.openNotification('Akun telah dibanned', 'Akun anda telah diblokir. Silahkan kirim email ke service.eventin@gmail.com jika menurut anda tidak selayaknya diblokir')
        }else{
            alert('Login salah')
            // this.openNotification('Login Salah', 'Silahkan isi email dan password dengan benar')
        }
        // this.setState({loading: false})
    });
}