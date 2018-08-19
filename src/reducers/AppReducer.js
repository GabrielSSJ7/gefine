import {
    GASTOS_FETCH,
    GASTOS_FETCH_ALL
} from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GASTOS_FETCH: 
            return action.payload;
        
        case GASTOS_FETCH_ALL: 
            return action.payload;
                        
        default:
            return { state }
    }
}