/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React from 'react';

import { colors } from '../constants/colors';
import { WIDTH } from '../constants/dimension';
import { buttonProp } from '../constants/types/commonTypes';

const HandleOrderButtons: React.FC<buttonProp> = (props) => {
    const { onPress1, onPress2, text1, text2 } = props;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Pressable style={{ borderWidth: 1, borderColor: colors.brownColor, width: WIDTH * 0.38, alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10 }} onPress={onPress1}>
                <Text style={{ color: colors.brownColor }}>{text1}</Text>
            </Pressable>
            <Pressable style={{ backgroundColor: colors.brownColor, width: WIDTH * 0.38, alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10 }} onPress={onPress2}>
                <Text style={{ color: colors.commonWhite }}>{text2}</Text>
            </Pressable>
        </View>
    );
};

export default HandleOrderButtons;
