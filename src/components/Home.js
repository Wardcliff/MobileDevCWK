import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {Styles} from '../styles/Style';

export default class Home extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}
