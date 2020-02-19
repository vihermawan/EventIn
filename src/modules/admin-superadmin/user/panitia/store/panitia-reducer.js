import * as actionType from './panitia-action-type';

const initialState = {
    loading: false,
    data: [],
    idPanitia : null,
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

    const setIdPanitia = {
        setIdDataPanitia : data => ({
            ...currentState,
            idPanitia : data
        })
    }

    return {
        ...setIdPanitia,
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

    
      
        case actionType.SET_ID_PANITIA:
            return handler(state).setIdDataPanitia(payload);

        default:
            return state;
    }
};
