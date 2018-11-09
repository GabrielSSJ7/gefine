import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    TouchableHighlight
} from 'react-native';


export default class Header extends Component {
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

    render() {
    return (
        <View 
            style={{ 
                flex: 1,
                backgroundColor: '#50c4eb',
                justifyContent: 'space-between',
                flexDirection: 'row',
                elevation: 3
            }}
        >
        <StatusBar backgroundColor="#50c4eb" />
            <View style={{ justifyContent: 'center', height: 50 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 15, fontSize: 20}}>
                    {this.state.mesAtual}
                </Text>
            </View>
            <View style={{ height: 50, marginRight: 15, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableHighlight
                    onPress={() => { this.setState({isDialogVisibleTCC: true }) }}
                    underlayColor="#ddd"
                    style={{ paddingHorizontal: 25 }}
                >
                <Text 
                    style={{ color: '#fff', fontSize: 18}}
                >
                    ?
                </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => { firebase.auth().signOut().then(() => {
                        Actions.login();
                    })}}
                    underlayColor="#ddd"
                >
                <Text 
                    style={{ color: '#fff', fontSize: 18}}
                >
                    Sair
                </Text>
                </TouchableHighlight>
            </View>
        </View>
        );
    }
}