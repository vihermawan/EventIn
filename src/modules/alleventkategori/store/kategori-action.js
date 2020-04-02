import { API } from '../../../common/api'
import * as actionType from './kategori-action-type';

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

//halaman active event
const setIdDataKategori = payload => ({
    type: actionType.SET_ID_KATEGORI,
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

export const setIdKategori = (data) => (dispatch) => {
    dispatch(setIdDataKategori(data));
}