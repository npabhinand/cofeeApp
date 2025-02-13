/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { backIcon } from '../assets/icons';
import { headerProps } from '../constants/types/commonTypes';

const HeaderComponent: React.FC<headerProps> = (props) => {
    const { header } = props;
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', marginVertical: HEIGHT * 0.01, paddingHorizontal: WIDTH * 0.05 }}>
            <Pressable onPress={() => navigation.goBack()}>
                <Image source={backIcon} />
            </Pressable>
            <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>{header}</Text>
        </View>
    );
};

export default HeaderComponent;
