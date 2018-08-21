import {
    MODIFICA_NOME_CADASTRO,
    MODIFICA_EMAIL_CADASTRO,
    MODIFICA_SENHA_CADASTRO,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    AUTENTICAR_USUARIO_ERRO,
    AUTENTICAR_USUARIO_SUCESSO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO,
} from '../actions/types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '', 
    cadastro_usuario_erro: '',
    autenticar_usuario_txt_erro: '',
    login_em_andamento: false,
    cadastro_em_andamento: false
};

export default (state = INITIAL_STATE, action ) => {
    
    switch(action.type){
        case MODIFICA_NOME_CADASTRO:
            return { ...state, nome: action.payload }

        case MODIFICA_EMAIL_CADASTRO: 
            return { ...state, email: action.payload }

        case MODIFICA_SENHA_CADASTRO:
            return { ...state, senha: action.payload }
        
        case CADASTRO_USUARIO_ERRO: 
            return { ...state, cadastro_usuario_erro: action.payload, cadastro_em_andamento: false }
        
        case AUTENTICAR_USUARIO_ERRO:
            return { ...state, autenticar_usuario_txt_erro: action.payload, login_em_andamento: false }

        case AUTENTICAR_USUARIO_SUCESSO:
            return { ...state, ...INITIAL_STATE }
        
        case LOGIN_EM_ANDAMENTO:
            return  { login_em_andamento: true }
        
        case CADASTRO_EM_ANDAMENTO:
            return { cadastro_em_andamento: true }


        default: return state;
    }
}