import { API } from '../../../common/api'
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