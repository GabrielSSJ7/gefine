import firebase from 'firebase';
import b64 from 'base-64';
import {
    MODIFICA_NOME_CADASTRO,
    MODIFICA_EMAIL_CADASTRO,
    MODIFICA_SENHA_CADASTRO,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    AUTENTICAR_USUARIO_ERRO,
    AUTENTICAR_USUARIO_SUCESSO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
}
from './types';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export const modificaNomeCadastro = texto => (
    {
        type: MODIFICA_NOME_CADASTRO,
        payload: texto
    }
);

export const modificaEmailCadastro = texto => (
    {
        type: MODIFICA_EMAIL_CADASTRO,
        payload: texto
    }
);

export const modificaSenhaCadastro = texto => (
    {
        type: MODIFICA_SENHA_CADASTRO,
        payload: texto
    }
);



export const cadastrarUsuario = ({ nome, email, senha }) => {
    return dispatch => {
        dispatch({
            type: CADASTRO_EM_ANDAMENTO
        });
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => cadastrarNomeDatabase(nome, email, senha, dispatch))
            .catch(erro => cadastroErro(erro, dispatch));
    }
}

const cadastrarNomeDatabase = (nome, email, senha, dispatch) => {
    
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(user => {
            console.log(user.email);
            let emailB64 = b64.encode(email);
            console.log(emailB64);

            firebase.database().ref(`/usuarios/${emailB64}`)
                .push({ nome, renda: 0 })
                .then(value =>  cadastroSucesso(dispatch));
        })
        .catch(erro => console.log(erro));
}

const cadastroSucesso = (dispatch) => {
    dispatch({
        type: CADASTRO_USUARIO_SUCESSO
    });
    Actions.principal();
}

const cadastroErro = (erro, dispatch) => (
    dispatch({
        type: CADASTRO_USUARIO_ERRO,
        payload: erro.message
    })
);


export const autenticarUsuario = ({email, senha}) => {
    return dispatch => {
        dispatch({
            type: LOGIN_EM_ANDAMENTO
        });
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(user => autenticarUsuarioSucesso(dispatch, email, senha))
            .catch(erro => autenticarUsuarioErro(erro, dispatch));
    }
}

const autenticarUsuarioSucesso = (dispatch, email, senha) => {
    _storeData(email, senha);
    dispatch({
        type: AUTENTICAR_USUARIO_SUCESSO
    });
    Actions.principal();
}

const autenticarUsuarioErro = (erro, dispatch) => {
    dispatch({
        type: AUTENTICAR_USUARIO_ERRO,
        payload: erro.message
    });
}

_storeData = async (email, senha) => {
    try {
    
      let uid = {
        email: email,
        senha: senha
      };

      await AsyncStorage.setItem('uid', JSON.stringify(uid));
      console.log(uid);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }