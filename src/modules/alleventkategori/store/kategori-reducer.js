import * as actionType from './kategori-action-type';

const initialState = {
    loading: false,
    data: [],
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

    const setIdKategori = {
        setIdDataKategori: data => ({
            ...currentState,
            idKategori: data
        })
    }

    return {
        ...getDataParticipant,
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
        
        case actionType.SET_ID_KATEGORI:
            return handler(state).setIdDataKategori(payload);

        default:
            return state;
    }
};
