/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { backIcon } from '../assets/icons';

const HeaderComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.01 }}>
            <Pressable onPress={() => navigation.goBack()}>
                <Image source={backIcon} />
            </Pressable>
            <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>My Orders</Text>
        </View>
    );
};

export default HeaderComponent;
