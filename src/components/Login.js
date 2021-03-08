import React, {Component} from 'react';
import {View, TextInput, Text, Button, ToastAndroid} from 'react-native';

import userController from '../controllers/userController';
import {Styles} from '../styles/Style';

const _userController = new userController();

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        id: null,
        userToken: null,
      },
      email: '',
      password: '',
      error: false,
      errorType: '',
    };
  }

  emailChange = (email) => {
    this.setState({email: email});
  };

  passwordChange = (password) => {
    this.setState({password: password});
  };

  isLoggedIn = async (navigation) => {
    ToastAndroid('logged in');
    navigation.reset({
      index: 0,
    });
  };

  btnLoginOnClick = async () => {
    this.state.user = {
      email: this.state.email,
      password: this.state.password,
    };
    let success = false;
    if (this.state.user.email && this.state.user.password) {
      success = await this.doLogin();
    } else {
      this.setState({error: true, errorType: 'Empty Form'});
    }

    if (success) {
      console.log('Login correct');
      this.isLoggedIn(this.props.navigation);
    }
  };

  doLogin = async () => {
    let user = await _userController.logIn(JSON.stringify(this.state.user));

    if (user) {
      await _userController.saveUser(user);//needs method
      return true;
    } else {
      this.setState({error: true, errorType: 'Bad request'});
    }
  };

  errorHandler = () => {
    switch (this.state.errorType) {
      case 'Bad request': {
        return 'Incorrect details';
      }
      case 'Empty Form': {
        return 'Details Not Entered';
      }
      default:
        'Error';
    }
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={Styles.container}>
        <View style={Styles.login}>
          <TextInput
            placeholder="Email"
            onChangeText={this.emailChange}
            value={this.state.email}
          />
          <TextInput
            placeholder="Password"
            onChangeText={this.passwordChange}
            value={this.state.password}
          />
          <Text style={Styles.error}>
            {this.state.error ? this.errorHandler() : ''}
          </Text>
        </View>
        <View>
          <Button title="Log In" onPress={this.btnLoginOnClick}>
            Log In
          </Button>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    );
  }
}
