import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import AnosReducer from './AnosReducer';
import ExtratoMesReducer from './ExtratoMesReducer';

export default combineReducers({
    AutenticacaoReducer,
    AppReducer,
    AnosReducer,
    ExtratoMesReducer
});