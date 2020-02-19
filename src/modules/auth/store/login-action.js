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

export const getData = (service, params) => (dispatch) => {
    dispatch(startGetDataParticipant());
    API.get(service, params)
    .then( (res) => {
        console.log(res)
        dispatch(setDataParticipant(res.data));
        dispatch(finishGetDataParticipant());
    })
};

export const setNamaUser = (data) => (dispatch) => {
    dispatch(setNamaDataUser(data));
}