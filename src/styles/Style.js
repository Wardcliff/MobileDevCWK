import {StyleSheet} from 'react-native';

const background = '#6f4e37'; //coffee
const textColour = 'white';

export const Styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: background,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 18,
  },
  container: {
    backgroundColor: background,
    flex: 1,
    width: '100%',
    alignContent: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  login: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
