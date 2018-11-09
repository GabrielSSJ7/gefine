import React, { Component } from 'react';
import { 
    ListView,
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    ScrollView,
    TextInput,
    StatusBar,
    BackHandler
} from 'react-native';



export const alertInputSaldo = (state, props, styles) => {
  return state.isDialogVisibleSaldo ? (
    <ScrollView style={styles.masker} keyboardDismissMode={"on-drag"}>
      <View style={[styles.container,props.style]}>
        <Text style={styles.title}>Gefine</Text>

        <View style={{ padding: 20 }}>
          <View>
            <TextInput
              placeholder="Com o que você está gastando?"
              onChangeText={texto =>
                this.setState({ descricaoGastoTxt: texto })
              }
              inputStyle={{ borderBottomColor: "#aaa", borderBottomWidth: 1 }}
            />
            <Text style={{ color: "red", fontSize: 15 }}>
              {state.descricaoGastoTxtErro}
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Quanto custou?"
              onChangeText={texto => this.setState({ valorGastoTxt: texto })}
              inputStyle={{ borderBottomColor: "#aaa", borderBottomWidth: 1 }}
              keyboardType="numeric"
            />
            <Text style={{ color: "red", fontSize: 15 }}>
              {state.valorGastoTxtErro}
            </Text>
          </View>
        </View>

        <View style={styles.btn_container}>
          <Text
            style={[styles.btn, props.cancelStyle]}
            onPress={() => this.setState({ isDialogVisibleSaldo: false })}
          >
            Cancelar
          </Text>
          <Text
            style={[styles.btn, props.submitStyle]}
            onPress={() =>
              this.inserirGasto(
                state.descricaoGastoTxt,
                state.valorGastoTxt
              )
            }
          >
            Inserir
          </Text>
        </View>
      </View>
    </ScrollView>
  ) : null;
};
