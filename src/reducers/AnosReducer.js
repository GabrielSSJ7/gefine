import {
    ANOS_FETCH,
    ANOS_FETCH_ANDAMENTO
} from '../actions/types';

const INITIAL_STATE = {
    anos_fetch_andamento: false,
    anosList: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ANOS_FETCH:
            return { ...state ,anos_fetch_andamento: false, anosList: action.payload};

        case ANOS_FETCH_ANDAMENTO:
            return { ...state, anos_fetch_andamento: action.payload}
                        
        default:
            return state;
    }
}