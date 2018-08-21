import React, { Component } from 'react';
import {
    ListView,
    Text,
    View,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { extratoMesFetch} from '../actions/AppActions';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class ExtratoMes extends Component {
    componentWillMount(){
        this.props.extratoMesFetch(this.props.mes, this.props.ano);
        this.criaFonteDeDados(this.props.extratoList);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.extratoList !== nextProps.extratoList){
            this.criaFonteDeDados(nextProps.extratoList);
        }
    }

    criaFonteDeDados(extratoList){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2});

        this.fonteDeDados = ds.cloneWithRows(extratoList);
    }

    renderRow(data) {
        return (
            <View style={{ flex: 1, padding: 10, borderBottomWidth: 1, borderColor: "#CCC"}}>
                <Text style={{ fontSize: 18 }}>{data.descricao}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, paddingRight: 10 }}>R${data.valor}</Text>
                    <Text style={{ fontSize: 16 }}>{data.dataHora}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
                <ListView 
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    let extratoList = _.map(state.ExtratoMesReducer, (val, uid) => {
        return { ...val, uid};
    });

    console.log(extratoList);

    return {
        extratoList
    }
}

export default connect(mapStateToProps, {extratoMesFetch})(ExtratoMes);