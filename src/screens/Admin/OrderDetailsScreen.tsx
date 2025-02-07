/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, SafeAreaView } from 'react-native';
import React from 'react';

import { HEIGHT, WIDTH } from '../../constants/dimension';
import { useNavigation } from '@react-navigation/native';
import { backIcon } from '../../assets/icons';

const OrderDetailsScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.1, marginVertical: HEIGHT * 0.01 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Orders</Text>
            </View>
        </SafeAreaView>
    )
}

export default OrderDetailsScreen;
