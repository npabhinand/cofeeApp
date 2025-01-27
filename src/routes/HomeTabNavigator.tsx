import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { HEIGHT, WIDTH } from '../constants/dimension';
import HomeScreen from '../screens/HomeScreen';
import { cartIcon, dotIcon, heartIcon, homeIcon, notificationIcon } from '../assets/icons';
import WishListScreen from '../screens/WishListScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';


const Tab = createBottomTabNavigator();


const tabData = [
    { name: 'Home', component: HomeScreen, icon: homeIcon },
    { name: 'wishlist', component: WishListScreen, icon: heartIcon },
    { name: 'Cart', component: OrderScreen, icon: cartIcon },
    { name: 'Notification', component: NotificationScreen, icon: notificationIcon },
];

interface tabBarProps {
    src?: any;
    label?: string;
    focused?: boolean;
}

const CustomTabBarIcon: React.FC<tabBarProps> = (props) => {
    const { src, focused } = props;

    return (
        <View>
            <Image source={src} style={{ tintColor: focused ? '#C67C4D' : '#A2A2A2' }} />
            {focused && <Image source={dotIcon} style={{ marginTop: HEIGHT * 0.005, alignSelf: 'center' }} />}
        </View>
    );
};

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
                            <CustomTabBarIcon src={tab.icon} label={tab.name} focused={focused} />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    )

};

