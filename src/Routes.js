import React, { Component } from  'react';
import { View} from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Principal from './components/Principal';
import SplashScreen from './components/SplashScreen';
import GastosMeses from './components/GastosMeses';
import Mes from './components/Mes';

export default class Routes extends Component {
   render() {
        return (
        <Router navigationBarStyle={{ backgroundColor: "#50c4eb" }}
            titleStyle={{ color: "#fff" }}>
            <Stack>
                <Scene key="login" component={Login} hideNavBar={true} />
                <Scene key="cadastro" component={Cadastro} hideNavBar={true} />
                <Scene key="principal" component={Principal} hideNavBar={true}
                    renderLeftButton={<View></View>} />
                <Scene key="splashScreen" component={SplashScreen} hideNavBar={true} initial/>
                <Scene key="gastosMeses" component={GastosMeses} hideNavBar={false} />
                <Scene key="mes" component={Mes} hideNavBar={false} />
            </Stack>
        </Router> 
        );
    }
}

