import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from '../screens/user/OnBoardScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeTabNavigator } from './HomeTabNavigator';
import ProductDetailScreen from '../screens/user/ProductDetailScreen';
import OrderScreen from '../screens/user/OrderScreen';
import DeliveryScreen from '../screens/user/DeliveryScreen';
import AddressScreen from '../screens/user/AddressScreen';
import AdminHomeScreen from '../screens/Admin/AdminHomeScreen';
import ProductListScreen from '../screens/Admin/ProductListScreen';
import UserListScreen from '../screens/Admin/UserListScreen';
import OrderListScreen from '../screens/Admin/OrderListScreen';
import StockListScreen from '../screens/Admin/StockListScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/user/HomeScreen';
import ProfitListScreen from '../screens/Admin/ProfitListScreen';
import UserOrderListScreen from '../screens/user/UserOrderListScreen';
import Orders from '../screens/Admin/Orders';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FavoriteScreen from '../screens/user/FavoriteScreen';
import StockProductScreen from '../screens/Admin/StockProductScreen';


const AppNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnBoardScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="HomeTabs" component={HomeTabNavigator} />
            <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} />
            <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
            <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
            <Stack.Screen name="UserListScreen" component={UserListScreen} />
            <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
            <Stack.Screen name="StockListScreen" component={StockListScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="ProfitListScreen" component={ProfitListScreen} />
            <Stack.Screen name="UserOrderListScreen" component={UserOrderListScreen} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
            <Stack.Screen name="StockProductScreen" component={StockProductScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
