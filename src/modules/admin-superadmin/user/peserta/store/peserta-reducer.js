import * as actionType from './peserta-action-type';

const initialState = {
    loading: false,
    data: [],
    idPeserta:null,
    idUsers : null,
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

    const setIdUsers = {
        setIdDataUsers : data => ({
            ...currentState,
            idUsers : data
        })
    }


    return {
        ...setIdPeserta,
        ...setIdUsers,
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
        
        case actionType.SET_ID_USERS:
                return handler(state).setIdDataUsers(payload);

        default:
            return state;
    }
};
