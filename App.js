import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Register from './src/components/Register';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Item from './src/components/Item';
import User from './src/components/User';
import Review from './src/components/Review';
import Camera from './src/components/Camera';

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
          <AppStack.Screen name="Item" component={Item} />
          <AppStack.Screen name="User" component={User} />
          <AppStack.Screen name="Review" component={Review} />
          <AppStack.Screen name="Camera" component={Camera} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
