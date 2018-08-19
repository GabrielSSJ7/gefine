import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    TouchableHighlight,
    ART
} from 'react-native';
import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

const {
    Group,
    Shape,
    Surface,
  } = ART;

export default class Mes extends Component {
    constructor(props) {
        super(props);

        this.state = { anos: '', rendaFixa: 0 }
    }

    componentWillMount() {
        this.anosFetch();
        this.criaFonteDeDados(this.state.anos);
        this.getRendaFromDatabase();
        
    }

    componentWillUpdate(prevProps,prevState) {
        if(this.state.anos !== prevState.anos){
            this.criaFonteDeDados(prevState.anos);    
        }
    }

    criaFonteDeDados(anos){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.fonteDadosGastos = ds.cloneWithRows(anos);
    }

    anosFetch(){
        const emailB64 = b64.encode(firebase.auth().currentUser.email);
        firebase.database().ref(`gastos/${emailB64}/${this.props.mes}`)
            .once('value', snapshot => {
                const anosLodash = _.map(snapshot.val(), (val, uid)=>{
                    return { ...val, uid}
                });
               
                console.log('lodash',anosLodash);
                let year = []; 
                for(let x = 0; x < anosLodash.length; x++) {
                   year.push(_.values(anosLodash[x]));
                }                  
                console.log('snapshot.values', year)

                this.setState({ anos: year });
            });
    }

    getRendaFromDatabase() {
        const { currentUser } = firebase.auth();
        const emailB64 = b64.encode(currentUser.email);  
        firebase.database().ref(`/usuarios/${emailB64}/`)
        .on('value', snapshot => {
            let rendaFixa = _.map(snapshot.val(), (val, uid) => {
                return { ...val, uid};
            });
            console.log(rendaFixa);
            this.setState({ rendaFixa: parseFloat(rendaFixa[0].renda).toFixed(2) });
        });
    }

    

    renderRow(data) {
        const tamanho = data.length;
        let total = 0;
        for(let x = 0; x < data.length-1; x++){
            total += parseFloat(data[x].valor);
        }
        const porcentagemGasto = total*100/this.state.rendaFixa;

        const jsx = 
                <TouchableHighlight
                    underlayColor="#aaa"
                    onPress={() => false}
                >
                    <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderColor: "#CCC"}}>
                        <Text style={{ fontSize: 20, paddingRight: 10 }}>{data[tamanho-1]}</Text>
                        <Text style={{ fontSize: 20, paddingRight: 10 }}>Renda na data: R${this.state.rendaFixa}</Text>
                        <Text style={{ fontSize: 20, paddingRight: 10 }}>Total gasto R${total.toFixed(2)}</Text>
                        <Text style={{ fontSize: 20, paddingRight: 10 }}>Você gastou {porcentagemGasto.toFixed(2)}% da renda.</Text>
                        <Surface width={200} height={100}>
                            <Group x={0} y={0}>
                                <Shape
                                    d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                                    stroke="#000"
                                    strokeWidth={1}
                                />
                            </Group>
                        </Surface>
                    </View> 
                </TouchableHighlight>;
        return(
            jsx
        );
    }
    render() {
        
        return (
            <View style={{ backgroundColor: '#fff', flex: 1}}>
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDadosGastos} 
                    renderRow={this.renderRow.bind(this)} 
                />
            </View>
        );
    }
}