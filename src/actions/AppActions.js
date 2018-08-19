import { 
    GASTOS_FETCH,
    GASTOS_FETCH_ALL
} from '../actions/types';
import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

export const gastosFetch = () => {

    const emailUsuarioB64 = b64.encode(firebase.auth().currentUser.email);

    const mes = ShowCurrentDate();
    const ano = new Date().getFullYear();

    return dispacth => {
        firebase.database().ref(`/gastos/${emailUsuarioB64}/${mes}/${ano}`)
            .on('value', snapshot => {
                dispacth({ type: GASTOS_FETCH, payload: snapshot.val() })  
            })
    }
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