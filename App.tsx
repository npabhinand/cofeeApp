// import { View, Text } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
// import firebase from '@react-native-firebase/app';
const App = () => {



  // if (!firebase.apps.length) {
  //   firebase.initializeApp();
  // } else {
  //   firebase.app(); // if already initialized
  // }

  // console.log('Firebase initialized:', firebase.apps.length);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </NavigationContainer>

  );
};

export default App;
