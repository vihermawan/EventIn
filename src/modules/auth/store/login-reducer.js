import * as actionType from './login-action-type';

const initialState = {
    data: [],
    // namaUser : null,
    getNama : null,
    dataUser: {}
};

const handler = (currentState) => {

    const getNamaUser = {
        getNamaDataUser : data => ({
            ...currentState,
            getNama: data
        }),
    }
    const getDataUser = {
        setDataUser: data => ({
            ...currentState,
            dataUser: data
        })
    }

    return {
        // ...setNamaUser,
        ...getNamaUser,
        ...getDataUser
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

        case actionType.SET_DATA_USER:
                return handler(state).setDataUser(payload);

        default:
            return state;
    }
};
