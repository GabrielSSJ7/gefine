import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    TouchableHighlight,
    ListView
} from 'react-native';


export default class BodyRendaSaldo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rendaFixa: 0,
            isDialogVisibleRenda: false, 
            isDialogVisibleSaldo: false,
            isDialogVisibleTCC: false,
            descricaoGastoTxt: '',
            valorGastoTxt: '',
            mesAtual: this.ShowCurrentDate(),
            descricaoGastoTxtErro: '',
            valorGastoTxt: '',
            rendaTxt: '',
            rendaTxtErro: ''
        };
        console.log('react constructor');
    }

    ShowCurrentDate = () => {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const month = new Date().getMonth() + 1;
        return monthNames[month-1];
    }

    saldoAtual() {
        let totalGastos = 0;

        for(let x = 0; x < this.props.dadosGastos.length; x++){
            totalGastos += parseFloat(this.props.dadosGastos[x].valor);
        }
        const Saldo = this.state.rendaFixa - totalGastos;

        return Saldo.toFixed(2);
    }
    
    render() {
        return(
            <View 
                style={{ 
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: 'space-between', 
                    paddingHorizontal: 50}}
            >
                <View>                    
                    <TouchableHighlight
                        underlayColor="#ddd"
                        onPress={() => this.setInputDialog(true)}
                    >
                        <View>
                            <Text style={{ fontSize:18, color: "#777", textAlign: 'center', fontWeight: 'bold' }}>Renda fixa mensal:</Text>
                            <Text style={{ fontSize:20, color: "#fcb040", textAlign: 'center' }}>R${this.state.rendaFixa}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight
                        underlayColor="#ddd"
                        onPress={() => false}
                    >
                        <View>
                            <Text style={{ fontSize:18, color: "#777", fontWeight: 'bold' }}>Saldo atual:</Text>
                            <Text style={{ fontSize:20, color: "#fcb040" }}>R${ this.saldoAtual()}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}