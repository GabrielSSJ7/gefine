import { 
    GASTOS_FETCH,
    GASTOS_FETCH_ALL,
    ANOS_FETCH,
    ANOS_FETCH_ANDAMENTO,
    EXTRATO_MES_FETCH,
    LOG_OUT_APP
} from '../actions/types';
import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

export const gastosFetch = () => {

    if(firebase.auth().currentUser !== null) {
        const emailUsuarioB64 = b64.encode(firebase.auth().currentUser.email);

        const mes = ShowCurrentDate();
        const ano = new Date().getFullYear();
    
        return dispacth => {
            firebase.database().ref(`/gastos/${emailUsuarioB64}/${mes}/${ano}/gastos`)
                .on('value', snapshot => {
                    dispacth({ type: GASTOS_FETCH, payload: snapshot.val() })  
                })
        }
    } 
    
    return { type: ''}
   
}

ShowCurrentDate = () => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const month = new Date().getMonth() + 1;
    return monthNames[month-1];
}


export const historicoMeses = () => {
    const emailUsuarioB64 = b64.encode(firebase.auth().currentUser.email);

    return dispacth => {
        firebase.database().ref(`/gastos/${emailUsuarioB64}`)
            .on('value', snapshot => {
            
                dispacth({ type: GASTOS_FETCH_ALL, payload: snapshot.val() })  
            })
    }
}


export const anosFetch = (mes) => {
    return dispatch => {
        dispatch({
            type: ANOS_FETCH_ANDAMENTO,
            payload: true
        });
        const emailB64 = b64.encode(firebase.auth().currentUser.email);
        firebase.database().ref(`gastos/${emailB64}/${mes}`)
            .once('value', snapshot => {
                dispatch({type: ANOS_FETCH, payload: snapshot.val()});
            });
    }
}

export const logOutApp =  () => {
    return dispatch => {
        dispatch({ type: LOG_OUT_APP });
    }
}


export const extratoMesFetch = (mes, ano) => {
    return dispacth => {
        const emailB64 = b64.encode(firebase.auth().currentUser.email);
        firebase.database().ref(`gastos/${emailB64}/${mes}/${ano}/gastos/`)
            .once('value', snapshot => {
                dispacth({type: EXTRATO_MES_FETCH, payload: snapshot.val()});
            });
    }
}