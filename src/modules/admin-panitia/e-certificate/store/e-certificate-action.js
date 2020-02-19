import { API } from '../../../../common/api'
import * as actionType from './e-certificate-action-type';

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

//halaman sertifikat
const setIdDataSertifikat = payload => ({
    type: actionType.SET_ID_SERTIFIKAT,
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

// export const setIdEvent = (data) => (dispatch) => {
//     dispatch(setIdDataEvent(data));
// }

export const setIdSertifikat = (data) => (dispatch) => {
    dispatch(setIdDataSertifikat(data));
}