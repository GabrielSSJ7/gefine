import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class GastosMeses extends Component {
    constructor(props) {
        super(props);

        this.state = {
             monthNames:["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        }
    }
    componentWillMount() {
        this.criaFonteDeDados(this.state.monthNames);
    }

    criaFonteDeDados( meses ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});

        this.fonteMeses = ds.cloneWithRows(meses);
    }

    renderRow(mes) {
        return(
            <TouchableHighlight 
                underlayColor="#aaa"
                onPress={()=>{ Actions.anos({ title: mes, mes, rendaFixa: this.props.rendaFixa }) }}
            >
            <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#aaa'}}>
                <Text style={{fontSize: 22, marginLeft: 10, padding: 15}}>{mes}</Text>
            </View>
            </TouchableHighlight>
        );
    }
 
    render() {
        return (
            <View style={{ flex: 1,  backgroundColor: '#fff'}}>
            <ListView
                enableEmptySections
                dataSource={this.fonteMeses}
                renderRow={data => this.renderRow(data)}
            />
            </View>
        );
    }
}

const mapStateToProps = state => {
        const Meses = _.map(state.AppReducer, (val, uid) => {
        return {...val, uid}
    })

    return {
        Meses  
    }
}

export default connect(mapStateToProps, null)(GastosMeses);
