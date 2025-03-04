/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import { HEIGHT, WIDTH } from '../constants/dimension';
import HomeScreen from '../screens/user/HomeScreen';
import { cartIcon, dotIcon, heartIcon, homeIcon, notificationIcon } from '../assets/icons';
import FavoriteScreen from '../screens/user/FavoriteScreen';
import NotificationScreen from '../screens/user/NotificationScreen';
import OrderScreen from '../screens/user/OrderScreen';
import { colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../redux/slice/cartCountSlice';


const Tab = createBottomTabNavigator();


const tabData = [
    { name: 'Home', component: HomeScreen, icon: homeIcon },
    { name: 'wishlist', component: FavoriteScreen, icon: heartIcon },
    { name: 'Cart', component: OrderScreen, icon: cartIcon, number: 5 },
    { name: 'Notification', component: NotificationScreen, icon: notificationIcon },
];

interface tabBarProps {
    tab: {
        name: string;
        icon: number;
    };
    // src?: any;
    // label?: string;
    focused?: boolean;
}



export const HomeTabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { height: HEIGHT * 0.09, borderRadius: HEIGHT * 0.02, position: 'absolute', paddingTop: HEIGHT * 0.02, alignItems: 'center', paddingLeft: WIDTH * 0.06, paddingRight: WIDTH * 0.06, marginBottom: HEIGHT * 0.02 },
            }}>
            {tabData.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <CustomTabBarIcon tab={tab} focused={focused} />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );

};

const CustomTabBarIcon: React.FC<tabBarProps> = (props) => {
    const { tab, focused } = props;
    const counter = useSelector(selectCartCount);

    return (
        <View>
            {tab.name === 'Cart' && <View style={{ backgroundColor: colors.brownColor, width: WIDTH * 0.04, height: WIDTH * 0.04, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: WIDTH * 0.04, bottom: HEIGHT * 0.017 }}><Text style={{ fontSize: 9, color: colors.commonWhite }}>{counter}</Text></View>}
            <Image source={tab.icon} style={{ tintColor: focused ? '#C67C4D' : '#A2A2A2' }} />
            {focused && <Image source={dotIcon} style={{ marginTop: 7, alignSelf: 'center', position: 'absolute', top: HEIGHT * 0.025 }} />}

        </View>
    );
};