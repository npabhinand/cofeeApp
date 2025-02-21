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
        <View style={{
            flexDirection: 'row', alignItems: 'center', width: WIDTH * 0.9, height: 120, marginTop: HEIGHT * 0.01, alignSelf: 'center', borderRadius: 10, padding: 10, shadowColor: colors.commonBlack, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20,
            shadowRadius: 1.41, elevation: 2, backgroundColor: colors.commonWhite,
        }}>
            <Image source={profileIcon} style={{ width: WIDTH * 0.25, height: 100, borderRadius: 10 }} />
            <View style={{ gap: 5, paddingLeft: WIDTH * 0.05 }}>
                <Text style={{ fontWeight: '600', fontSize: 20, color: colors.brownColor, textTransform: 'capitalize' }}>{item?.name}</Text>
                <Text style={{ color: colors.grayColor }}>{item.phone}</Text>
                <Text>{item.email}</Text>
            </View>
        </View>
    );
};

export default UserRenderItem;

