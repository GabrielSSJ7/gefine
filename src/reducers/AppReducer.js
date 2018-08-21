import {
    GASTOS_FETCH,
    GASTOS_FETCH_ALL,
    ANOS_FETCH,
    LOG_OUT_APP
} from '../actions/types';

const INITIAL_STATE = {
    dadosGastos: []
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case GASTOS_FETCH: 
            return { ...state, dadosGastos: action.payload}

        case LOG_OUT_APP:
            return { state: INITIAL_STATE}
                        
        default:
            return state;
    }
}