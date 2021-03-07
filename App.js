import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginPage from './src/components/Login';

const stack = createStackNavigator();

function loginScreen() {
  return (
    <stack.Navigator headerMode="none">
      <stack.Screen name="Login" component={LoginPage} />
    </stack.Navigator>
  );
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator headermode="none">
          <stack.Screen name="Login" component={loginScreen} />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
