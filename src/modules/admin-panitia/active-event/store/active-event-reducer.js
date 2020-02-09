import * as actionType from './active-event-action-type';

const initialState = {
    loading: false,
    data: [],
    idEvent: null,
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

    return {
        ...getDataParticipant,
        ...setIdEvent,
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

        default:
            return state;
    }
};
