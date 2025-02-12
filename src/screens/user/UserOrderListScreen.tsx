
import { SafeAreaView } from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';

import YourOrderComponent from '../../components/YourOrderComponent';

const UserOrderListScreen = () => {
    return (
        <SafeAreaView>
            <HeaderComponent />
            <YourOrderComponent />
        </SafeAreaView>
    );
};


export default UserOrderListScreen;
