import React, { Component}  from 'react';
import { View, Text, ActivityIndicator, Image} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class SplashScreen extends Component {

    componentDidMount() {

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              this.setState({isLogged: true});
              Actions.principal();
            } else {
              Actions.login();
            }
          });
    }

    render() {
        return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
            <Image source={require("../images/Gefine.png")} style={{width: 150, height: 150}} />
            <Text style={{ fontSize: 25, color: '#fff'}}>Gefine</Text>
            <ActivityIndicator size="large" />
        </View>
        );
    }
}