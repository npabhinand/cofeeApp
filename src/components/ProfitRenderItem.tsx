/* eslint-disable react-native/no-inline-styles */

import { View, Text, Image } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';

const ProfitRenderItem = (props) => {
    const { item } = props;
    // console.log(item.products)
    return (
        <View style={{ height: HEIGHT * 0.1, width: WIDTH * 0.9, backgroundColor: colors.commonWhite, alignSelf: 'center', borderRadius: 20, marginBottom: HEIGHT * 0.02, alignItems: 'center', paddingLeft: 10, flexDirection: 'row' }}>
            <Image source={{ uri: item.products[0].image }} style={{ width: WIDTH * 0.13, height: WIDTH * 0.13, borderRadius: '50%' }} />
            <View style={{ width: WIDTH * 0.6 }}>
                <Text>order Id</Text>
                <Text>{item.id}</Text>
            </View>
            <Text>$52.00</Text>
        </View>
    );
};

export default ProfitRenderItem;
