import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from '../screens/OnBoardScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeTabNavigator } from './HomeTabNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import OrderScreen from '../screens/OrderScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import AddressScreen from '../screens/AddressScreen';



const AppNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnBoardScreen">
            <Stack.Screen name="HomeTabs" component={HomeTabNavigator} />
            <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} />

        </Stack.Navigator>
    );
};

export default AppNavigator;
