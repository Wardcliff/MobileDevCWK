import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';

import userController from '../controllers/userController';
import Methods from '../library/methods';
//import enumFormErrors from '../enums/formError';
import {Styles} from '../styles/Style';

const _userController = new userController();
const _methods = new Methods();

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

  btnLoginOnClick = async () => {
    this.state.user = {
      email: this.state.email,
      password: this.state.password,
    };

    let success = false;
    if (this.state.user.email || this.state.user.password) {
      success = await this.doLogin();
    } else {
      this.setState({error: true, errorType: 2 /*loginErrorEnum.EMPTY_FORM*/});
    }

    if (success) {
      console.log('Login correct');
      _methods.isLoggedIn(this.props.navigation);
    }
  };

  doLogin = async () => {
    let user = await _userController.LogInAsync(
      JSON.stringify(this.state.user),
    );

    if (user) {
      await _userController.saveUser(user);
      return true;
    } else {
      this.setState({error: true, errorType: 1});
    }

    // const {navigation} = this.props;
    // const {email, password} = this.state;
    // try {
    //   const resp = await fetch('http://localhost:3333/api/1.0.0/user/login', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });
    //   const respData = await resp.json();
    //   const {token} = respData;
    //   const userID = respData.id;
    //   <View>
    //     <Text>Here!</Text>
    //   </View>;
    // } catch (error) {
    //   console.log(`Error: ${error}`);
    // }
  };

  render() {
    const {navigation} = this.props;
    const {email, password} = this.state;
    return (
      <View>
        <View>
          <TextInput placeholder="Email" value={email} />
        </View>
        <View>
          <TextInput placeholder="Password" value={password} />
        </View>
        <TouchableOpacity onPress={this.doLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
