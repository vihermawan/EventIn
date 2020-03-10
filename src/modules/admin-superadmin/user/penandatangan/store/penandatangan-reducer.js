import * as actionType from './penandatangan-action-type';

const initialState = {
    loading: false,
    data: [],
    idPenandatangan:null,
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

  

    const setIdPenandatangan = {
        setIdDataPenandatangan: data => ({
            ...currentState,
            idPenandatangan: data
        })
    }

    const setIdUsers = {
        setIdDataUsers : data => ({
            ...currentState,
            idUsers : data
        })
    }


    return {
        ...setIdPenandatangan,
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

    
        case actionType.SET_ID_PENANDATANGAN:
            return handler(state).setIdDataPenandatangan(payload);

        
        case actionType.SET_ID_USERS:
                return handler(state).setIdDataUsers(payload);

        default:
            return state;
    }
};
