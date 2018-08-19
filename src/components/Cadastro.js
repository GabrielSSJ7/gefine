import React, { Component } from 'react';
import {
    TextInput,
    Button,
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import {
    modificaNomeCadastro,
    modificaEmailCadastro,
    modificaSenhaCadastro,
    cadastrarUsuario
} from '../actions/AutenticacaoActions';


class Cadastro extends Component {
    _cadastrarUsuario() {
        const { email, nome, senha } = this.props;
        if(email && nome && senha)
            this.props.cadastrarUsuario({nome, email, senha});
        else
            this.setState({ cadastro_usuario_erro: "Erro"});
    }

    renderBtn() {
        if(!this.props.cadastro_em_andamento) {
           return(
                <Button
                    onPress={() => this._cadastrarUsuario()}
                    title="Cadastrar"
                    color="#50c4eb"
                />
           );
        }else{
            return (
                <ActivityIndicator size="large" />
            );
        }
    }


    render() {
        return (
            <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 65 }}>
                    <Image source={require("../images/Gefine.png")} style={{width: 150, height: 150}} />
                    <Text style={{ fontSize: 24, color: '#000'}}>Gefine</Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                <TextInput 
                        placeholder="Nome"
                        onChangeText={texto => this.props.modificaNomeCadastro(texto)}
                        style={{ fontSize: 20, height: 45}}
                        value={this.props.nome} />

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
                        
                    <Text style={{ color:"red", fontSize: 20 }}>
                        {this.props.cadastro_usuario_erro}
                    </Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {this.renderBtn()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return{   
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        cadastro_usuario_erro: state.AutenticacaoReducer.cadastro_usuario_erro,
        cadastro_em_andamento: state.AutenticacaoReducer.cadastro_em_andamento
    }
};

export default connect(mapStateToProps, { modificaNomeCadastro, modificaEmailCadastro, modificaSenhaCadastro, cadastrarUsuario })(Cadastro);