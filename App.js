import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/components/Login';
import Home from './src/components/Home';
import Register from './src/components/Register';

const AppStack = createStackNavigator();
const logStack = createStackNavigator();

function loginPage() {
  return (
    <logStack.Navigator headerMode="none">
      <logStack.Screen name="Login" component={Login} />
      <logStack.Screen name="Register" component={Register} />
    </logStack.Navigator>
  );
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppStack.Navigator headermode="none">
          <AppStack.Screen name="Login" component={loginPage} />
          <AppStack.Screen name="Home" component={Home} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
