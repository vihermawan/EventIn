import * as actionType from './active-event-action-type';

const initialState = {
    loading: false,
    data: [],
    idEvent: null,
    idKategori: null,
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

    const setIdEvent = {
        setIdDataEvent: data => ({
            ...currentState,
            idEvent: data
        })
    }

    const setIdKategori = {
        setIdDataKategori: data => ({
            ...currentState,
            idKategori: data
        })
    }

    return {
        ...getDataParticipant,
        ...setIdEvent,
        ...setIdKategori,
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

        case actionType.SET_ID_EVENT:
            return handler(state).setIdDataEvent(payload);
        
        case actionType.SET_ID_KATEGORI:
            return handler(state).setIdDataKategori(payload);

        default:
            return state;
    }
};
