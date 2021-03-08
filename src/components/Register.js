import React, {Component} from 'react';
import {View, TextInput, Text, Button, ToastAndroid} from 'react-native';

import userController from '../controllers/userController';
import {Styles} from '../styles/Style';

const _userController = new userController();

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
      forename: '',
      surname: '',
      email: '',
      password: '',
      error: false,
      errorType: '',
    };
  }

  forenameChange = (forename) => {
    this.setState({forename: forename});
  };

  surnameChange = (surname) => {
    this.setState({surname: surname});
  };

  emailChange = (email) => {
    this.setState({email: email});
  };

  passwordChange = (password) => {
    this.setState({password: password});
  };

  btnRegisterOnClick = async () => {
    let success = false;
    this.state.user = {
      first_name: this.state.forename,
      last_name: this.state.surname,
      email: this.state.email,
      password: this.state.password,
    };

    if (
      this.state.forename ||
      this.state.surname ||
      this.state.email ||
      this.state.password
    ) {
      success = await this.doRegister();
    } else {
      this.setState({error: true, errorType: 'Empty Form'});
    }

    if (success) {
      ToastAndroid.show('Registered', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      this.doLogin();
    }
  };

  doRegister = async () => {
    return await _userController.register(JSON.stringify(this.state.user));
  };

  // I think theres maybe some unexplained behaviour here,
  // but it still logs in, so low priority
  doLogin = async () => {
    await _userController.logIn(
      JSON.stringify(this.state.user.email, this.state.password),
    );
    this.props.navigation.navigate('Home');
  };

  errorHandler = () => {
    switch (this.state.errorType) {
      case 'Empty Form': {
        return 'Info Not Entered';
      }
      default:
        'Unexpected Error';
    }
  };

  render() {
    return (
      <View style={Styles.container}>
        <TextInput
          placeholder="Forename"
          onChangeText={this.forenameChange}
          value={this.state.forename}
        />
        <TextInput
          placeholder="Surname"
          onChangeText={this.surnameChange}
          value={this.state.surname}
        />
        <TextInput
          placeholder="Email Address"
          onChangeText={this.emailChange}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password"
          onChangeText={this.passwordChange}
          value={this.state.password}
        />
        <Text>{this.state.error ? this.errorHandler() : ''}</Text>
        <Button title="Register" onPress={this.btnRegisterOnClick}>
          Register
        </Button>
      </View>
    );
  }
}
