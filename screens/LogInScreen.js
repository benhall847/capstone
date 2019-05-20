import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogIn from '../components/LogIn';


export default class LogInScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
     
       <View>

         <LogIn />
       </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
