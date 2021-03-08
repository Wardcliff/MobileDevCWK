import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  saveUser = async (user) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      console.log('User: ' + JSON.stringify(user));
    } catch (error) {
      throw new Error(error);
    }
  };
}
