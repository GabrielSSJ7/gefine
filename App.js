/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Routes from './src/Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';


export default class App extends Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyAQ2k5QcLlceTYZhEwtagdI9JH-20Z4K-w",
      authDomain: "ispent-e5e5f.firebaseapp.com",
      databaseURL: "https://ispent-e5e5f.firebaseio.com",
      projectId: "ispent-e5e5f",
      storageBucket: "ispent-e5e5f.appspot.com",
      messagingSenderId: "671490053639"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }      
  }

  render() {
    return (
      <Provider store={createStore( reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}

