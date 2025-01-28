// import { View, Text } from 'react-native'
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { firebase } from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const App = () => {



  useEffect(() => {

    try {
      if (firebase.apps.length === 0) {
        console.error('Firebase is not initialized!');
        Alert.alert('Firebase is not initialized');
      } else {
        console.log('Firebase is initialized--');
      }
    } catch (error) {
      console.error('Error checking Firebase initialization: ', error);
      Alert.alert('Error initializing Firebase.');
    }
  }, []);


  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </NavigationContainer>

  );
};

export default App;
