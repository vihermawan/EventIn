import { API } from '../../../../../common/api'
import * as actionType from './panitia-action-type';

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

const setIdDataPanitia = payload => ({
    type : actionType.SET_ID_PANITIA,
    payload,
});

const setIdDataUsers = payload => ({
    type : actionType.SET_ID_USERS,
    payload,
});

export const getData = (service, params) => (dispatch) => {
    dispatch(startGetDataParticipant());
    API.get(service, params)
    .then( (res) => {
        console.log(res)
        dispatch(setDataParticipant(res.data));
        dispatch(finishGetDataParticipant());
    })
};


export const setIdPanitia = (data) => (dispatch => {
    dispatch(setIdDataPanitia(data))
});

export const setIdUsers = (data) => (dispatch => {
    dispatch(setIdDataUsers(data))
});