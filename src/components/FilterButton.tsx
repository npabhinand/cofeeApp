/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable } from 'react-native';
import React from 'react';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { buttonProps } from '../constants/types/commonTypes';

const FilterButton: React.FC<buttonProps> = (props) => {
    const { buttonName, selected, onPress } = props;
    return (
        <Pressable style={{ width: 'auto', height: HEIGHT * 0.04, backgroundColor: selected ? colors.brownColor : `${colors.grayColor}10`, 
        paddingHorizontal:WIDTH*0.02,marginRight: WIDTH * 0.05, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH * 0.02 }} onPress={onPress}>
            <Text style={{ color: selected ? colors.commonWhite : colors.commonBlack, fontWeight: selected ? '600' : '400', textTransform:'capitalize' }}>{buttonName}</Text>
        </Pressable>
    );
};

export default FilterButton;
