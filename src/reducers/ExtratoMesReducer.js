import {
    EXTRATO_MES_FETCH
} from '../actions/types';

const INITIAL_STATE = {
    
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EXTRATO_MES_FETCH: 
            return action.payload;
        default:
            return state;
    }
}