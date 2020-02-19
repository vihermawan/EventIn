// import * as actionType from './e-certificate-action-type';
import * as actionType from './e-certificate-action-type';

const initialState = {
    loading: false,
    data: [],
    idSertifikat:null,
};

const handler = (currentState) => {
    const getDataParticipant = {
        startGetDataParticipant: () => ({
            ...currentState,
            loading: true,
        }),
        finishGetDataParticipant: () => ({
            ...currentState,
            loading: false,
        }),
        setDataParticipant: data => ({
            ...currentState,
            data: data
        }),
    };


    const setIdSertifikat = {
        setIdDataSertifikat: data => ({
            ...currentState,
            idSertifikat: data
        })
    }

    return {
        // ...setIdEvent,
        ...setIdSertifikat,
    };
};

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case actionType.START_GET_DATA:
            return handler(state).startGetDataParticipant();
        case actionType.FINISH_GET_DATA:
            return handler(state).finishGetDataParticipant();
        case actionType.SET_DATA:
            return handler(state).setDataParticipant(payload);
        case actionType.SET_ID_SERTIFIKAT:
            return handler(state).setIdDataSertifikat(payload);
    
        
        default:
            return state;
    }
};
