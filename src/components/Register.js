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
        foreName: '',
        surName: '',
        email: '',
        password: '',
      },
      foreName: '',
      surName: '',
      email: '',
      password: '',
      error: false,
      errorType: '',
    };
  }

  foreNameChange = (foreName) => {
    this.setState({foreName: foreName});
  };

  surNameChange = (surName) => {
    this.setState({surName: surName});
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
      foreName: this.state.foreName,
      surName: this.state.surName,
      email: this.state.email,
      password: this.state.password,
    };

    if (
      this.state.foreName &&
      this.state.surName &&
      this.state.email &&
      this.state.password
    ) {
      success = await this.doRegister();
    } else {
      this.setState({error: true, errorType: 'Empty Form'});
    }

    if (success) {
      this.props.navigation.navigate('Login'); // temp should log in automagically
    }
  };

  doRegister = async () => {
    return await _userController.register(JSON.stringify(this.state.user));
  };

  render() {
    return (
      <View>
        <Text>Register Screen</Text>
      </View>
    );
  }
}
