import * as actionType from './peserta-action-type';

const initialState = {
    loading: false,
    data: [],
    idPeserta :null,
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

  

    const setIdPeserta = {
        setIdDataPeserta: data => ({
            ...currentState,
            idPeserta: data
        })
    }

    return {
        ...setIdPeserta,
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

    
        case actionType.SET_ID_PESERTA:
            return handler(state).setIdDataPeserta(payload);

        default:
            return state;
    }
};
