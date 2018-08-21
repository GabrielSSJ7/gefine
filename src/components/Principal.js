import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import { 
    ListView,
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    BackHandler,
    ScrollView,
    TextInput,
    StatusBar
} from 'react-native';
import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { connect } from 'react-redux';
import { gastosFetch, logOutApp } from '../actions/AppActions';
import { Actions } from 'react-native-router-flux';

class Principal extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            rendaFixa: 0,
            isDialogVisible: false, 
            isDialogVisibleSaldo: false,
            descricaoGastoTxt: '',
            valorGastoTxt: '',
            mesAtual: this.ShowCurrentDate()
        };

        this.fonteDadosGastos = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        
    }

    ShowCurrentDate = () => {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const month = new Date().getMonth() + 1;
        return monthNames[month-1];
    }

    preencheListViewGasto(gastos){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.fonteDadosGastos = ds.cloneWithRows(gastos);
    }

    // UNSAFE_componentWillMount() {
    //     console.log('Principal - componentWillMount');
    //     this.props.gastosFetch();
    //     this.preencheListViewGasto(this.props.dadosGastos);
    //     this.getRendaFromDatabase();
    // }

    componentDidMount() {
        this.props.gastosFetch();
        //this.fonteDadosGastos.cloneWithRows(this.props.dadosGastos);
        this.getRendaFromDatabase(); 
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.dadosGastos!==prevState.dadosGastos){
            return { dadosGastos: nextProps.dadosGastos}
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.dadosGastos !== this.props.dadosGastos) {
            //prevProps.gastosFetch();
            //this.preencheListViewGasto(prevProps.dadosGastos);
            this.fonteDadosGastos =  this.fonteDadosGastos.cloneWithRows(this.props.dadosGastos);
            console.log('componentDidUpdate',this.fonteDadosGastos);
            console.log('this.props',this.props);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     this.preencheListViewGasto(nextProps.dadosGastos);
    // }
     
    setInputDialog(isVisible) {
        this.setState({ isDialogVisible: isVisible });
    }

    setInputDialogSaldo(isVisible) {
        this.setState({ isDialogVisibleSaldo: isVisible });
    }

    
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('uid');
          if (value !== null) {
            // We have data!!
            //Actions.principal();
            return value;
          }
        } catch (error) {
            // Error retrieving data
        }
    }

    saldoAtual() {
        let totalGastos = 0;

        for(let x = 0; x < this.props.dadosGastos.length; x++){
            totalGastos += parseFloat(this.props.dadosGastos[x].valor);
        }
        const Saldo = this.state.rendaFixa - totalGastos;

        return Saldo.toFixed(2);
    }

    somaDosGastos(){
        let totalGastos = 0;
        

        for(let x = 0; x < this.props.dadosGastos.length; x++){
            totalGastos += parseFloat(this.props.dadosGastos[x].valor);
        }

        return totalGastos.toFixed(2);
    }

    getRendaFromDatabase() {
        const { currentUser } = firebase.auth();

        const emailB64 = b64.encode(currentUser.email);  

        const ano = new Date().getFullYear();
         
        firebase.database().ref(`/gastos/${emailB64}/${this.ShowCurrentDate()}/${ano}/renda/`)
        .on('value', snapshot => {
            
            let rendaFixa = _.map(snapshot.val(), (val, uid) => {
                return { ...val, uid};
            });
            this.setState({ rendaFixa: parseFloat(rendaFixa[0].renda).toFixed(2) });
        });
    }

    updateRenda(renda) {
        const { currentUser } = firebase.auth();

        const emailB64 = b64.encode(currentUser.email);
        const ano = new Date().getFullYear();

        firebase.database().ref(`/gastos/${emailB64}/${this.ShowCurrentDate()}/${ano}/renda/`)
        .once('value', snapshot => {
            if(snapshot.val() !== null){
                let rendaFixa = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid};
                });
                firebase.database().ref(`/gastos/${emailB64}/${this.ShowCurrentDate()}/${ano}/renda/${rendaFixa[0].uid}/`)
                            .update({renda: renda})
                            .then(value => this.setInputDialog(false));  
            }else {
                firebase.database().ref(`/gastos/${emailB64}/${this.ShowCurrentDate()}/${ano}/renda/`)
                    .push({ renda });
            }
            
            
        });
    }

    inserirGasto(descricaoGastoTxt, valorGastoTxt){
        const date = new Date();

        let dataHora = date.getDate();
        let minutos = date.getMinutes();
        if(minutos.lenght == 1){
            minutos = `0${minutos}`; 
        }
        dataHora = `${dataHora}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${minutos}`;

        const year = new Date().getFullYear();

         const emailUsuarioB64 = b64.encode(firebase.auth().currentUser.email);
         firebase.database().ref(`/gastos/${emailUsuarioB64}/${this.state.mesAtual}/${year}/gastos/`)
             .push({ descricao: descricaoGastoTxt, valor: valorGastoTxt, dataHora })
             .then(() => {
                this.setState({ isDialogVisibleSaldo: false, descricaoGastoTxt: '', valorGastoTxt: '' });
             });
    }

    alertInputSaldo(){
        return (
            this.state.isDialogVisibleSaldo?
            <ScrollView style={styles.masker} keyboardDismissMode={'on-drag'}>
                <View style={[styles.container,this.props.style]}>
                    <Text style={styles.title}>ISpent</Text>

                    <View style={{ padding: 20 }}>
                        <View >
                            <TextInput 
                                placeholder="digite aqui uma descrição..."
                                onChangeText={(texto) => this.setState({ descricaoGastoTxt: texto})}
                            />
                        </View>
                        <View>
                            <TextInput 
                                placeholder="digite o valor aqui..."
                                onChangeText={(texto) => this.setState({ valorGastoTxt: texto})}
                            />
                        </View>
                    </View>

                    <View style={styles.btn_container}>
                        <Text style={[styles.btn,this.props.cancelStyle]} onPress={()=>this.setState({ isDialogVisibleSaldo: false })}>Cancelar</Text>
                        <Text style={[styles.btn,this.props.submitStyle]} onPress={()=> this.inserirGasto(this.state.descricaoGastoTxt, this.state.valorGastoTxt)}>Inserir</Text>
                    </View>
                </View>
            </ScrollView>:null
        )
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <StatusBar backgroundColor="#50c4eb" />
                <View 
                    style={{ 
                        flex: 1,
                        backgroundColor: '#50c4eb',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        elevation: 3
                    }}
                >
                    <View style={{ justifyContent: 'center', height: 50 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 15, fontSize: 20}}>
                            {this.state.mesAtual}
                        </Text>
                    </View>
                    <View style={{ height: 50, marginRight: 15, flexDirection: 'row' }}>
                        <TouchableHighlight
                            onPress={() => { alert('App do grupo de TCC que só tem pau no cu _)_')}}
                            underlayColor="#ddd"
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
                <View style={styles.MainContainer}>
                    {this.alertInputSaldo()}
                    {/* Caixa para digitar renda fixa */}
                    <DialogInput isDialogVisible={this.state.isDialogVisible}
                        title={"Gefine"}
                        message={"Defina uma renda fixa mensal:"}
                        hintInput ={"digite aqui..."}
                        submitInput={ (inputText) => {this.updateRenda(inputText); } }
                        closeDialog={ () => {this.setInputDialog(false)}}
                        
                        >
                    </DialogInput>  
                    {/* ------------------------------------ */}
                    
                


                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', 
                        paddingHorizontal: 50}}>
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

                    {/* <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', 
                        paddingHorizontal: 10 }}>
                            <View>
                                <Text style={{ color: "#777", fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Diferença de gastos:</Text>
                                <Text style={{ color: "#fcb040", fontSize: 21, textAlign: 'center' }}>R$700,00</Text>
                            </View>
                            <View>
                                <Text style={{ color: "#777", fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Economia estimada:</Text>
                                <Text style={{ color: "#fcb040", fontSize: 21, textAlign: 'center' }}>R$1000,00</Text>
                            </View>
                    </View> */}

                    <View style={{ flex: 4 }}>
                        <Text style={{ color: '#777', fontSize: 20, fontWeight: 'bold'}}>Gastos deste mês (Total de gastos: R${this.somaDosGastos()}):</Text>
                        <ListView
                            enableEmptySections
                            dataSource={this.fonteDadosGastos} 
                            renderRow={data => (
                                <View style={{ flex: 1, padding: 10, borderBottomWidth: 1, borderColor: "#CCC"}}>
                                    <Text style={{ fontSize: 18 }}>{data.descricao}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, paddingRight: 10 }}>R${data.valor}</Text>
                                        <Text style={{ fontSize: 16 }}>{data.dataHora}</Text>
                                    </View>
                                </View>
                            )} 
                        />
                    </View>

                    <View style={{ flex: 1, justifyContent: "space-around"}}>
                        <View>
                            <TouchableHighlight
                                onPress={() =>  this.setInputDialogSaldo(true)}
                                underlayColor="#ddd"
                                style={{ backgroundColor: "#50c4eb", padding: 10 ,borderRadius: 3}}
                                >
                                    <Text style={{ alignSelf: 'center', fontSize: 16, color: "#fff", fontWeight: 'bold'}}>Inserir gastos</Text>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <TouchableHighlight
                            onPress={() => {Actions.gastosMeses({ title: this.state.mesAtual, rendaFixa: this.state.rendaFixa })}}
                            underlayColor="#ddd"
                            style={{ backgroundColor: "#50c4eb", padding: 10,borderRadius: 3}}
                            >
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: "#fff", fontWeight: 'bold' }}>Gastos dos meses anteriores</Text>
                            </TouchableHighlight>
                        </View>
                        
                    </View>

                    

                    {/*<View style={{ flex: 4 }}>
                        <View style={{ marginTop: 30, flexDirection: 'row'}}>
                            <Canvas ref={this.handleCanvas}/>
                            <Canvas ref={this.handleCanvas2}/>
                        </View> 
                    </View>*/}
                </View>
            </View>
            );
        }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 11,
        backgroundColor: '#fff',
        padding: 15
      },
      masker:{
        flex:1,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0,.6)',
        zIndex:100
      },
      container:{
            alignSelf:'center',
        width:'75%',
        marginTop:150,
        backgroundColor:'#fff',
        borderRadius:10,
        overflow:'hidden'
      },
      title:{
        textAlign:'center',
        paddingTop:13,
        paddingHorizontal:6,
        fontSize:15,
        color:'#777',
        fontWeight:'bold',
        lineHeight:20,
        marginBottom:10
      },
      input:{
            paddingVertical:0,
        paddingHorizontal:8,
        height:34,
        backgroundColor:'#eee',
        marginVertical:10,
        borderTopWidth:.5,
        borderBottomWidth:.5,
        borderColor:'#ccc',
        fontSize:15
      },
      btn_container:{
        flexDirection:'row',
        borderTopWidth:.5,
        borderColor:'#ddd',
        marginTop:10
      },
      btn:{
        width:'50%',
        textAlign:'center',
        fontWeight:'bold',
        paddingVertical:12
      }

});

const mapStateToProps = state => {

    let dadosGastos = _.map(state.AppReducer.dadosGastos, (val, uid) => {
        return { ...val, uid};
    });

    return {
        dadosGastos
    }
}

export default connect(mapStateToProps, { gastosFetch, logOutApp })(Principal);