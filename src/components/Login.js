import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
    autenticarUsuario,
    modificaEmailCadastro,
    modificaSenhaCadastro
 } from '../actions/AutenticacaoActions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { erro: '' }
    }
    _autenticarUsuario() {
        const { email, senha } = this.props;

        if(email && senha)
            this.props.autenticarUsuario({email, senha});
        else 
            this.setState({ erro: 'Você deixou de preencher os campos.'});
    }

    renderBtn() {
        if(!this.props.login_em_andamento) {
            return (
            <Button
                onPress={() => this._autenticarUsuario()}
                title="Entrar"
                color="#50c4eb"
            />
            )
        }else{
            return (
            <ActivityIndicator size="large" />
            )
        }
    }

    render() {
        return(
            <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 65 }}>
                    <Image source={require("../images/Gefine.png")} style={{width: 150, height: 150}} />
                    <Text style={{ fontSize: 24, color: '#000'}}>Gefine</Text>
                </View>

                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <TextInput 
                        placeholder="E-mail"
                        onChangeText={texto => this.props.modificaEmailCadastro(texto)}
                        style={{ fontSize: 20, height: 45}}
                        value={this.props.email} />

                    <TextInput 
                        secureTextEntry={true}
                        placeholder="Senha"
                        onChangeText={texto => this.props.modificaSenhaCadastro(texto)}
                        style={{ fontSize: 20, height: 45}}
                        value={this.props.senha} />

                    <TouchableHighlight
                        onPress={() => Actions.cadastro()}
                        underlayColor="#ddd"
                    >
                        <Text>
                            Ainda não tem um cadastro?
                        </Text> 
                    </TouchableHighlight>

                    <Text style={{ color: 'red', fontSize: 20 }}>
                        {this.props.autenticar_usuario_txt_erro}
                        {this.state.erro}
                    </Text>
                </View>

                <View style={{ flex: 2 }}>
                    {this.renderBtn()}
                </View>
            </View>
        );
    }
}

const mapsStateToProps = state => {
    console.log(state);
    return {
        autenticar_usuario_txt_erro: state.AutenticacaoReducer.autenticar_usuario_txt_erro,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        login_em_andamento: state.AutenticacaoReducer.login_em_andamento
    }
}

export default connect(mapsStateToProps, {autenticarUsuario, modificaEmailCadastro, modificaSenhaCadastro})(Login);
