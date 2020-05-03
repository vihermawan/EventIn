import * as actionType from './users-action-type';

const initialState = {
    loading: false,
    data: [],
    idUsers : null,
};

const handler = (currentState) => {
    const setIdUsers = {
        setIdDataUsers : data => ({
            ...currentState,
            idUsers : data
        })
    }


    return {
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
        case actionType.SET_ID_USERS:
            return handler(state).setIdDataUsers(payload);

        default:
            return state;
    }
};
