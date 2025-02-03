/* eslint-disable react-native/no-inline-styles */
import { View, Image, Text } from 'react-native';
import React from 'react';
import { profileIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { userProps } from '../constants/types/commonTypes';


const UserRenderItem: React.FC<userProps> = (props) => {
    const { item } = props;
    return (
        <View style={{ flexDirection: 'row', height: HEIGHT * 0.12, width: WIDTH * 0.9, alignItems: 'center', shadowColor: colors.commonBlack, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, backgroundColor: colors.commonWhite, marginTop: HEIGHT * 0.02, alignSelf: 'center', borderRadius: 10, paddingHorizontal: WIDTH * 0.05 }}>
            <Image source={profileIcon} style={{ width: WIDTH * 0.12, height: WIDTH * 0.12 }} />
            <View style={{ marginLeft: WIDTH * 0.1 }}>
                <Text style={{ color: colors.brownColor, fontWeight: 'bold', fontSize: 18 }}>{item?.name}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.email}</Text>
            </View>
        </View>
    );
};

export default UserRenderItem;
