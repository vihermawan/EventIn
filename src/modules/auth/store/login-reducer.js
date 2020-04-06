import * as actionType from './login-action-type';

const initialState = {
    loading: false,
    data: [],
    namaUser : null,
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



    const setNamaUser = {
        setNamaDataUser : data => ({
            ...currentState,
            namaUser: data
        })
    }

    return {
        ...setNamaUser,
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
        case actionType.SET_NAMA_USER:
            return handler(state).setNamaDataUser(payload);

        default:
            return state;
    }
};
