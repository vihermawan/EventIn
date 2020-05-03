import * as actionType from './login-action-type';

const initialState = {
    data: [],
    // namaUser : null,
    getNama : null,
};

const handler = (currentState) => {

    const getNamaUser = {
        getNamaDataUser : data => ({
            ...currentState,
            getNama: data
        })
    }

    return {
        // ...setNamaUser,
        ...getNamaUser,
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
        
        // case actionType.SET_NAMA_USER:
        //     return handler(state).setNamaDataUser(payload);

        case actionType.GET_NAMA_USER:
                return handler(state).getNamaDataUser(payload);

        default:
            return state;
    }
};
